// create the routes
const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");
const Post = require("./models/Post");

// define the routes
// add multer as middleware - uploads files
routes.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: name, size, filename: key } = req.file;
  const post = await Post.create({
    name,
    size,
    key,
    url: "",
  });
  return res.json({
    post,
  });
});

// export the routes
module.exports = routes;
