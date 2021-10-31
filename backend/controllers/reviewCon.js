import express from "express";
import Review from "../models/reviewModel.js";

const router = express.router;

export const addReview = async (req, res) => {
  
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
    res.send("Add Review API");
    res.status(201).json(newReview);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const getAllReview = async (req, res) => {
  const {rest_id} = req.params;
  try {
    const Reviews = await Review.find({
      rest_id: rest_id
    }
    );
    res.status(200).json(Reviews);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};
