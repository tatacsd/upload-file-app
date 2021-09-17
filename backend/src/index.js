require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const port = process.env.PORT;
const cors = require("cors");

const app = express();

/**
 * Database Setup
 */

mongoose
  .connect(process.env.MONGODB_URL || "mongodb://localhost/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
  });

// define the express to be able to lead with json (middlewares)
app.use(cors()); // all domains can access the api
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// lib of log
app.use(morgan("dev"));

// give access to the files
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

// Use the routes created in the backend folder
app.use(require("./routes"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
