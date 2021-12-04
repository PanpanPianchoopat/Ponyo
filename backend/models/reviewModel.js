/*******************************************************************************
 * This file is the structure of the reviews's collection
 *******************************************************************************
 */

import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  userID: { type: String, required: true},
  resID: { type: String, required: true },
  date: { type: Date, required: true },
  reviewText: { type: String },
  star: { type: Number, required: true },
  image: { type: Array },
  like: { type: Array },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
