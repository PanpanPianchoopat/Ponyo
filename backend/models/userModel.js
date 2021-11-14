import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  image: { type: String },
  myFavRestaurants: { type: Array },
  myInterestRestaurants: { type: Array },
});

const User = mongoose.model("User", userSchema);

export default User;
