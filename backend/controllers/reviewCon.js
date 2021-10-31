import express from "express";
import Review from "../models/reviewModel.js";

const router = express.router;

export const addReview = async (req, res) => {
  res.send("Add Review API");
  const {rest_id} = req.params;
  const{
    reviewer,
    date,
    reviewText,
    star,
    image,
  } = req.body;

  const newReview = new Review({
    rest_id,
    reviewer,
    date,
    reviewText,
    star,
    image,
    like: 0,
  })

  try {
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};


