import express from "express";
import { addReview } from "../controllers/reviewCon.js";

const router = express.Router();

router.post("/:rest_id", addReview);

export default router;
