import express from "express";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import Restaurant from "../models/restaurantModel.js";
import User from "../models/userModel.js";
import Review from "../models/reviewModel.js";

const router = express.router;

const dayStatus = (closingDay) => {
  const status = [1, 1, 1, 1, 1, 1, 1];
  let i = 0;

  if (closingDay.length != 0) {
    while (i < closingDay.length) {
      const day = closingDay[i];
      status[day] = 0;
      i++;
    }
  }

  return status;
};

const convertToMin = (hour, min) => {
  return hour * 60 + min;
};

export const addRestaurant = async (req, res) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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

  const status = dayStatus(closingDay);
  const openTime = convertToMin(openHour[0], openHour[1]);
  const closeTime = convertToMin(openHour[2], openHour[3]);

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
        weekDay: days[0],
        dayStatus: status[0],
      },
      {
        weekDay: days[1],
        dayStatus: status[1],
      },
      {
        weekDay: days[2],
        dayStatus: status[2],
      },
      {
        weekDay: days[3],
        dayStatus: status[3],
      },
      {
        weekDay: days[4],
        dayStatus: status[4],
      },
      {
        weekDay: days[5],
        dayStatus: status[5],
      },
      {
        weekDay: days[6],
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

export const getAllRestaurants = async (req, res) => {
  try {
    const Restaurants = await Restaurant.find();

    res.status(200).json(Restaurants);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

const convertDay = (week) => {
  var i = 0;
  var j = 0;
  var closeDay = "";
  const array = [];

  for (i = 0; i <= 6; i++) {
    if (week[i].dayStatus == 0) {
      if (j != 0 && i != 6) {
        array[j] = ", ";
        j++;
      }
      array[j] = week[i].weekDay;
      j++;
    }
  }

  return array;
};

const convertOpenHours = (minTime) => {
  const time = [0, 0];
  time[1] = minTime % 60;
  time[0] = (minTime - time[1]) / 60;
  return time;
};

export const getRestaurantDetail = async (req, res) => {
  const { res_id } = req.params;
  try {
    const Restaurants = await Restaurant.findById(res_id);
    const closeDay = convertDay(Restaurants.openDays);
    const openTime = convertOpenHours(Restaurants.openHours.openTime);
    const closeTime = convertOpenHours(Restaurants.openHours.closeTime);

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

const findPriceRange = (priceRange) => {
  const range = [0, 0];
  if (priceRange == 1) {
    range[0] = 0;
    range[1] = 500;
  } else if (priceRange == 2) {
    range[0] = 500;
    range[1] = 1000;
  } else if (priceRange == 3) {
    range[0] = 1000;
    range[1] = 5000;
  } else if (priceRange == 4) {
    range[0] = 5000;
    range[1] = 10000;
  }
  return range;
};

const searchWithStatus = async (resStatus, key, search, range, type) => {
  const now = new Date(),
    days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    weekDay = days[now.getDay()],
    hour = now.getHours(),
    minutes = now.getMinutes();

  const currentMin = convertToMin(hour, minutes);

  //tag
  if (resStatus == 2) {
    const resOpen = await Restaurant.find({
      _id: search,
      openDays: { weekDay: weekDay, dayStatus: 1 },
      $and: [
        { "openHours.openTime": { $lte: currentMin } },
        { "openHours.closeTime": { $gte: currentMin } },
      ],
    });
    if (resOpen.length == 0) {
      return false;
    } else {
      return true;
    }
  }
  //Search Open Restaurants
  else if (resStatus == "OPEN") {
    //No Search Type and No Search Price (Open)
    if (!type && range[0] == 0 && range[1] == 0) {
      try {
        const resOpen = await Restaurant.find({
          [key]: { $regex: search, $options: "i" },
          openDays: { weekDay: weekDay, dayStatus: 1 },
          $and: [
            { "openHours.openTime": { $lte: currentMin } },
            { "openHours.closeTime": { $gte: currentMin } },
          ],
        });
        return resOpen;
      } catch (error) {
        console.log("error search status OPEN");
      }
    }
    //No Search Type (Open)
    else if (!type) {
      const resOpen = await Restaurant.find({
        [key]: { $regex: search, $options: "i" },
        $or: [
          {
            $and: [
              { "priceRange.min": { $gte: range[0] } },
              { "priceRange.min": { $lte: range[1] } },
            ],
          },
          {
            $and: [
              { "priceRange.max": { $gte: range[0] } },
              { "priceRange.max": { $lte: range[1] } },
            ],
          },
        ],
        openDays: { weekDay: weekDay, dayStatus: 1 },
        $and: [
          { "openHours.openTime": { $lte: currentMin } },
          { "openHours.closeTime": { $gte: currentMin } },
        ],
      });
      return resOpen;
    }
    //No Search Price (Open)
    else if (range[0] == 0 && range[1] == 0) {
      try {
        const resOpen = await Restaurant.find({
          [key]: { $regex: search, $options: "i" },
          type: type,
          openDays: { weekDay: weekDay, dayStatus: 1 },
          $and: [
            { "openHours.openTime": { $lte: currentMin } },
            { "openHours.closeTime": { $gte: currentMin } },
          ],
        });
        return resOpen;
      } catch (error) {
        console.log("error search OPEN (no price)");
      }
    } else {
      const resOpen = await Restaurant.find({
        [key]: { $regex: search, $options: "i" },
        $or: [
          {
            $and: [
              { "priceRange.min": { $gte: range[0] } },
              { "priceRange.min": { $lte: range[1] } },
            ],
          },
          {
            $and: [
              { "priceRange.max": { $gte: range[0] } },
              { "priceRange.max": { $lte: range[1] } },
            ],
          },
        ],
        type: type,
        openDays: { weekDay: weekDay, dayStatus: 1 },
        $and: [
          { "openHours.openTime": { $lte: currentMin } },
          { "openHours.closeTime": { $gte: currentMin } },
        ],
      });
      return resOpen;
    }
  }
  //Search Close Restaurants
  else {
    //no type and no price (close)
    if (!type && range[0] == 0 && range[1] == 0) {
      const resClose = await Restaurant.find({
        [key]: { $regex: search, $options: "i" },
        $or: [
          { openDays: { weekDay: weekDay, dayStatus: 0 } },
          {
            $or: [
              { "openHours.openTime": { $gte: currentMin } },
              { "openHours.closeTime": { $lte: currentMin } },
            ],
          },
        ],
      });
      return resClose;
    }
    //no search type (close)
    else if (!type) {
      const resClose = await Restaurant.find({
        [key]: { $regex: search, $options: "i" },
        $and: [
          {
            $or: [
              { openDays: { weekDay: weekDay, dayStatus: 0 } },
              {
                $or: [
                  { "openHours.openTime": { $gte: currentMin } },
                  { "openHours.closeTime": { $lte: currentMin } },
                ],
              },
            ],
          },
          {
            $or: [
              {
                $and: [
                  { "priceRange.min": { $gte: range[0] } },
                  { "priceRange.min": { $lte: range[1] } },
                ],
              },
              {
                $and: [
                  { "priceRange.max": { $gte: range[0] } },
                  { "priceRange.max": { $lte: range[1] } },
                ],
              },
            ],
          },
        ],
      });
      return resClose;
    }
    //no search price (close)
    else if (range[0] == 0 && range[1] == 0) {
      const resClose = await Restaurant.find({
        [key]: { $regex: search, $options: "i" },
        type: type,
        $or: [
          { openDays: { weekDay: weekDay, dayStatus: 0 } },
          {
            $or: [
              { "openHours.openTime": { $gte: currentMin } },
              { "openHours.closeTime": { $lte: currentMin } },
            ],
          },
        ],
      });
      return resClose;
    } else {
      const resClose = await Restaurant.find({
        [key]: { $regex: search, $options: "i" },
        type: type,
        $and: [
          {
            $or: [
              { openDays: { weekDay: weekDay, dayStatus: 0 } },
              {
                $or: [
                  { "openHours.openTime": { $gte: currentMin } },
                  { "openHours.closeTime": { $lte: currentMin } },
                ],
              },
            ],
          },
          {
            $or: [
              {
                $and: [
                  { "priceRange.min": { $gte: range[0] } },
                  { "priceRange.min": { $lte: range[1] } },
                ],
              },
              {
                $and: [
                  { "priceRange.max": { $gte: range[0] } },
                  { "priceRange.max": { $lte: range[1] } },
                ],
              },
            ],
          },
        ],
      });
      return resClose;
    }
  }
};

const searchRestaurant = async (key, search, range, type, resStatus) => {
  //All (Open & Close)
  if (resStatus == "ALL") {
    // NO Search Type & Price
    if (!type && range[0] == 0 && range[1] == 0) {
      try {
        const Restaurants = await Restaurant.find({
          [key]: { $regex: search, $options: "i" },
        });

        return Restaurants;
      } catch (error) {
        console.log(error);
      }
    }
    // NO Search Type
    else if (!type) {
      const Restaurants = await Restaurant.find({
        [key]: { $regex: search, $options: "i" },
        $or: [
          {
            $and: [
              { "priceRange.min": { $gte: range[0] } },
              { "priceRange.min": { $lte: range[1] } },
            ],
          },
          {
            $and: [
              { "priceRange.max": { $gte: range[0] } },
              { "priceRange.max": { $lte: range[1] } },
            ],
          },
        ],
      });
      return Restaurants;
    }
    // NO Search Price Range
    else if (range[0] == 0 && range[1] == 0) {
      const Restaurants = await Restaurant.find({
        [key]: { $regex: search, $options: "i" },
        type: type,
      });
      return Restaurants;
    }
    // Search with Everything
    else {
      const Restaurants = await Restaurant.find({
        [key]: { $regex: search, $options: "i" },
        $or: [
          {
            $and: [
              { "priceRange.min": { $gte: range[0] } },
              { "priceRange.min": { $lte: range[1] } },
            ],
          },
          {
            $and: [
              { "priceRange.max": { $gte: range[0] } },
              { "priceRange.max": { $lte: range[1] } },
            ],
          },
        ],
        type: type,
      });
      return Restaurants;
    }
  }
  // Open Restaurant
  else if (resStatus == "OPEN") {
    const Restaurants = await searchWithStatus(
      "OPEN",
      key,
      search,
      range,
      type
    );
    return Restaurants;
  }
  // Close Restaurant
  else {
    const Restaurants = await searchWithStatus(
      "CLOSE",
      key,
      search,
      range,
      type
    );
    return Restaurants;
  }
};

export const getRestaurant = async (req, res) => {
  var { filter, search, priceRange, type, resStatus } = req.params;
  const range = findPriceRange(priceRange);

  if (search == "noInput") {
    search = "";
  }
  if (type == "Cuisine") {
    type = "";
  }

  try {
    const Restaurants = await searchRestaurant(
      filter,
      search,
      range,
      type,
      resStatus
    );
    res.status(200).json(Restaurants);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const getRestaurantStatus = async (req, res) => {
  const { res_id } = req.params;

  try {
    const resOpen = await searchWithStatus(2, "_id", res_id, "", "");
    res.status(200).json(resOpen);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const getTrending = async (req, res) => {
  const { type } = req.params;

  var today = new Date();
  var first = today.getDate() - today.getDay();
  var firstDayWeek = new Date(today.setDate(first - 6));
  var lastDayWeek = new Date(today.setDate(first + 2));

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
          res_id_string: {
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
          localField: "res_id_string",
          foreignField: "res_id",
          as: "review",
        },
      },
      {
        $unwind: "$review",
      },
      {
        $match: {
          "review.date": {
            $lt: lastDayWeek,
            $gt: firstDayWeek,
          },
        },
      },
      {
        $group: {
          _id: { res_id: "$_id", type: type },
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

export const getBestTrending = async (req, res) => {
  var today = new Date();
  var first = today.getDate() - today.getDay();
  var firstDayWeek = new Date(today.setDate(first - 6));
  var lastDayWeek = new Date(today.setDate(first + 2));

  try {
    const bestTrendingRes = await Restaurant.aggregate([
      {
        $project: {
          name: 1,
          description: 1,
          res_id_string: {
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
          localField: "res_id_string",
          foreignField: "res_id",
          as: "review",
        },
      },
      {
        $unwind: "$review",
      },
      {
        $match: {
          "review.date": {
            $lt: lastDayWeek,
            $gt: firstDayWeek,
          },
        },
      },
      {
        $group: {
          _id: { res_id: "$_id" },
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

export const checkLikedBookmarked = async (req, res) => {
  const { key, user_id, res_id } = req.params;
  const searchKey = "$" + key;

  try {
    const check = await User.aggregate([
      {
        $match: {
          _id: ObjectId(user_id),
        },
      },
      {
        $project: {
          check: {
            $cond: {
              if: {
                $in: [res_id, searchKey],
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
