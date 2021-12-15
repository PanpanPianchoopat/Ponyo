/*******************************************************************************
 * This file is the base url that connection to the backend
 ******************************************************************************/
import axios from "axios";

export default axios.create({
  baseURL: "https://ponyo-review.herokuapp.com",
  headers: {
    "Content-type": "application/json",
  },
});

export const BASE_URL = "https://ponyo-review.herokuapp.com";
