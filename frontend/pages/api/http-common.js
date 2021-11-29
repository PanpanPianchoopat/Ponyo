import axios from "axios";

export default axios.create({
  baseURL: "https://ponyo-restaurant-review.herokuapp.com",
  headers: {
    "Content-type": "application/json",
  },
});

export const BASE_URL = "https://ponyo-restaurant-review.herokuapp.com";
