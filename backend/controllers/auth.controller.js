import User from "../models/user.model.js";
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
  } catch (err) {
    next(err);
  }
};
