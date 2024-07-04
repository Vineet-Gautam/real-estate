import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express();
app.use(express.json());
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
app.use("/api/auth", authRouter);

// app.post("/api/auth/signup", (req, res) => {
//     console.log("/api/auth/signup done");
//     res.json({
//         "message": "success",
//     })
// })

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    statusCode
  });
});
