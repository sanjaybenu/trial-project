//created typeDefs

// typeDefs.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    password: String! # Note: Password should never be exposed like this in a real app, this is just for demonstration purposes.
  }

  type Post {
    _id: ID!
    content: String!
    user: User!
    responses: [Response!]!
  }

  type Response {
    _id: ID!
    type: String!
    content: String!
    user: User!
    post: Post!
  }


  input PostInput {
    content: String!
  }

  input ResponseInput {
    type: String!
    content: String!
    postId: ID!
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    users:[User]
    user(username: String!): User
    posts:[Post]
    post(_id: ID!):Post
    # Add any required queries here, if needed.
    # For example, getting a specific user, post, or response.
  }
 

  type Mutation {
    register(username:String!,email:String!,password:String!): Auth
    login(email:String!,password:String!): Auth
    addPost(input: PostInput!): Post
    addResponse(input: ResponseInput!): Response
    updatePost(postId: ID!, content: String!): Post
    updateResponse(responseId: ID!, content: String!): Response
  }
`;

module.exports = typeDefs;
