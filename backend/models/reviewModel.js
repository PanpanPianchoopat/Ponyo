import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  user_id: { type: String, required: true, unique: true},
  res_id: { type: String, required: true },
  date: { type: Date, required: true },
  reviewText: { type: String },
  star: { type: Number, required: true },
  image: { type: Array },
  like: { type: Array },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
