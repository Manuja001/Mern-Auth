import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

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
app.use(express.json());

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// creating the routes

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
