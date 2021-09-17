// Define schema for table post
const mongoose = require("mongoose");
const aws = require("aws-sdk");
// lib to read and delete files
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

// to delete the file from the aws
const s3 = new aws.S3();

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

// middleware to intercept the post and if the url is empty, generate a new one
PostSchema.pre("save", function () {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }
});

PostSchema.pre("remove", function () {
  if (process.env.STORAGE_TYPE === "s3") {
    return s3
      .deleteObject({
        Bucket: process.env.AWS_BUCKET,
        Key: this.key,
      })
      .promise();
  } else {
    // delete from the local host
    return promisify(fs.unlink)(
      path.resolve(__dirname, "..", "..", "tmp", "uploads", this.key)
    );
  }
});

module.exports = mongoose.model("Post", PostSchema);
