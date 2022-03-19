const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./router/index.js");
const errorMiddleware = require("./middleware/error-middleware.js");

require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use("/api", router);
app.use(errorMiddleware);

async function start() {
  try {
    mongoose.connect(
      `mongodb+srv://user:${process.env.DB_PASSWORD}@cluster0.24gnz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );
    app.listen(PORT, () => {
      console.log(`Server has started on ${PORT}`);
    });
  } catch (e) {}
}

start();
