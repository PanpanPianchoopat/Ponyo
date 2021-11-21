import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

const router = express.Router();

export const register = async (req, res) => {
  const { username, email, password, dateOfBirth, gender, imageFile } =
    req.body;

  const newPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: newPassword,
    dateOfBirth,
    gender,
    imageFile,
  });
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ Error: error.message });
  }
};

export const login = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    res.status(404).json({ Error: "Invalid User" });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    // const token = jwt.sign(
    //   {
    //     username: user.username,
    //     email: user.email,
    //   },
    //   "PonyoSecret"
    // );
    res.status(200).json({ Message: "Login Success" });
  } else {
    res.status(404).json({ Error: "Login Failed" });
  }
};

export default router;
