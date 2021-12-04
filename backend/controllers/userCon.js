/*******************************************************************************
 * This file includes the functions that add, update, delete and query the data
 * from the users's collection in the database.
 *******************************************************************************
 */
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Restaurant from "../models/restaurantModel.js";
const ObjectId = mongoose.Types.ObjectId;

/*******************************************************************************
 * This function is used to register the user.
 * Returns
 *  - true status if registered successfully
 *  - false status if registered not successfully
 *******************************************************************************
 */
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

/*******************************************************************************
 * This function is used to login to the system.
 * Returns
 *  - true status and the token if login successfully
 *  - false status if login not successfully
 *******************************************************************************
 */
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
        { expiresIn: "1d" }
      );
      res.status(200).json({ status: true, token: token });
    } else {
      res.status(200).json({ status: false, token: null });
    }
  } else {
    res.status(200).json({ status: false, token: null });
  }
};

/*******************************************************************************
 * This function is used to check username in database.
 * 'username' is the username that want to check
 * Returns
 *  - true if not has this username in database
 *  - false if has this username in database
 *******************************************************************************
 */
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

/*******************************************************************************
 * This function is used to check email in database.
 * 'email' is the email that want to check
 * Returns
 *  - true if not has this email in database
 *  - false if has this email in database
 *******************************************************************************
 */
export const checkEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const checkEmail = await User.find({
      email: email,
    });
    if (checkEmail.length == 0) {
      res.status(201).json(true);
    } else {
      res.status(201).json(false);
    }
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

/*******************************************************************************
 * This function is used to edit the user's profile.
 * 'userID' is user's ID that want to edit profile
 * Returns
 *  - true status and the token if edited successfully
 *  - false status if edited not successfully
 *******************************************************************************
 */
export const editProfile = async (req, res) => {
  const { userID } = req.params;
  const { username, password, image } = req.body;

  try {
    const editedProfile = {
      username,
      password,
      image,
      _id: userID,
    };

    await User.findByIdAndUpdate(userID, editedProfile, { new: true });

    const token = jwt.sign(
      {
        id: userID,
        username: username,
        password: password,
        image: image,
      },
      "PonyoSecret"
    );
    res.status(200).json({ status: true, token: token });
  } catch (error) {
    res.status(404).json({ status: false, Error: error.message });
  }
};

/*******************************************************************************
 * This function is used to get user's restaurant list
 * 'key' is the the type of the user's restaurant list
 *  - 'myFavRestaurants' is the user's favorite list
 *  - 'myInterestRestaurants' is the user's interest list
 * 'userID' is user's ID
 * Returns the user's restaurant list
 *******************************************************************************
 */
export const getMyRestaurantList = async (req, res) => {
  const { key, userID } = req.params;
  try {
    const listId = await User.find(
      {
        _id: ObjectId(userID),
      },
      { [key]: 1 }
    );

    // User's favorite list
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
    }

    // User's interest list
    else {
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

/*******************************************************************************
 * This function is used to add the restaurant to user's restaurant list
 * 'key' is the the type of the user's restaurant list
 *  - 'myFavRestaurants' is the user's favorite list
 *  - 'myInterestRestaurants' is the user's interest list
 * 'userID' is user's ID
 * 'resID' is restaurant's ID that want to add
 * Returns
 *  - true status if added successfully
 *  - false status if the list is full
 *******************************************************************************
 */
export const addRestaurantToList = async (req, res) => {
  const { key, userID, resID } = req.params;
  const FAV_MAX = 5;
  const IN_MAX = 50;

  if (!mongoose.Types.ObjectId.isValid(userID))
    return res.status(404).send(`No user with id: ${userID}`);

  const countList = await countRestuarant(key, userID);

  // User's favorite list
  if (key == "myFavRestaurants") {
    // Check the user's favorite list that is less than the maximum number or not
    if (countList < FAV_MAX) {
      await User.updateOne(
        { _id: userID },
        { $addToSet: { myFavRestaurants: resID } }
      );
      res.status(200).json({ status: true, Message: "Added Successfully" });
    } else {
      res.status(200).json({ status: false, Message: "Full Favorite List" });
    }
  }

  // User's interest list
  else {
    // Check the user's interest list that is less than the maximum number or not
    if (countList < IN_MAX) {
      await User.updateOne(
        { _id: userID },
        { $addToSet: { myInterestRestaurants: resID } }
      );
      res.status(200).json({ status: true, Message: "Added Successfully" });
    } else {
      res
        .status(200)
        .json({ status: false, Message: "Full interesting restaurant List" });
    }
  }
};

/*******************************************************************************
 * This function is used to remove the restaurant from user's restaurant list
 * 'key' is the the type of the user's restaurant list
 *  - 'myFavRestaurants' is the user's favorite list
 *  - 'myInterestRestaurants' is the user's interest list
 * 'userID' is user's ID
 * 'resID' is restaurant's ID that want to remove
 * Returns
 *  - true status if deleted successfully
 *  - false status if deleted not successfully
 *******************************************************************************
 */
export const removeResFromList = async (req, res) => {
  const { key, userID, resID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userID))
    return res.status(404).send(`No user with id: ${userID}`);

  try {
    await User.updateOne(
      { _id: ObjectId(userID) },
      { $pull: { [key]: resID } }
    );
    res.status(200).json({ status: true, Message: "Deleted successfully" });
  } catch (error) {
    res.status(404).json({ status: false, Message: "Error" });
  }
};

/*******************************************************************************
 * This function is used to edit the user's favorite list
 * 'userID' is user's ID
 * 'myFavRestaurants' is the array of user's favorite list
 * Returns
 *  - true status if edited successfully
 *  - false status if edited not successfully
 *******************************************************************************
 */
export const editMyFavList = async (req, res) => {
  const { userID } = req.params;
  const myFavRestaurants = req.body;

  if (!mongoose.Types.ObjectId.isValid(userID))
    return res.status(404).send(`No user with id: ${userID}`);

  try {
    const updatedList = { _id: userID, myFavRestaurants: myFavRestaurants };
    await User.findByIdAndUpdate(userID, updatedList, { new: true });
    res.status(200).json({ status: true });
  } catch (error) {
    res.status(404).json({ status: false, Error: error.message });
  }
};

/************************      PRIVATE FUNCTION        ************************/

/*******************************************************************************
 * This function is used to count the number of restaurants in the list.
 * 'key' is the the type of the user's restaurant list
 *  - 'myFavRestaurants' is the user's favorite list
 *  - 'myInterestRestaurants' is the user's interest list
 * 'userID' is user's ID
 * Returns the number of restaurants in the list
 *******************************************************************************
 */
const countRestuarant = async (key, userID) => {
  const keyArray = "$" + key;
  const count = await User.aggregate([
    {
      $match: {
        _id: ObjectId(userID),
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
