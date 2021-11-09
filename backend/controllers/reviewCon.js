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
  });
  try {
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const editReview = async (req, res) => {
  const { id, reviewer } = req.params;
  const { reviewText, star, image } = req.body;
  const date = new Date();

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No review with id: ${id}`);

  const updatedReview = {
    reviewText,
    star,
    image,
    reviewer,
    date,
    _id: id,
  };

  await Review.findByIdAndUpdate(id, updatedReview, { new: true });

  res.status(200).json({ Message: "Updated Success" });
};

export const deleteReview = async (req, res) => {
  const { review_id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(review_id))
    return res.status(404).send(`No post with id: ${review_id}`);

  await Review.findByIdAndRemove(review_id);

  res.json({ message: "Review deleted successfully." });
};

export const getAllReview = async (req, res) => {
  const { rest_id, username } = req.params;
  const likeTest = ["Yingza", "pungjung"];
  try {
    const Reviews = await Review.aggregate([
      {
        $match: {
          rest_id: rest_id,
        },
      },
      {
        $project: {
          reviewer: 1,
          date: 1,
          reviewText: 1,
          star: 1,
          image: 1,
          editDelete: {
            $cond: {
              if: { $strcasecmp: ["$reviewer", username] },
              then: false,
              else: true,
            },
          },
          likeReview: {
            $cond: {
              if: { $in: [username, "$like"] },
              then: true,
              else: false,
            },
          },
          countLike: {
            $size: { $ifNull: ["$like", []] },
          },
        },
      },
    ]);
    res.status(200).json(Reviews);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const getReview = async (req, res) => {
  const { rest_id, filter } = req.params;
  const { star } = req.body;

  try {
    if (filter == "star") {
      const Reviews = await getReviewByStar(rest_id, star);
      res.status(200).json(Reviews);
    } else if (filter == "comment") {
      const Reviews = await getReviewByComment(rest_id);
      res.status(200).json(Reviews);
    } else {
      const Reviews = await getReviewByPhoto(rest_id);
      res.status(200).json(Reviews);
    }
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

const getReviewByStar = async (rest_id, star) => {
  const Reviews = await Review.find({
    rest_id: rest_id,
    star: star,
  });
  return Reviews;
};

const getReviewByComment = async (rest_id) => {
  const Reviews = await Review.find({
    rest_id: rest_id,
    reviewText: { $exists: true, $ne: "" },
  });
  return Reviews;
};

const getReviewByPhoto = async (rest_id) => {
  const Reviews = await Review.find({
    rest_id: rest_id,
    image: { $exists: true, $ne: [] },
  });
  return Reviews;
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
    //Find number of photo
    else {
      const amountPhoto = await Review.find({
        rest_id: rest_id,
        image: { $exists: true, $ne: [] },
      }).count();
      res.status(200).json(amountPhoto);
      return amountPhoto;
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

export const addLikeReview = async (req, res) => {
  const { review_id, username, like } = req.params;

  if (!mongoose.Types.ObjectId.isValid(review_id))
    return res.status(404).send(`No review with id: ${review_id}`);

  if (like == "true") {
    await Review.findByIdAndUpdate(
      review_id,
      {
        $push: {
          like: username,
        },
      },
      { new: true }
    );
    res.status(200).json({ Message: "add Success" });
  } else {
    await Review.findByIdAndUpdate(
      review_id,
      { $pull: { like: username } },
      { new: true }
    );
    res.status(200).json({ Message: "remove Success" });
  }
};
