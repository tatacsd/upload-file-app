// create the routes
const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

// define the routes
// add multer as middleware - uploads files
routes.post("/posts", multer(multerConfig).single("file"), (req, res) => {
  // where multer adds the file to req.file
  console.log(req.file);
  return res.json({
    message: "Welcome to the backend API!",
  });
});

// export the routes
module.exports = routes;
