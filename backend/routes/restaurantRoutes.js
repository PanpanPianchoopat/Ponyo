import express from "express";
import {
  addRestaurant,
  getAllRestaurants,
  getRestaurantDetail,
  getRestuarantByType,
  getRestaurantStatus,
  getRestaurant,
} from "../controllers/restaurantCon.js";

const router = express.Router();

router.post("/", addRestaurant);
router.get("/", getAllRestaurants);
router.get("/search/:filter", getRestaurant);
router.get("/type/:type", getRestuarantByType);
router.get("/detail/:id", getRestaurantDetail);
router.get("/status/:name", getRestaurantStatus);

export default router;
