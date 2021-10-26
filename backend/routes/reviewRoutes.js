import express from "express";
import { addReview } from "../controllers/reviewCon.js";

const router = express.Router();

router.get("/", addReview);

export default router;
