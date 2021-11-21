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

  if (user) {
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          password: user.password,
          image: user.image,
        },
        "PonyoSecret",
        { expiresIn: "60s" }
      );
      res.status(200).json({ status: true, token: token });
    } else {
      res.status(200).json({ status: false, token: null });
    }
  } else {
    res.status(200).json({ status: false, token: null });
  }
};

export const checkUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const checkUsername = await User.find({
      username: username,
    });
    if (checkUsername.length == 0) {
      res.status(201).json(true);
    } else {
      res.status(201).json(false);
    }
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const editProfile = async (req, res) => {
  const { user_id } = req.params;
  const { username, password, image } = req.body;

  try {
    const updatedProfile = {
      username,
      password,
      image,
      _id: user_id,
    };

    await User.findByIdAndUpdate(user_id, updatedProfile, { new: true });

    const token = jwt.sign(
      {
        id: user_id,
        username: username,
        password: password,
        image: image,
      },
      "PonyoSecret"
    );
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

const countRestuarant = async (key, id) => {
  const keyArray = "$" + key;
  const count = await User.aggregate([
    {
      $match: {
        _id: ObjectId(id),
      },
    },
    {
      $project: {
        numRes: { $size: { $ifNull: [keyArray, []] } },
      },
    },
  ]);

  return count[0].numRes;
};

export const addRestaurantToList = async (req, res) => {
  const { key, user_id, res_id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(user_id))
    return res.status(404).send(`No review with id: ${user_id}`);

  const countList = await countRestuarant(key, user_id);

  if (key == "myFavRestaurants") {
    if (countList < 5) {
      await User.updateOne(
        { _id: user_id },
        { $addToSet: { myFavRestaurants: res_id } }
      );
      res.status(200).json({ Message: "Update Success" });
    } else {
      res.status(404).json({ Error: "Full Favorite List" });
    }
  } else {
    res.status(404).json({ Error: "Login Failed" });
  }
};

export default router;
