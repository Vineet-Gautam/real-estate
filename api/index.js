import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

mongoose.connect("mongodb+srv://vineet:7qRlebfF0mbtEKZs@real-estate.wv43sow.mongodb.net/real-estate?retryWrites=true&w=majority&appName=real-estate").then((result) => {
    console.log("connected to mongo db");
}).catch((err) => {
    console.log("error");
});

app.get("/", (req, res) => {
  res.json({
    messgae: "hi",
  });
});
