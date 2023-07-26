// resolvers.js
const User = require('../models/User');
const Chat = require('../models/Chat');
const Response = require('../models/Response');
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
  },
  Mutation: {
    // ... Other mutations from the previous implementation ...
   register: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError("No profile with this email found!");
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError("Incorrect password!");
        }
  
        const token = signToken(user);
        return { token, user };
      },
  
    //   addPost: async (_, { input }) => {
    //     const { content } = input;
    //     const post = new Post({ content, user: userId }); // Replace 'userId' with the actual ID of the logged-in user.
    //     await post.save();
    //     return post;
    //   },
  
    //   reactToPost: async (_, { input }) => {
    //     const { type, postId } = input;
    //     const reaction = new Reaction({ type, user: userId, post: postId }); // Replace 'userId' with the actual ID of the logged-in user.
    //     await reaction.save();
    //     return reaction;
    //   },
  
    //   updatePost: async (_, { postId, content }) => {
    //     const post = await Post.findByIdAndUpdate(postId, { content }, { new: true });
    //     return post;
    //   },

    // addResponse: async (_, { input }) => {
    //   const { type, content, postId } = input;
    //   const response = new Response({ type, content, user: userId, post: postId }); // Replace 'userId' with the actual ID of the logged-in user.
    //   await response.save();
    //   return response;
    // },

    // updateResponse: async (_, { responseId, content }) => {
    //   const response = await Response.findByIdAndUpdate(responseId, { content }, { new: true });
    //   return response;
    // },
  },
};

module.exports = resolvers;
