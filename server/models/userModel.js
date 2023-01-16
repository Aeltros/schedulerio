const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isPatient: {
      type: Boolean,
      default: false,
    },
    seenNotifications: {
      type: Array,
      default: [],
    },
    unseenNotifications: {
      type: Array,
      default: [],
    },
    sentMessages: [
      {
        recipient: { type: String },
        message: { type: String },
        date: { type: Date },
      },
    ],
    receivedMessages: [
      {
        sender: { type: String },
        message: { type: String },
        date: { type: Date },
      },
    ],
  },
  {
    timestamps: true,
  }
);


const userModel = mongoose.model("users", userSchema);

module.exports = userModel;

