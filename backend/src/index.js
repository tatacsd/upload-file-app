const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

/**
 * Database Setup
 */

mongoose
  .connect(
    "mongodb+srv://userUploadApp:D8QPorXoyYnofNX5@cluster0.qjvp5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
  });

// define the express to be able to lead with json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// lib of log
app.use(morgan("dev"));

// Use the routes created in the backend folder
app.use(require("./routes"));

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
