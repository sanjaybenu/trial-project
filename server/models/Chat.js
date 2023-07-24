// install mongoose, moment


const { Schema, model, Types } = require("mongoose");

const moment = require("moment");

const reactionSchema = new Schema(
  {
    reactionId: {
      // Mongoose's ObjectId data type
      type: Schema.Types.ObjectId,
      // Default value is set to a new ObjectId
      default: () => new Types.ObjectId(),
    },

    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },

    username: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      // Set default value to the current timestamp
      default: Date.now,
      // Format timestamp using moment.js
      get: (createdAt) => moment(createdAt).format("DD/MM/YYYY hh:mm:ss A"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const chatSchema = new Schema(
  {
    chatText: {
      type: String,
      required: "Chat is Required",//check this
      minlength: 1,
      maxlength: 500,
    },

    createdAt: {
      type: Date,
      // Set default value to the current timestamp
      default: Date.now,
      // Format timestamp using moment.js
      get: (createdAt) => moment(createdAt).format("DD/MM/YYYY hh:mm:ss A"),
    },

    username: {
      type: String,
      required: true,
    },

    // array of nested documents created with the reactionSchema
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// creating virtual reactionsCount

chatSchema.virtual("reactionsCount").get(function () {
  return this.reactions.length;
});

const Chat = model("chat", chatSchema);

module.exports = Chat;