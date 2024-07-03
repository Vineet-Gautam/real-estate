import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.router.js";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err.message);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server listening on port 3000");
});

app.use("/api/user", userRouter);
