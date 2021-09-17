// Define schema for table post
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  // original name of the post
  name: String,
  size: Number,
  // name with the created hash
  key: String,
  // to amazon s3
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
