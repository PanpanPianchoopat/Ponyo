import express from "express";
import Restaurant from "../models/restaurantModel.js";

const router = express.router;

const dayStatus = (weekDay) => {
  const status = [0, 0, 0, 0, 0, 0, 0];
  let i = 0;
  while (i < weekDay.length) {
    const day = weekDay[i];
    status[day] = 1;
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
    postCode,
    province,
    ggLink,
    phone,
    min,
    max,
    weekDay,
    startHour,
    startMin,
    endHour,
    endMin,
    imageFile,
  } = req.body;

  const status = dayStatus(weekDay);
  const openTime = convertToMin(startHour, startMin);
  const closeTime = convertToMin(endHour, endMin);

  const newRestaurant = new Restaurant({
    name,
    type,
    description,
    location: { address, postCode, province, ggLink },
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
    imageFile,
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
  } else if (priceRange == 2) {
    range[0] = 1000;
    range[1] = 5000;
  } else {
    range[0] = 5000;
    range[1] = 10000;
  }
  return range;
};

export const getResByName = async (req, res) => {
  const { name, priceRange, type } = req.body;
  const range = findPriceRange(priceRange);

  try {
    const Restaurants = await Restaurant.find({
      name: { $regex: name, $options: "i" },
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

    res.status(200).json(Restaurants);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const getResByPostCode = async (req, res) => {
  const { postCode, priceRange, type } = req.body;
  const range = findPriceRange(priceRange);

  try {
    const Restaurants = await Restaurant.find({
      "location.postCode": postCode,
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

    res.status(200).json(Restaurants);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const getResByProvince = async (req, res) => {
  const { province, priceRange, type } = req.body;
  const range = findPriceRange(priceRange);

  try {
    const Restaurants = await Restaurant.find({
      "location.province": { $regex: province, $options: "i" },
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
