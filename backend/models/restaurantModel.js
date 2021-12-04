/*******************************************************************************
 * This file is the structure of the restaurants's collection
 *******************************************************************************
 */

import mongoose from "mongoose";

const restaurantSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true }, 
  type: { type: String },
  description: { type: String, required: true },
  location: {
    address: { type: String, required: true },
    ggLink: { type: String, required: true },
  },
  phone: { type: String, required: true },
  priceRange: {
    min: { type: Number },
    max: { type: Number },
  },
  openDays: { type: Array, required: true },
  openHours: {
    openTime: { type: Number, required: true },
    closeTime: { type: Number, required: true },
  },
  image: { type: Array, required: true },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
