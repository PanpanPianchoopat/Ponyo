import express from "express";
import { addReview,getAllReview,getReviewByStar } from "../controllers/reviewCon.js";

const router = express.Router();

router.post("/:rest_id", addReview);
router.get("/:rest_id", getAllReview);
router.get("/:rest_id/:star", getReviewByStar);

export default router;
