import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // console.log("this is the server");
  // // console.log(typeof username)
  // console.log(req.body.username)
  // console.log(req.body.email)

  // let emm = (req.body.email).toString();

  // console.log(emm);
  // console.log(typeof emm);
  let strUser = "",
    strEmail = "",
    strPassword = "",
    hashedPassword = "";
  if (
    req.body.username &&
    req.body.username.length > 0 &&
    req.body.email &&
    req.body.email.length > 0 &&
    req.body.password &&
    req.body.password.length > 0
  ) {
    strUser = req.body.username.toString();
    strEmail = req.body.email.toString();
    strPassword = req.body.password.toString();
    hashedPassword = bcryptjs.hashSync(strPassword, 10);
  }

  const newUser = new User({
    username: strUser,
    email: strEmail,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  // console.log(email, password);

  const stringPass = password.toString();
  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPass = bcryptjs.compareSync(stringPass, validUser.password);

    if (!validPass) {
      return next(errorHandler(401, "Invalid credentials"));
    }

    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json(rest);

    // res.status(200).json({
    //   message: "verified successfully",
    // });
  } catch (error) {
    next(error);
  }
};
