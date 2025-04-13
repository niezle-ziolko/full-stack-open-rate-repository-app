import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Repository {
    id: ID!
    fullName: String!
    description: String
    language: String
    forksCount: Int
    stargazersCount: Int
    ratingAverage: Int
    reviewCount: Int
    ownerAvatarUrl: String
  }

  type RepositoryEdge {
    node: Repository!
  }

  type RepositoryConnection {
    edges: [RepositoryEdge!]!
  }

  type Query {
    repositories: RepositoryConnection!
  }

  input AuthenticateInput {
    username: String!
    password: String!
  }

  type AuthenticationPayload {
    accessToken: String!
  }

  type Mutation {
    authenticate(credentials: AuthenticateInput!): AuthenticationPayload
  }
`;

export default typeDefs;