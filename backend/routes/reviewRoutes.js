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
} from "../controllers/reviewCon.js";

const router = express.Router();

router.post("/:rest_id/:username", addReview);
router.get("/:rest_id/:username", getAllReview);
router.post("/edit/:rest_id/:reviewer", editReview);
router.delete("/delete/:rest_id", deleteReview);
router.get("/comment/:rest_id", getReviewByComment);
router.get("/image/:rest_id", getReviewByPhoto);
router.get("/amount/:rest_id", getAmount);
router.get("/star/:rest_id", getReviewByStar);
router.get("/rate/:rest_id", calRate);

export default router;
