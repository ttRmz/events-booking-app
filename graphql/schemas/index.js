const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  scalar Date

  type Event {
    id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
    createdAt: Date!
    updatedAt: Date!
  }

  input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
  }

  type Query {
    events: [Event!]!
  }

  type User {
    id: ID!
    email: String!
    password: String
    createdEvents: [Event!]
    createdAt: Date!
    updatedAt: Date!
  }

  input UserInput {
    email: String!
    password: String!
  }

  type Mutation {
    createEvent(EventInput: EventInput!): Event
    createUser(UserInput: UserInput!): User
  }

  schema {
    query: Query
    mutation: Mutation
  }
`);
