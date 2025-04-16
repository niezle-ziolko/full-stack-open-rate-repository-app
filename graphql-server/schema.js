import { gql } from "apollo-server-express";

const typeDefs = gql`
  enum AllRepositoriesOrderBy {
    RATING_AVERAGE
  }

  enum OrderDirection {
    ASC
    DESC
  }

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
    url: String
    reviews: ReviewConnection!
  }

  type RepositoryEdge {
    node: Repository!
  }

  type RepositoryConnection {
    edges: [RepositoryEdge!]!
  }

  type Review {
    id: ID!
    text: String!
    rating: Int!
    createdAt: String!
    user: User!
    repository: Repository!
  }

  type ReviewEdge {
    node: Review!
  }

  type ReviewConnection {
    edges: [ReviewEdge!]!
  }

  type User {
    id: ID!
    username: String!
  }

  type Query {
    repositories(
      orderBy: AllRepositoriesOrderBy = RATING_AVERAGE
      orderDirection: OrderDirection = DESC
    ): RepositoryConnection!
    repository(id: ID!): Repository
    me: User
  }

  input AuthenticateInput {
    username: String!
    password: String!
  }

  type AuthenticationPayload {
    accessToken: String!
  }

  input CreateReviewInput {
    ownerName: String!
    repositoryName: String!
    rating: Int!
    text: String
  }

  type CreateReviewPayload {
    repositoryId: ID!
  }

  input CreateUserInput {
    username: String!
    password: String!
  }

  type CreateUserPayload {
    id: ID!
    username: String!
  }

  type Mutation {
    authenticate(credentials: AuthenticateInput!): AuthenticationPayload
    createReview(review: CreateReviewInput!): CreateReviewPayload
    createUser(user: CreateUserInput!): CreateUserPayload
  }
`;

export default typeDefs;