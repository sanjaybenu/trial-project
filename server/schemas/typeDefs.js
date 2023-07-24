//Revisit queries and mutations


const { gql } = require('apollo-server');
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    posts: [Post!]!
    comments: [Comment!]!
    role: String
  }
  type Post {
    _id: ID!
    title: String!
    content: String!
    user: User!
    comments: [Comment!]!
  }
  type Comment {
    _id: ID!
    text: String!
    user: User!
    post: Post!
  }
  type Query {
    getUsers: [User!]!
    getUserById(userId: ID!): User!
    getPosts: [Post!]!
    getPostById(postId: ID!): Post!
    getComments: [Comment!]!
    getCommentById(commentId: ID!): Comment!
  }
  type Mutation {
    createUser(username: String!, email: String!, password: String!, role: String): User!
    createPost(title: String!, content: String!, userId: ID!): Post!
    createComment(text: String!, userId: ID!, postId: ID!): Comment!
  }
`;
