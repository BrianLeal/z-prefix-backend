const express = require("express");
const morgan = require("morgan");
const app = express();

//middleware
app.use(morgan("tiny"));

app.get("/", (req, res) => {
    res.send("hello world!");
  });

module.exports = app;