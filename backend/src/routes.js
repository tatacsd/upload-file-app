// create the routes
const routes = require("express").Router();

// define the routes
routes.get("/", (req, res) => {
  return res.json({
    message: "Welcome to the backend API!",
  });
});

// export the routes
module.exports = routes;
