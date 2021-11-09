import express from "express";
import {
  addReview,
  getAllReview,
  getReview,
  getAmount,
  calRate,
  editReview,
  deleteReview,
  addLikeReview,
} from "../controllers/reviewCon.js";

const router = express.Router();

router.patch("/edit/:id/:reviewer", editReview);
router.delete("/delete/:review_id", deleteReview);
router.get("/filter/:rest_id/:filter", getReview);
router.get("/amount/:rest_id", getAmount);

router.get("/rate/:rest_id", calRate);
router.patch("/like/:review_id/:username/:like", addLikeReview);
router.post("/:rest_id/:reviewer", addReview);
router.get("/:rest_id/:username", getAllReview);

export default router;
