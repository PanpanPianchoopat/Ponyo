import express from "express";
import {
  addReview,
  getAllReview,
  getReviewByStar,
  getReviewByComment,
  getReviewByPhoto,
  getAmount,
} from "../controllers/reviewCon.js";

const router = express.Router();

router.post("/:rest_id", addReview);
router.get("/:rest_id", getAllReview);
router.get("/comment/:rest_id", getReviewByComment);
router.get("/image/:rest_id", getReviewByPhoto);
router.get("/amount/:rest_id", getAmount);
router.get("/star/:star", getReviewByStar);


export default router;
