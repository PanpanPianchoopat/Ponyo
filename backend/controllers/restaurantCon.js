import express from "express";
import Restaurant from "../models/restaurantModel.js";

const router = express.router;

const dayStatus = (weekDay) => {
  const status = [1, 1, 1, 1, 1, 1, 1];
  let i = 0;
  while (i < weekDay.length) {
    const day = weekDay[i];
    status[day] = 0;
    i++;
  }
  return status;
};

const convertToMin = (hour, min) => {
  return hour * 60 + min;
};

export const addRestaurant = async (req, res) => {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const {
    name,
    type,
    description,
    address,
    ggLink,
    phone,
    min,
    max,
    weekDay,
    openHour,
    image,
  } = req.body;

  const status = dayStatus(weekDay);
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
        status: status[0],
      },
      {
        weekDay: days[1],
        status: status[1],
      },
      {
        weekDay: days[2],
        status: status[2],
      },
      {
        weekDay: days[3],
        status: status[3],
      },
      {
        weekDay: days[4],
        status: status[4],
      },
      {
        weekDay: days[5],
        status: status[5],
      },
      {
        weekDay: days[6],
        status: status[6],
      },
    ],
    image,
  });

  try {
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const getAllRestaurant = async (req, res) => {
  try {
    const Restaurants = await Restaurant.find();

    res.status(200).json(Restaurants);
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

const searchRestaurant = async (key, search, range, type) => {
  console.log(range);
  console.log(type);

  if (!type && range[0] == 0 && range[1] == 0) {
    const Restaurants = await Restaurant.find({
      [key]: { $regex: search, $options: "i" },
    });
    return Restaurants;
  } else if (!type) {
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
  } else if (range[0] == 0 && range[1] == 0) {
    const Restaurants = await Restaurant.find({
      [key]: { $regex: search, $options: "i" },
      type: type,
    });
    return Restaurants;
  } else {
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
};

export const getResByName = async (req, res) => {
  const { name, priceRange, type } = req.body;
  const range = findPriceRange(priceRange);
  const key = "name";
  try {
    const Restaurants = await searchRestaurant(key, name, range, type);
    res.status(200).json(Restaurants);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const getResByAddress = async (req, res) => {
  const { address, priceRange, type } = req.body;
  const range = findPriceRange(priceRange);
  const key = "address";
  try {
    const Restaurants = await searchRestaurant(key, address, range, type);
    res.status(200).json(Restaurants);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const getResStatus = async (req, res) => {
  const { name } = req.params;
  const now = new Date(),
    days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
    weekDay = days[now.getDay()],
    hour = now.getHours(),
    minutes = now.getMinutes();

  const currentMin = convertToMin(hour, minutes);

  console.log(name);
  try {
    const resOpen = await Restaurant.find({
      name: name,
      openDays: { weekDay: weekDay, status: 1 },
      $and: [
        { "openHours.openTime": { $lte: currentMin } },
        { "openHours.closeTime": { $gte: currentMin } },
      ],
    });

    if (resOpen.length == 0) {
      res.status(200).json("false");
    } else {
      res.status(200).json("true");
    }
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};
