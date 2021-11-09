import express from "express";
import {
  addReview,
  getAllReview,
  getReviewByStar,
  getReviewByComment,
  getReviewByPhoto,
  getAmount,
  calRate,
  editReview,
  deleteReview,
  addLikeReview,
} from "../controllers/reviewCon.js";

const router = express.Router();

router.patch("/edit/:id/:reviewer", editReview);
router.delete("/delete/:review_id", deleteReview);
router.get("/comment/:rest_id", getReviewByComment);
router.get("/image/:rest_id", getReviewByPhoto);
router.get("/amount/:rest_id", getAmount);
router.get("/star/:rest_id", getReviewByStar);
router.get("/rate/:rest_id", calRate);
router.patch("/like/:review_id/:username/:like", addLikeReview);
router.post("/:rest_id/:reviewer", addReview);
router.get("/:rest_id/:username", getAllReview);

export default router;
