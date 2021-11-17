import express from "express";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import Review from "../models/reviewModel.js";
import User from "../models/userModel.js";

const router = express.router;

export const addReview = async (req, res) => {
  const { res_id, user_id } = req.params;
  const { reviewText, star, image } = req.body;

  const newReview = new Review({
    res_id,
    user_id,
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
  const { review_id } = req.params;
  const { reviewText, star, image } = req.body;
  const date = new Date();

  if (!mongoose.Types.ObjectId.isValid(review_id))
    return res.status(404).send(`No review with id: ${review_id}`);

  const updatedReview = {
    reviewText,
    star,
    image,
    date: new Date(),
    _id: review_id,
  };

  await Review.findByIdAndUpdate(review_id, updatedReview, { new: true });

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
  const { res_id, user_id } = req.params;

  try {
    const Reviews = await Review.aggregate([
      {
        $match: {
          res_id: res_id,
        },
      },

      {
        $project: {
          user_id_ob: {
            $convert: {
              input: "$user_id",
              to: "objectId",
              onError: "",
              onNull: "",
            },
          },
          date: {
            $dateToString: {
              format: "%d/%m/%Y",
              date: "$date",
            },
          },

          reviewer: 1,
          reviewText: 1,
          star: 1,
          image: 1,
          editDelete: {
            $cond: {
              if: { $strcasecmp: ["$user_id", user_id] },
              then: false,
              else: true,
            },
          },
          likeReview: {
            $cond: {
              if: { $in: [user_id, "$like"] },
              then: true,
              else: false,
            },
          },
          countLike: {
            $size: { $ifNull: ["$like", []] },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id_ob",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $addFields: {
          reviewer: "$user.username",
        },
      },
    ]);
    res.status(200).json(Reviews);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const getReviewByFilter = async (req, res) => {
  const { res_id, filter, user_id, star } = req.params;

  try {
    if (filter == "star") {
      const Reviews = await getReviewByStar(res_id, star, user_id);
      res.status(200).json(Reviews);
    } else if (filter == "comment") {
      const Reviews = await getReviewByComment(res_id, user_id);
      res.status(200).json(Reviews);
    } else if (filter == "photo") {
      const Reviews = await getReviewByPhoto(res_id, user_id);
      res.status(200).json(Reviews);
    }
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

const getReviewByStar = async (res_id, star, user_id) => {
  const starInt = Number(star);
  const Reviews = await Review.aggregate([
    {
      $match: {
        res_id: res_id,
        star: starInt,
      },
    },
    {
      $project: {
        user_id_ob: {
          $convert: {
            input: "$user_id",
            to: "objectId",
            onError: "",
            onNull: "",
          },
        },
        date: {
          $dateToString: {
            format: "%d/%m/%Y",
            date: "$date",
          },
        },
        reviewer: 1,
        reviewText: 1,
        star: 1,
        image: 1,
        editDelete: {
          $cond: {
            if: { $strcasecmp: ["$user_id", user_id] },
            then: false,
            else: true,
          },
        },
        likeReview: {
          $cond: {
            if: { $in: [user_id, "$like"] },
            then: true,
            else: false,
          },
        },
        countLike: {
          $size: { $ifNull: ["$like", []] },
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user_id_ob",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $addFields: {
        reviewer: "$user.username",
      },
    },
  ]);
  return Reviews;
};

const getReviewByComment = async (res_id, user_id) => {
  const Reviews = await Review.aggregate([
    {
      $match: {
        res_id: res_id,
        reviewText: { $exists: true, $ne: "" },
      },
    },
    {
      $project: {
        user_id_ob: {
          $convert: {
            input: "$user_id",
            to: "objectId",
            onError: "",
            onNull: "",
          },
        },
        // date:1,
        date: {
          $dateToString: {
            format: "%d/%m/%Y",
            date: "$date",
          },
        },
        reviewer: 1,
        reviewText: 1,
        star: 1,
        image: 1,
        editDelete: {
          $cond: {
            if: { $strcasecmp: ["$user_id", user_id] },
            then: false,
            else: true,
          },
        },
        likeReview: {
          $cond: {
            if: { $in: [user_id, "$like"] },
            then: true,
            else: false,
          },
        },
        countLike: {
          $size: { $ifNull: ["$like", []] },
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user_id_ob",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $addFields: {
        reviewer: "$user.username",
      },
    },
  ]);

  return Reviews;
};

const getReviewByPhoto = async (res_id, user_id) => {
  const Reviews = await Review.aggregate([
    {
      $match: {
        res_id: res_id,
        image: { $exists: true, $ne: [] },
      },
    },
    {
      $project: {
        user_id_ob: {
          $convert: {
            input: "$user_id",
            to: "objectId",
            onError: "",
            onNull: "",
          },
        },
        // date:1,
        date: {
          $dateToString: {
            format: "%d/%m/%Y",
            date: "$date",
          },
        },
        reviewer: 1,
        reviewText: 1,
        star: 1,
        image: 1,
        editDelete: {
          $cond: {
            if: { $strcasecmp: ["$user_id", user_id] },
            then: false,
            else: true,
          },
        },
        likeReview: {
          $cond: {
            if: { $in: [user_id, "$like"] },
            then: true,
            else: false,
          },
        },
        countLike: {
          $size: { $ifNull: ["$like", []] },
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user_id_ob",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $addFields: {
        reviewer: "$user.username",
      },
    },
  ]);
  return Reviews;
};

export const getReviewAmount = async (req, res) => {
  const { res_id, typeReview, star } = req.params;

  try {
    //Find number of all review (All rating)
    if (typeReview == "all") {
      const amountRate = await Review.find({
        res_id: res_id,
      }).count();
      res.status(200).json(amountRate);
      return amountRate;
    }
    //Find number of review with comment
    else if (typeReview == "comment") {
      const amountComment = await Review.find({
        res_id: res_id,
        reviewText: { $exists: true, $ne: "" },
      }).count();
      res.status(200).json(amountComment);
      return amountComment;
    }
    //Find number of review with star
    else if (typeReview == "star") {
      const amountStar = await Review.find({
        res_id: res_id,
        star: star,
      }).count();
      res.status(200).json(amountStar);
      return amountStar;
    }
    //Find number of review with photo
    else if (typeReview == "photo") {
      const amountPhoto = await Review.find({
        res_id: res_id,
        image: { $exists: true, $ne: [] },
      }).count();
      res.status(200).json(amountPhoto);
      return amountPhoto;
    }
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const calReviewRate = async (req, res) => {
  const { res_id } = req.params;
  try {
    const avgStar = await Review.aggregate([
      {
        $match: {
          res_id: res_id,
        },
      },
      {
        $group: {
          _id: null,
          avg: { $avg: "$star" },
        },
      },
      {
        $project: {
          _id: "$id",
          avgStar: { $round: ["$avg", 1] },
        },
      },
    ]);
    res.status(200).json(avgStar);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const addLikeReview = async (req, res) => {
  const { review_id, user_id, like } = req.params;

  if (!mongoose.Types.ObjectId.isValid(review_id))
    return res.status(404).send(`No review with id: ${review_id}`);

  try {
    if (like == "true") {
      await Review.findByIdAndUpdate(
        review_id,
        {
          $push: {
            like: user_id,
          },
        },
        { new: true }
      );
      res.status(200).json({ Message: "add Success" });
    } else {
      await Review.findByIdAndUpdate(
        review_id,
        { $pull: { like: user_id } },
        { new: true }
      );
      res.status(200).json({ Message: "remove Success" });
    }
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};
