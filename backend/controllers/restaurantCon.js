import express from "express";
import Restaurant from "../models/restaurantModel.js";

const router = express.router;

export const addRestaurant = async (req, res) => {
  const {
    name,
    type,
    description,
    location: { address, postCode, province, ggLink },
    phone,
    priceRange: { min, max },
    OpenHours,
    holiday,
    imageFile,
  } = req.body;

  const newRestaurant = new Restaurant({
    name,
    type,
    description,
    location: { address, postCode, province, ggLink },
    phone,
    priceRange: { min, max },
    OpenHours,
    holiday,
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
  const range=[0,0];
  if(priceRange == 1){
      range[0] = 0;
      range[1] = 500;
  }
  else if(priceRange == 2){
    range[0] = 500;
    range[1] = 1000;
  }
  else if(priceRange == 2){
    range[0] = 1000;
    range[1] = 5000;
  }
  else{
    range[0] = 5000;
    range[1] = 10000;
  }
  return range
}

export const getResByName = async (req, res) => {
  const { name, priceRange,type } = req.body;
  const range = findPriceRange(priceRange);

  try {
    const Restaurants = await Restaurant.find({
      name: { $regex: name, $options: "i" },
      $or:[
        {$and:[
          { "priceRange.min": {$gte:range[0] }},
          { "priceRange.min": {$lte:range[1] }}
        ]},
        {$and:[
          { "priceRange.max": {$gte:range[0] }},
          { "priceRange.max": {$lte:range[1] }}
        ]}
      ], type: type
    });

    res.status(200).json(Restaurants);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const getResByPostCode = async (req, res) => {
  const { postCode, priceRange,type } = req.body
  const range = findPriceRange(priceRange);
  
  try {
    const Restaurants = await Restaurant.find({
      "location.postCode": postCode,
      $or:[
        {$and:[
          { "priceRange.min": {$gte:range[0] }},
          { "priceRange.min": {$lte:range[1] }}
        ]},
        {$and:[
          { "priceRange.max": {$gte:range[0] }},
          { "priceRange.max": {$lte:range[1] }}
        ]}
      ], type: type
    });
  
  res.status(200).json(Restaurants);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const getResByProvince = async (req, res) => {
  const { province, priceRange,type } = req.body;
  const range = findPriceRange(priceRange);

  try {
    const Restaurants = await Restaurant.find({
      "location.province": { $regex: province, $options: "i" },
      $or:[
        {$and:[
          { "priceRange.min": {$gte:range[0] }},
          { "priceRange.min": {$lte:range[1] }}
        ]},
        {$and:[
          { "priceRange.max": {$gte:range[0] }},
          { "priceRange.max": {$lte:range[1] }}
        ]}
      ], type: type
    });

    res.status(200).json(Restaurants);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};
