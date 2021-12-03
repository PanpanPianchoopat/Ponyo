import express from "express";
import mongoose from "mongoose";
import Review from "../models/reviewModel.js";
const ObjectId = mongoose.Types.ObjectId;
const router = express.router;

export const addReview = async (req, res) => {
  const { resID, userID } = req.params;
  var { reviewText, star, image } = req.body;
  const newReview = new Review({
    resID,
    userID,
    date: new Date(),
    reviewText,
    star,
    image,
  });

  try {
    const checkUserReview = await Review.find({
      userID: ObjectId(userID),
      resID: resID,
    });

    if (checkUserReview.length == 0) {
      await newReview.save();
      res.status(201).json(true);
    } else {
      res.status(201).json(false);
    }
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

export const editReview = async (req, res) => {
  const { reviewID } = req.params;
  const { reviewText, star, image } = req.body;
  const date = new Date();

  if (!mongoose.Types.ObjectId.isValid(reviewID))
    return res.status(404).send(`No review with id: ${reviewID}`);

  const updatedReview = {
    reviewText,
    star,
    image,
    date: new Date(),
    _id: reviewID,
  };

  await Review.findByIdAndUpdate(reviewID, updatedReview, { new: true });

  res.status(200).json({ status: true, Message: "Updated Success" });
};

export const deleteReview = async (req, res) => {
  const { reviewID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewID))
    return res.status(404).send(`No post with id: ${reviewID}`);

  await Review.findByIdAndRemove(reviewID);

  res.json({ status: true, message: "Review deleted successfully." });
};

export const getAllReview = async (req, res) => {
  const { resID, userID } = req.params;

  try {
    const Reviews = await Review.aggregate([
      {
        $match: {
          resID: resID,
        },
      },
      {
        $sort: {
          date: -1,
        },
      },
      {
        $project: {
          userID_ob: {
            $convert: {
              input: "$userID",
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
              if: { $strcasecmp: ["$userID", userID] },
              then: false,
              else: true,
            },
          },
          likeReview: {
            $cond: {
              if: { $in: [userID, "$like"] },
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
          localField: "userID_ob",
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
  const { resID, filter, userID, star } = req.params;

  try {
    if (filter == "star") {
      const Reviews = await getReviewByStar(resID, star, userID);
      res.status(200).json(Reviews);
    } else if (filter == "comment") {
      const Reviews = await getReviewByComment(resID, userID);
      res.status(200).json(Reviews);
    } else if (filter == "photo") {
      const Reviews = await getReviewByPhoto(resID, userID);
      res.status(200).json(Reviews);
    }
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

const getReviewByStar = async (resID, star, userID) => {
  const starInt = Number(star);
  const Reviews = await Review.aggregate([
    {
      $match: {
        resID: resID,
        star: starInt,
      },
    },
    {
      $sort: {
        date: -1,
      },
    },
    {
      $project: {
        userID_ob: {
          $convert: {
            input: "$userID",
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
            if: { $strcasecmp: ["$userID", userID] },
            then: false,
            else: true,
          },
        },
        likeReview: {
          $cond: {
            if: { $in: [userID, "$like"] },
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
        localField: "userID_ob",
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

const getReviewByComment = async (resID, userID) => {
  const Reviews = await Review.aggregate([
    {
      $match: {
        resID: resID,
        reviewText: { $exists: true, $ne: "" },
      },
    },
    {
      $sort: {
        date: -1,
      },
    },
    {
      $project: {
        userID_ob: {
          $convert: {
            input: "$userID",
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
            if: { $strcasecmp: ["$userID", userID] },
            then: false,
            else: true,
          },
        },
        likeReview: {
          $cond: {
            if: { $in: [userID, "$like"] },
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
        localField: "userID_ob",
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

const getReviewByPhoto = async (resID, userID) => {
  const Reviews = await Review.aggregate([
    {
      $match: {
        resID: resID,
        image: { $exists: true, $ne: [] },
      },
    },
    {
      $sort: {
        date: -1,
      },
    },
    {
      $project: {
        userID_ob: {
          $convert: {
            input: "$userID",
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
            if: { $strcasecmp: ["$userID", userID] },
            then: false,
            else: true,
          },
        },
        likeReview: {
          $cond: {
            if: { $in: [userID, "$like"] },
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
        localField: "userID_ob",
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
  const { resID, typeReview, star } = req.params;

  try {
    //Find number of all review (All rating)
    if (typeReview == "all") {
      const amountRate = await Review.find({
        resID: resID,
      }).count();
      res.status(200).json(amountRate);
      return amountRate;
    }
    //Find number of review with comment
    else if (typeReview == "comment") {
      const amountComment = await Review.find({
        resID: resID,
        reviewText: { $exists: true, $ne: "" },
      }).count();
      res.status(200).json(amountComment);
      return amountComment;
    }
    //Find number of review with star
    else if (typeReview == "star") {
      const amountStar = await Review.find({
        resID: resID,
        star: star,
      }).count();
      res.status(200).json(amountStar);
      return amountStar;
    }
    //Find number of review with photo
    else if (typeReview == "photo") {
      const amountPhoto = await Review.find({
        resID: resID,
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
  const { resID } = req.params;
  try {
    const avgStar = await Review.aggregate([
      {
        $match: {
          resID: resID,
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
  const { reviewID, userID, like } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewID))
    return res.status(404).send(`No review with id: ${reviewID}`);

  try {
    if (like == "true") {
      await Review.findByIdAndUpdate(
        reviewID,
        {
          $push: {
            like: userID,
          },
        },
        { new: true }
      );
      res.status(200).json({ Message: "Add Success" });
    } else {
      await Review.findByIdAndUpdate(
        reviewID,
        { $pull: { like: userID } },
        { new: true }
      );
      res.status(200).json({ Message: "Remove Success" });
    }
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};
