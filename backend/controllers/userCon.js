import express from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Restaurant from "../models/restaurantModel.js";
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();

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
      res.status(201).json({ status: false });
    } else {
      await newUser.save();
      res.status(201).json({ status: true });
    }
  } catch (error) {
    res.status(409).json({ Error: "error.message" });
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
        resList.push(detailRes[0]);
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
        resList.push(detailRes[0]);
      }

      res.status(200).json(resList);
    }
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const addRestaurantToList = async (req, res) => {
  const { key, user_id, res_id } = req.params;
  const FAV_MAX = 5;
  const IN_MAX = 50;

  if (!mongoose.Types.ObjectId.isValid(user_id))
    return res.status(404).send(`No review with id: ${user_id}`);

  const countList = await countRestuarant(key, user_id);

  if (key == "myFavRestaurants") {
    if (countList < FAV_MAX) {
      await User.updateOne(
        { _id: user_id },
        { $addToSet: { myFavRestaurants: res_id } }
      );
      res.status(200).json({ status: true, Message: "Update Success" });
    } else {
      res.status(200).json({ status: false, Message: "Full Favorite List" });
    }
  } else {
    if (countList < IN_MAX) {
      await User.updateOne(
        { _id: user_id },
        { $addToSet: { myInterestRestaurants: res_id } }
      );
      res.status(200).json({ status: true, Message: "Update Success" });
    } else {
      res
        .status(200)
        .json({ status: false, Message: "Full interesting restaurant List" });
    }
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
    res
      .status(200)
      .json({ status: true, Message: "List deleted successfully" });
  } catch (error) {
    res.status(404).json({ status: true, Message: "Error" });
  }
};

export const editMyFavList = async (req, res) => {
  const { user_id } = req.params;
  const myFavRestaurants = req.body;

  if (!mongoose.Types.ObjectId.isValid(user_id))
    return res.status(404).send(`No post with id: ${user_id}`);

  try {
    const updatedList = { _id: user_id, myFavRestaurants: myFavRestaurants };
    await User.findByIdAndUpdate(user_id, updatedList, { new: true });
    res.status(200).json({ status: true });
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const Users = await User.find(
      {},
      {
        email: 1,
        username: 1,
        password: 1,
        myFavRestaurants: 1,
        myInterestRestaurants: 1,
      }
    );

    res.status(200).json(Users);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export default router;
