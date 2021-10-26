import express from "express";
import {
  addRestaurant,
  getAllRestaurant,
} from "../controllers/restaurantCon.js";

const router = express.Router();

router.post("/", addRestaurant);
router.get("/", getAllRestaurant);

export default router;
