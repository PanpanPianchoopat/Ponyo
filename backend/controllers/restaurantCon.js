import express from "express";
import Restaurant from "../models/restaurantModel.js";

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

  console.log(image);
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

const findStatus = async (statusRes, key, search, range, type) => {
  const now = new Date(),
    days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
    weekDay = days[now.getDay()],
    hour = now.getHours(),
    minutes = now.getMinutes();
  console.log("statusRes" + statusRes);
  const currentMin = convertToMin(hour, minutes);
  //tag
  if (statusRes == 2) {
    const resOpen = await Restaurant.find({
      [key]: { $regex: search, $options: "i" },
      openDays: { weekDay: weekDay, status: 1 },
      $and: [
        { "openHours.openTime": { $lte: currentMin } },
        { "openHours.closeTime": { $gte: currentMin } },
      ],
    });
    if (resOpen.length == 0) {
      return 0;
    } else {
      return 1;
    }
  }
  //search open
  else if (statusRes == 1) {
    //no type and no price
    if (!type && range[0] == 0 && range[1] == 0) {
      const resOpen = await Restaurant.find({
        [key]: { $regex: search, $options: "i" },
        openDays: { weekDay: weekDay, status: 1 },
        $and: [
          { "openHours.openTime": { $lte: currentMin } },
          { "openHours.closeTime": { $gte: currentMin } },
        ],
      });
      return resOpen;
    }
    //no type
    else if (!type) {
      const resOpen = await Restaurant.find({
        [key]: { $regex: search, $options: "i" },
        $unionWith: [
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
        openDays: { weekDay: weekDay, status: 1 },
        $and: [
          { "openHours.openTime": { $lte: currentMin } },
          { "openHours.closeTime": { $gte: currentMin } },
        ],
      });
      return resOpen;
    }
    //no price
    else if (range[0] == 0 && range[1] == 0) {
      const resOpen = await Restaurant.find({
        [key]: { $regex: search, $options: "i" },
        type: type,
        openDays: { weekDay: weekDay, status: 1 },
        $and: [
          { "openHours.openTime": { $lte: currentMin } },
          { "openHours.closeTime": { $gte: currentMin } },
        ],
      });
      return resOpen;
    } else {
      const resOpen = await Restaurant.find({
        [key]: { $regex: search, $options: "i" },
        $unionWith: [
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
        openDays: { weekDay: weekDay, status: 1 },
        $and: [
          { "openHours.openTime": { $lte: currentMin } },
          { "openHours.closeTime": { $gte: currentMin } },
        ],
      });
      return resOpen;
    }
  }
  //search close
  else {
    console.log("range" + range);
    //no type and no price
    if (!type && range[0] == 0 && range[1] == 0) {
      const resOpen = await Restaurant.find({
        [key]: { $regex: search, $options: "i" },
        $or: [
          { openDays: { weekDay: weekDay, status: 0 } },
          {
            $or: [
              { "openHours.openTime": { $gte: currentMin } },
              { "openHours.closeTime": { $lte: currentMin } },
            ],
          },
        ],
      });
      return resOpen;
    }
    //no type
    else if (!type) {
      console.log("Testtestka");
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
              { "priceRange.min": { $gte: range[0] } },
              { "priceRange.min": { $lte: range[1] } },
            ],
          },
        ],
        $or: [
          { openDays: { weekDay: weekDay, status: 0 } },
          {
            $or: [
              { "openHours.openTime": { $gte: currentMin } },
              { "openHours.closeTime": { $lte: currentMin } },
            ],
          },
        ],
      });
      return resOpen;
    }
    //no price
    else if (range[0] == 0 && range[1] == 0) {
      const resOpen = await Restaurant.find({
        [key]: { $regex: search, $options: "i" },
        type: type,
        $or: [
          { openDays: { weekDay: weekDay, status: 0 } },
          {
            $or: [
              { "openHours.openTime": { $gte: currentMin } },
              { "openHours.closeTime": { $lte: currentMin } },
            ],
          },
        ],
      });
      return resOpen;
    } else {
      const resOpen = await Restaurant.find({
        [key]: { $regex: search, $options: "i" },
        $and: [
          { "priceRange.min": { $gte: range[0] } },
          { "priceRange.min": { $lte: range[1] } },
        ],
        // $unionWith: [
        //   {
        //     $and: [
        //       { "priceRange.min": { $gte: range[0] } },
        //       { "priceRange.min": { $lte: range[1] } },
        //     ],
        //   },
        //   {
        //     $and: [
        //       { "priceRange.max": { $gte: range[0] } },
        //       { "priceRange.max": { $lte: range[1] } },
        //     ],
        //   },
        // ],
        type: type,
        $or: [
          { openDays: { weekDay: weekDay, status: 0 } },
          {
            $or: [
              { "openHours.openTime": { $gte: currentMin } },
              { "openHours.closeTime": { $lte: currentMin } },
            ],
          },
        ],
      });
      return resOpen;
    }
  }
};

const searchRestaurant = async (key, search, range, type, status) => {
  //All
  if (status == 2) {
    if (!type && range[0] == 0 && range[1] == 0) {
      const Restaurants = await Restaurant.find({
        [key]: { $regex: search, $options: "i" },
      });
      return Restaurants;
    } else if (!type) {
      console.log(range);
      const Restaurants = await Restaurant.find({
        [key]: { $regex: search, $options: "i" },
        $unionWith: [
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
        $unionWith: [
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
  // open
  else if (status == 1) {
    const Restaurants = await findStatus(1, key, search, range, type);
    return Restaurants;
  }
  //close
  else {
    const Restaurants = await findStatus(0, key, search, range, type);
    return Restaurants;
  }
};

export const getResByName = async (req, res) => {
  const { name, priceRange, type, status } = req.body;
  const range = findPriceRange(priceRange);
  const key = "name";
  try {
    const Restaurants = await searchRestaurant(key, name, range, type, status);
    res.status(200).json(Restaurants);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const getResByAddress = async (req, res) => {
  const { address, priceRange, type, status } = req.body;
  const range = findPriceRange(priceRange);
  const key = "address";
  try {
    const Restaurants = await searchRestaurant(
      key,
      address,
      range,
      type,
      status
    );
    res.status(200).json(Restaurants);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const getResStatus = async (req, res) => {
  const { name } = req.params;

  try {
    const resOpen = await findStatus(2, "name", name, "", "");

    if (resOpen == 0) {
      res.status(200).json("false");
    } else {
      res.status(200).json("true");
    }
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};
