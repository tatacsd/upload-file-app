const express = require("express");
const morgan = require("morgan");

const app = express();

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
