import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import data from "./data.js";

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
  Mutation: {
    authenticate: async (_, { credentials }) => {
      const { username, password } = credentials;
      const user = data.users.find(u => u.username === username);

      if (!user || user.password !== password) {
        throw new Error("Incorrect credentials");
      };

      const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h"
      });

      return { accessToken };
    }
  }
};

export default resolvers;