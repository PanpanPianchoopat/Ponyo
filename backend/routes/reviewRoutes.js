import express from "express";
import {
  addReview,
  getAllReview,
  getReviewByFilter,
  getReviewAmount,
  calReviewRate,
  editReview,
  deleteReview,
  addLikeReview,
} from "../controllers/reviewCon.js";

const router = express.Router();
router.post("/add/:resID/:userID", addReview);
router.patch("/edit/:reviewID", editReview);
router.delete("/delete/:reviewID", deleteReview);
router.get("/rate/:resID" , calReviewRate);
router.get("/filter/:filter/:resID/:userID/:star", getReviewByFilter);
router.get("/all/:resID/:userID", getAllReview);
router.get("/amount/:resID/:typeReview/:star", getReviewAmount);
router.patch("/like/:reviewID/:userID/:like", addLikeReview);

export default router;
