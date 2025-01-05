import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utills/error.js";

import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // encrypt the password using bcryptjs

  const hashedPassword = bcryptjs.hashSync(password, 12);
  const newUser = new User({ username, email, password: hashedPassword });

  // add try-catch block to handle errors

  try {
    await newUser.save();
    res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler("User not found!", 404)); // Corrected typo
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler("Invalid credentials", 401)); // Corrected typo
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: userPassword, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// Google login

export const googlelogin = async (req, res, next) => {
  try {
    const User = await User.findOne({ email: req.body.email });
    if (User) {
      const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET);
      const { password, ...rest } = User._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 12);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 10000).toString(),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
