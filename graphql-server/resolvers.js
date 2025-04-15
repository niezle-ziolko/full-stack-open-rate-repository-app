import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

import data from "./data.js";

const dataPath = path.join(process.cwd(), "graphql-server", "data.js");

function saveData() {
  const jsonContent = JSON.stringify(data, null, 2);
  const jsContent = `const data = ${jsonContent};\n\nexport default data;\n`;
  fs.writeFileSync(dataPath, jsContent, "utf-8");
}

dotenv.config();

const resolvers = {
  Query: {
    repositories: () => ({
      edges: data.repositories.map((repo) => ({ node: repo }))
    }),

    repository: (_, { id }) => {
      return data.repositories.find(repo => repo.id === id) || null;
    },

    me: (_, __, context) => {
      return context.currentUser;
    }
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
        repository = {
          id: uuid(),
          fullName: `${ownerName}/${repositoryName}`,
          description: "",
          language: "",
          forksCount: 0,
          stargazersCount: 0,
          ratingAverage: 0,
          reviewCount: 0,
          ownerAvatarUrl: "",
          url: "",
        };

        data.repositories.push(repository);
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