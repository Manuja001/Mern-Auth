import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error.reason);
  });

const app = express();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// creating the routes

app.use("/api/users", userRouter);
