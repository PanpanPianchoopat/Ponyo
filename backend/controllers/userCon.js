import express from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Restaurant from "../models/restaurantModel.js";
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();

// เหลือ edit list รอข้อมูลจาก front
export const register = async (req, res) => {
  const { username, email, password, dateOfBirth, gender, image } = req.body;
  const newPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: newPassword,
    dateOfBirth,
    gender,
    image,
  });
  try {
    const checkUser = await User.find({
      $or: [{ username: username }, { email: email }],
    });
    if (checkUser.length != 0) {
      res.status(409).json({ Error: "Already has username or email" });
    } else {
      await newUser.save();
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(409).json({ Error: "error.message" });
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
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      "PonyoSecret"
    );
    res.status(200).json({ user: token });
  } else {
    res.status(404).json({ Error: "Login Failed" });
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
    if (countList < 50) {
      await User.updateOne(
        { _id: user_id },
        { $addToSet: { myInterestRestaurants: res_id } }
      );
      res.status(200).json({ Message: "Update Success" });
    } else {
      res.status(404).json({ Error: "Full interesting restaurant List" });
    }
  }
};

export const getMyRestaurantList = async (req, res) => {
  const { key, user_id } = req.params;
  try {
    const listId = await User.find(
      {
        _id: ObjectId(user_id),
      },
      { [key]: 1 }
    );

    if (key == "myFavRestaurants") {
      var i = 0;
      var resList = [];
      while (i < listId[0].myFavRestaurants.length) {
        const detailRes = await Restaurant.find({
          _id: listId[0].myFavRestaurants[i],
        });
        resList.push(detailRes);
        i++;
      }
      res.status(200).json(resList);
    } else {
      var i = listId[0].myInterestRestaurants.length;
      var resList = [];
      while (i > 0) {
        i--;
        const detailRes = await Restaurant.find({
          _id: listId[0].myInterestRestaurants[i],
        });
        resList.push(detailRes);
      }

      res.status(200).json(resList);
    }
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

//Favorite and Interest
export const removeResFromList = async (req, res) => {
  const { key, user_id, res_id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(user_id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    await User.updateOne(
      { _id: ObjectId(user_id) },
      { $pull: { [key]: res_id } }
    );
    // await User.updateOne({ _id: ObjectId(user_id) }, { $pull: { [key]: null } });
    res.status(200).json("List deleted successfully.");
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const editMyFavList = async (req, res) => {
  const { user_id } = req.params;
  const { myFavRestaurants } = req.body;

  if (!mongoose.Types.ObjectId.isValid(user_id))
    return res.status(404).send(`No post with id: ${user_id}`);

  const updatedList = { _id: user_id, myFavRestaurants: myFavRestaurants };

  await User.findByIdAndUpdate(user_id, updatedList, { new: true });

  res.status(200).json(updatedList);
};

export const getAllUser = async (req, res) => {
  try {
    const Users = await User.find(
      {},
      { username: 1, myFavRestaurants: 1, myInterestRestaurants: 1 }
    );

    res.status(200).json(Users);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export default router;
