/*******************************************************************************
 * This file includes the functions that add, update, delete and query the data
 * from the reviews's collection in the database.
 *******************************************************************************
 */
import mongoose from "mongoose";
import Review from "../models/reviewModel.js";
const ObjectId = mongoose.Types.ObjectId;

/*******************************************************************************
 * This function is used to add review for the restaurant.
 * 'resID' is the restaurant's ID that want to add review
 * 'userID' is the user's ID that want to add review
 * Returns
 * - true if added successfully
 * - false if added not successfully
 *******************************************************************************
 */
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

/*******************************************************************************
 * This function is used to edit review.
 * 'reviewID' is the review's ID that want to edit review
 * Returns
 * - true if edited successfully
 * - false if edited not successfully
 *******************************************************************************
 */
export const editReview = async (req, res) => {
  const { reviewID } = req.params;
  const { reviewText, star, image } = req.body;

  if (!mongoose.Types.ObjectId.isValid(reviewID))
    return res
      .status(200)
      .json({ status: false, Message: `No review with id: ${reviewID}` });

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

/*******************************************************************************
 * This function is used to delete review.
 * 'reviewID' is the review's ID that want to delete review
 * Returns
 * - true if deleted successfully
 * - false if deleted not successfully
 *******************************************************************************
 */
export const deleteReview = async (req, res) => {
  const { reviewID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewID))
    return res
      .status(200)
      .json({ status: false, Message: `No review with id: ${reviewID}` });

  await Review.findByIdAndRemove(reviewID);

  res
    .status(200)
    .json({ status: true, Message: "Review deleted successfully" });
};

/*******************************************************************************
 * This function is used to get all reviews in that restaurant from database.
 * 'resID' is the restaurant's ID that want to see the reviews
 * 'userID' is the user's ID that is used to check which review is user belongs to
 * Returns array object of all reviews
 *******************************************************************************
 */
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

/*******************************************************************************
 * This function is used to get reviews in each filter.
 * 'resID' is the restaurant's ID that want to see the reviews
 * 'userID' is the user's ID that is used to check which review is user belongs to
 * 'filter' is the type of filter that want to see reviews
 * 'star' is the amount of star that want to see reviews
 * Returns array object of reviews
 *******************************************************************************
 */
export const getReviewByFilter = async (req, res) => {
  const { resID, filter, userID, star } = req.params;

  try {
    if (filter == "star") {
      const Reviews = await getReviewByStar(resID, userID, star);
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

/*******************************************************************************
 * This function is used to get the number of reviews by each type of reviews.
 * 'resID' is the restaurant's ID that want to see the reviews
 * 'typeReview' is the type of review
 * 'star' is the amount of star
 * Returns number of reviews by each type of reviews
 *******************************************************************************
 */
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

/*******************************************************************************
 * This function is used to calculate the average of review's rate.
 * 'resID' is the restaurant's ID that want to see
 * Returns average of review's rate
 *******************************************************************************
 */
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

/*******************************************************************************
 * This function is used to add number of like of the review.
 * 'reviewID' is the review's ID that user want to like the review
 * 'userID' is the user's ID that want to like the review
 * 'like' is the status of heart button that the user already push or not
 *  - true - if the user has already pushed the button
 *  - false - if the user not push the button
 * Returns
 *  - true status if added like successfully
 *  - false status if added not successfully
 *******************************************************************************
 */
export const addLikeReview = async (req, res) => {
  const { reviewID, userID, like } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewID))
    return res.status(404).send(`No review with id: ${reviewID}`);

  try {
    // if the user has already pushed the button
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
      res.status(200).json({ status: true, Message: "Add Success" });
    }
    // if the user not push the button
    else {
      await Review.findByIdAndUpdate(
        reviewID,
        { $pull: { like: userID } },
        { new: true }
      );
      res.status(200).json({ status: false, Message: "Remove Success" });
    }
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

/************************      PRIVATE FUNCTION        ************************/

/*******************************************************************************
 * This function is used to get reviews by star filter
 * 'resID' is the restaurant's ID that want to see the reviews
 * 'userID' is the user's ID that is used to check which review is user belongs to
 * 'star' is the amount of star that want to see reviews
 * Returns array object of reviews
 *******************************************************************************
 */
const getReviewByStar = async (resID, userID, star) => {
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

/*******************************************************************************
 * This function is used to get reviews by with conmment filter
 * 'resID' is the restaurant's ID that want to see the reviews
 * 'userID' is the user's ID that is used to check which review is user belongs to
 * Returns array object of reviews
 *******************************************************************************
 */
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

/*******************************************************************************
 * This function is used to get reviews by photo filter
 * 'resID' is the restaurant's ID that want to see the reviews
 * 'userID' is the user's ID that is used to check which review is user belongs to
 * Returns array object of reviews
 *******************************************************************************
 */
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
