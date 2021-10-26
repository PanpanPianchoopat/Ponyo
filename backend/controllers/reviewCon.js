import express from "express";
import Review from "../models/reviewModel.js";

const router = express.router;

export const addReview = (req, res) => {
  res.send("Add Review API");
};
