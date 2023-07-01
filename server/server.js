const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const { routesInit } = require("./routes/configRoutes");
app.use(express.json());
// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     allowedHeaders: ["Content-Type", "auth-token", "Authorization"],
//   })
// );
app.use(cors());
routesInit(app);

app.listen(process.env.PORT, () => {
  console.log("Server - running.");
});

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("DB - connected.");
  })
  .catch((err) => {
    console.log(err);
  });
