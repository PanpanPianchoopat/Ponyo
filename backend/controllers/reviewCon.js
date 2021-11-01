import express from "express";
import mongoose from "mongoose";
import Review from "../models/reviewModel.js";

const router = express.router;

export const addReview = async (req, res) => {
  const { rest_id, reviewer } = req.params;
  const { reviewText, star, image } = req.body;

  const newReview = new Review({
    rest_id,
    reviewer,
    date: new Date(),
    reviewText,
    star,
    image,
    like: 0,
  });

  try {
    await newReview.save();
    res.send("Add Review API");
    res.status(201).json(newReview);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const editReview = async (req, res) => {
  const { rest_id, reviewer } = req.params;
  const { reviewText, star, image } = req.body;

  if (!mongoose.Types.ObjectId.isValid(rest_id))
    return res.status(404).send(`No review with id: ${rest_id}`);

  const updatedReview = { reviewText, star, image, reviewer, _id: rest_id };

  await Review.findByIdAndUpdate(rest_id, updatedReview, { new: true });

  res.json(rest_id);
};

export const deleteReview = async (req, res) => {
  const { rest_id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(rest_id))
    return res.status(404).send(`No post with id: ${rest_id}`);

  await Review.findByIdAndRemove(rest_id);

  res.json({ message: "Review deleted successfully." });
};

export const getAllReview = async (req, res) => {
  const { rest_id, username } = req.params;
  console.log("username", username);
  try {
    const Reviews = await Review.aggregate([
      {
        $match: {
          rest_id: rest_id,
        },
      },
      {
        $project: {
          editDelete: {
            $cond: {
              if: { $strcasecmp: ["$reviewer", username] },
              then: false,
              else: true,
            },
          },
        },
      },
    ]);
    res.status(200).json(Reviews);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const getReviewByStar = async (req, res) => {
  const { rest_id } = req.params;
  const { star } = req.body;
  try {
    const Reviews = await Review.find({
      rest_id: rest_id,
      star: star,
    });
    res.status(200).json(Reviews);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const getReviewByComment = async (req, res) => {
  const { rest_id } = req.params;
  try {
    const Reviews = await Review.find({
      rest_id: rest_id,
      reviewText: { $exists: true, $ne: "" },
    });
    res.status(200).json(Reviews);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const getReviewByPhoto = async (req, res) => {
  const { rest_id } = req.params;
  try {
    const Reviews = await Review.find({
      rest_id: rest_id,
      image: { $exists: true, $ne: [] },
    });
    res.status(200).json(Reviews);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const getAmount = async (req, res) => {
  const { rest_id } = req.params;
  const { typeReview, star } = req.body;
  try {
    //Find number of all review (All rating)
    if (typeReview == 1) {
      const amountRate = await Review.find({
        rest_id: rest_id,
      }).count();
      res.status(200).json(amountRate);
      return amountRate;
    }
    //Find number of comment
    else if (typeReview == 2) {
      const amountComment = await Review.find({
        rest_id: rest_id,
        reviewText: { $exists: true, $ne: "" },
      }).count();
      res.status(200).json(amountComment);
      return amountComment;
    }
    //Find number of star
    else if (typeReview == 3) {
      const amountStar = await Review.find({
        rest_id: rest_id,
        star: star,
      }).count();
      res.status(200).json(amountStar);
      return amountStar;
    }
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const calRate = async (req, res) => {
  const { rest_id } = req.params;
  try {
    const avgStar = await Review.aggregate([
      {
        $match: {
          rest_id: rest_id,
        },
      },
      {
        $group: {
          _id: null,
          avg: { $avg: "$star" },
        },
      },
    ]);
    return avgStar;
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};
