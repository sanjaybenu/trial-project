// models/Response.js
const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  type: { type: String, required: true }, // Example: 'like', 'dislike', 'love', etc.
  content: { type: String, required: true }, // The content of the response.
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
