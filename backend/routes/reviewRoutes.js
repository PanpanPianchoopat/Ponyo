import express from "express";
import { addReview,getAllReview } from "../controllers/reviewCon.js";

const router = express.Router();

router.post("/:rest_id", addReview);
router.get("/:rest_id", getAllReview);

export default router;
