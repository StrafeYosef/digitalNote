const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const { routesInit } = require("./routes/configRoutes");

app.use(express.json());
app.use(cors());

routesInit(app);

const { PORT, DB } = process.env;

app.listen(PORT, () => {
  console.log("Server - running.");
});

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB - connected.");
  })
  .catch((err) => {
    console.log(err);
  });
