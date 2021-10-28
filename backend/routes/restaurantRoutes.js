import express from "express";
import {
  addRestaurant,
  getAllRestaurant,
  getResByName,
  getResByAddress,
  getResStatus,
} from "../controllers/restaurantCon.js";

const router = express.Router();

router.post("/", addRestaurant);
router.get("/", getAllRestaurant);
router.get("/name", getResByName);
router.get("/address", getResByAddress);
router.get("/status/:name", getResStatus);

export default router;
