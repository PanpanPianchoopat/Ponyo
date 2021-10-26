import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  rest_id: { type: String, required: true, unique: true },
  reviewer: { type: String, required: true },
  date: { type: Date, required: true },
  reviewText: { type: String },
  star: { type: Number },
  image: { type: String },
  like: { type: Number },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
