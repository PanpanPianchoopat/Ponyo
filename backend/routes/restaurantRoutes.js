import express from "express";
import {
  addRestaurant,
  getAllRestaurants,
  getRestaurantDetail,
  getRestaurantStatus,
  getRestaurant,
  checkLikedBookmarked,
  getTrending,
  getBestTrending
} from "../controllers/restaurantCon.js";

const router = express.Router();

router.post("/", addRestaurant);
router.get("/", getAllRestaurants);
router.get(
  "/search/:filter/:search/:priceRange/:type/:resStatus",
  getRestaurant
);

router.get("/detail/:resID", getRestaurantDetail);
router.get("/status/:resID", getRestaurantStatus);
router.get("/checkList/:key/:userID/:resID", checkLikedBookmarked);
router.get("/trending/:type", getTrending);
router.get("/bestTrending", getBestTrending);

export default router;
