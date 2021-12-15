/*******************************************************************************
 * This file includes the functions that add, update, delete and query the data
 * from the restaurants's collection in the database.
 ******************************************************************************/
import mongoose from "mongoose";
import Restaurant from "../models/restaurantModel.js";
import User from "../models/userModel.js";
import * as resPrivateCon from "./resPrivateCon.js";
import { DAYS } from "../constant/restaurant.js";
const ObjectId = mongoose.Types.ObjectId;

/*******************************************************************************
 * This function is used to add restaurant to database.
 * Returns true when added successfully
 ******************************************************************************/
export const addRestaurant = async (req, res) => {
  const {
    name,
    type,
    description,
    address,
    ggLink,
    phone,
    min,
    max,
    closingDay,
    openHour,
    image,
  } = req.body;

  const status = resPrivateCon.dayStatus(closingDay);
  const openTime = resPrivateCon.convertToMin(openHour[0], openHour[1]);
  const closeTime = resPrivateCon.convertToMin(openHour[2], openHour[3]);

  const newRestaurant = new Restaurant({
    name,
    type,
    description,
    location: { address, ggLink },
    phone,
    priceRange: { min, max },
    openHours: {
      openTime,
      closeTime,
    },
    openDays: [
      {
        weekDay: DAYS[0],
        dayStatus: status[0],
      },
      {
        weekDay: DAYS[1],
        dayStatus: status[1],
      },
      {
        weekDay: DAYS[2],
        dayStatus: status[2],
      },
      {
        weekDay: DAYS[3],
        dayStatus: status[3],
      },
      {
        weekDay: DAYS[4],
        dayStatus: status[4],
      },
      {
        weekDay: DAYS[5],
        dayStatus: status[5],
      },
      {
        weekDay: DAYS[6],
        dayStatus: status[6],
      },
    ],
    image,
  });

  try {
    await newRestaurant.save();
    res.status(201).json(true);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

/*******************************************************************************
 * This function is used to get all restaurants from database.
 * Returns the array object of restauraants
 ******************************************************************************/
export const getAllRestaurants = async (req, res) => {
  try {
    const Restaurants = await Restaurant.find();

    res.status(200).json(Restaurants);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

/*******************************************************************************
 * This function is used to get the detail of restaurant
 * from database.
 * 'resID' is the restaurant's ID that want to get detail
 * Returns
 * - 'details' which is array object of restaurant
 * - 'closeDay' which is the day that closed
 * - 'openTime' which is opened time of restaurant
 * - 'closeTime' which is closed time of restaurant
 ******************************************************************************/
export const getRestaurantDetail = async (req, res) => {
  const { resID } = req.params;
  try {
    const Restaurants = await Restaurant.findById(resID);
    const closeDay = resPrivateCon.convertDay(Restaurants.openDays);
    const openTime = resPrivateCon.convertOpenHours(
      Restaurants.openHours.openTime
    );
    const closeTime = resPrivateCon.convertOpenHours(
      Restaurants.openHours.closeTime
    );

    res.status(200).json({
      details: Restaurants,
      closeDay: closeDay,
      openTime: openTime,
      closeTime: closeTime,
    });
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

/*******************************************************************************
 * This function is used to search all restaurant by filter.
 * 'filter' is type that user want to search (name or address).
 * 'search' is the keyword that user input in search box (depend on selected filter).
 * 'priceRange' is level of price that user want to search.
 * 'type' is cuisine that user want to search.
 * 'resStatus' is the status of restaurant that user want to search (All,OPEN,CLOSE).
 * Returns the array object of all restaurant that match the filter.
 ******************************************************************************/
export const getRestaurant = async (req, res) => {
  var { filter, search, priceRange, type, resStatus } = req.params;
  const range = resPrivateCon.findPriceRange(priceRange);

  if (search == "noInput") {
    search = "";
  }
  if (type == "Cuisine") {
    type = "";
  }
  try {
    //All (Open & Close)
    if (resStatus == "ALL") {
      const Restaurants = await resPrivateCon.searchRestaurant(
        filter,
        search,
        range,
        type
      );
      res.status(200).json(Restaurants);
    }
    // Open Restaurant
    else if (resStatus == "OPEN") {
      const Restaurants = await resPrivateCon.searchWithStatus(
        "OPEN",
        filter,
        search,
        range,
        type
      );
      res.status(200).json(Restaurants);
    }
    // Close Restaurant
    else {
      const Restaurants = await resPrivateCon.searchWithStatus(
        "CLOSE",
        filter,
        search,
        range,
        type
      );
      res.status(200).json(Restaurants);
    }
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

/*******************************************************************************
 * This function is used to get the restaurant status
 * 'resID' is the restaurant's ID that want to get detail
 * Returns
 * - true if the restaurant is open
 * - false if the restaurant is close
 ******************************************************************************/
export const getRestaurantStatus = async (req, res) => {
  const { resID } = req.params;

  try {
    const resOpen = await resPrivateCon.getTag(resID);
    res.status(200).json(resOpen);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

/*******************************************************************************
 * This function is used to get the best 3 restaurants in each type that have
 * the greatest number of reviews within one week.
 * 'type' is the type of restaurant
 * Returns the array object of the top 3 restaurant in each type
 ******************************************************************************/
export const getTrending = async (req, res) => {
  const { type } = req.params;

  var today = new Date();
  var getDate = today.getDate();
  // var firstDayWeek = new Date(today.setDate(getDate - 7));
  // var lastDayWeek = new Date();

  try {
    const trendingRes = await Restaurant.aggregate([
      {
        $match: {
          type: type,
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          resID_string: {
            $convert: {
              input: "$_id",
              to: "string",
              onError: "",
              onNull: "",
            },
          },
          image: 1,
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "resID_string",
          foreignField: "resID",
          as: "review",
        },
      },
      // {
      //   $unwind: "$review",
      // },
      // {
      //   $match: {
      //     "review.date": {
      //       $lt: lastDayWeek,
      //       $gt: firstDayWeek,
      //     },
      //   },
      // },
      {
        $group: {
          _id: { resID: "$_id", type: type },
          count: { $sum: 1 },
          data: { $push: "$$ROOT" },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 3 },
    ]);

    res.status(200).json(trendingRes);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

/*******************************************************************************
 * This function is used to get the best 3 restaurants that have the greatest
 * number of reviews from all of the restaurants within one week.
 * Returns the array object of the top 3 restaurant.
 ******************************************************************************/
export const getBestTrending = async (req, res) => {
  var today = new Date();
  var getDate = today.getDate();
  // var firstDayWeek = new Date(today.setDate(getDate - 7));
  // var lastDayWeek = new Date();

  console.log("123456");
  try {
    const bestTrendingRes = await Restaurant.aggregate([
      {
        $project: {
          name: 1,
          description: 1,
          resID_string: {
            $convert: {
              input: "$_id",
              to: "string",
              onError: "",
              onNull: "",
            },
          },
          image: 1,
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "resID_string",
          foreignField: "resID",
          as: "review",
        },
      },
      {
        $unwind: "$review",
      },
      // {
      //   $match: {
      //     "review.date": {
      //       $lt: lastDayWeek,
      //       $gt: firstDayWeek,
      //     },
      //   },
      // },
      // {
      //   $addFields: {
      //     reviewDate: "$review.date",
      //   },
      // },
      {
        $group: {
          _id: { resID: "$_id" },
          count: { $sum: 1 },
          data: { $push: "$$ROOT" },
        },
      },

      { $sort: { count: -1 } },
      { $limit: 3 },
    ]);

    res.status(200).json(bestTrendingRes);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

/*******************************************************************************
 * This function is used to check whether the user has restaurant in the list
 * or not
 * 'key' is the type of list that want to check.
 * 'userID' is the user's id that want to check the list.
 * 'resID' is the restaurant's id that used to check in the list.
 * Returns
 * - true if resID is in the list.
 * - false if resID is not in the list.
 ******************************************************************************/
export const checkLikedBookmarked = async (req, res) => {
  const { key, userID, resID } = req.params;
  const searchKey = "$" + key;

  try {
    const check = await User.aggregate([
      {
        $match: {
          _id: ObjectId(userID),
        },
      },
      {
        $project: {
          check: {
            $cond: {
              if: {
                $in: [resID, searchKey],
              },
              then: true,
              else: false,
            },
          },
        },
      },
    ]);

    res.status(200).json(check[0].check);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};
