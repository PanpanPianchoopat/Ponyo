import express from "express";
import {
  addRestaurant,
  getAllRestaurant,
  getResByName,
  getRestaurantByID,
  getResByAddress,
  getResByType,
  getTagStatus,
} from "../controllers/restaurantCon.js";

const router = express.Router();

router.post("/", addRestaurant);
router.get("/", getAllRestaurant);
router.get("/:id",getRestaurantByID)
router.get("/name", getResByName);
router.get("/address", getResByAddress);
router.get("/:type", getResByType);
router.get("/status/:name", getTagStatus);

export default router;
