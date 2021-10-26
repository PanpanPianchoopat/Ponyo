import mongoose from "mongoose";

const restaurantSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    address: { type: String, required: true },
    postCode: { type: String, required: true },
    province: { type: String, required: true },
    ggLink: { type: String, required: true },
  },
  phone: { type: String, required: true },
  priceRange: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  OpenHours: { type: Array, required: true },
  holiday: { type: Array },
  imageFile: { type: String, required: true },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
