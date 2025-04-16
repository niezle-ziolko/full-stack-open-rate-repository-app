import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";

import data from "./data.js";

const dataPath = path.join(process.cwd(), "graphql-server", "data.js");

function saveData() {
  const jsonContent = JSON.stringify(data, null, 2);
  const jsContent = `const data = ${jsonContent};\n\nexport default data;\n`;
  fs.writeFileSync(dataPath, jsContent, "utf-8");
}

function normalizeDateString(dateStr) {
  const [date, time] = dateStr.split('T');
  const [year, month, day] = date.split('-');
  const normalizedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${time}`;
  return normalizedDate;
}

dotenv.config();

const resolvers = {
  Query: {
    repositories: (_, args) => {
      const { orderBy = "RATING_AVERAGE", orderDirection = "DESC" } = args;
  
      let sortedRepositories = [...data.repositories];
  
      if (orderBy === "RATING_AVERAGE") {
        sortedRepositories.sort((a, b) =>
          orderDirection === "ASC"
            ? a.ratingAverage - b.ratingAverage
            : b.ratingAverage - a.ratingAverage
        );
      } else if (orderBy === "CREATED_AT") {
        sortedRepositories.sort((a, b) => {
          const dateA = new Date(normalizeDateString(a.createdAt));
          const dateB = new Date(normalizeDateString(b.createdAt));
        
          return orderDirection === "ASC"
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
        });
      }
  
      return {
        edges: sortedRepositories.map((repo) => ({ node: repo })),
      };
    },
  },  

  Repository: {
    reviews: (parent) => {
      const repoId = parent.id;
      const repoReviews = data.reviews
        .filter((review) => review.repositoryId === repoId)
        .map((review) => ({ node: review }));

      return { edges: repoReviews };
    }
  },

  Review: {
    user: (parent) => data.users.find(u => u.id === parent.userId),
    repository: (parent) => data.repositories.find(r => r.id === parent.repositoryId)
  },

  Mutation: {
    authenticate: async (_, { credentials }) => {
      const { username, password } = credentials;
      const user = data.users.find(u => u.username === username);

      if (!user) {
        throw new Error("Incorrect credentials");
      }

      const passwordCorrect = await bcrypt.compare(password, user.password);

      if (!passwordCorrect) {
        throw new Error("Incorrect credentials");
      }

      const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h"
      });

      return { accessToken };
    },

    createReview: (_, { review }, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new Error("Not authenticated");
      }

      const {
        ownerName,
        repositoryName,
        rating,
        text
      } = review;

      let repository = data.repositories.find(
        r => r.fullName.toLowerCase() === `${ownerName}/${repositoryName}`.toLowerCase()
      );

      if (!repository) {
        throw new Error(`Repository ${ownerName}/${repositoryName} not found`);
      }

      const newReview = {
        id: uuid(),
        text: text || "",
        rating,
        createdAt: new Date().toISOString(),
        userId: currentUser.id,
        repositoryId: repository.id,
      };

      data.reviews.push(newReview);

      const repoReviews = data.reviews.filter(r => r.repositoryId === repository.id);
      const reviewCount = repoReviews.length;
      const ratingAverage = Math.round(
        repoReviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
      );

      repository.reviewCount = reviewCount;
      repository.ratingAverage = ratingAverage;

      saveData();

      return { repositoryId: repository.id };
    },

    createUser: async (_, { user }) => {
      const { username, password } = user;

      const existingUser = data.users.find(u => u.username === username);
      if (existingUser) {
        throw new Error("Username is already taken");
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = {
        id: uuid(),
        username,
        password: passwordHash
      };

      data.users.push(newUser);
      saveData();

      return {
        id: newUser.id,
        username: newUser.username
      };
    }
  }
};

export default resolvers;