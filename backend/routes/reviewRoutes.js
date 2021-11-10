import express from "express";
import {
  addReview,
  getAllReview,
  getReview,
  getReviewAmount,
  calReviewRate,
  editReview,
  deleteReview,
  addLikeReview,
} from "../controllers/reviewCon.js";

const router = express.Router();


router.post("/:rest_id/:reviewer", addReview);
router.patch("/edit/:review_id/:reviewer", editReview);
router.delete("/delete/:review_id", deleteReview);
router.get("/rate/:rest_id", calReviewRate);
router.get("/filter/:rest_id/:filter", getReview);
router.get("/amount/:rest_id/:typeReview/:star", getReviewAmount);
router.get("/:rest_id/:username", getAllReview);
router.patch("/like/:review_id/:username/:like", addLikeReview);



export default router;
