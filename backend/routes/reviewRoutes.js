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

router.post("/add/:res_id/:user_id", addReview);
router.patch("/edit/:review_id/:user_id", editReview);
router.delete("/delete/:review_id", deleteReview);
router.get("/rate/:res_id", calReviewRate);
router.get("/all/:res_id/:user_id", getAllReview);
router.get("/filter/:filter/:res_id/:user_id", getReviewByFilter);
router.get("/amount/:res_id/:typeReview/:star", getReviewAmount);
router.patch("/like/:review_id/:user_id/:like", addLikeReview);

export default router;
