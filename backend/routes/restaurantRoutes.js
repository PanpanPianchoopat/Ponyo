import express from "express";
import {
  addRestaurant,
  getAllRestaurants,
  getRestaurantDetail,
  getRestuarantByType,
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
router.get("/type/:type", getRestuarantByType);
router.get("/detail/:res_id", getRestaurantDetail);
router.get("/status/:res_id", getRestaurantStatus);
router.get("/checkList/:key/:user_id/:res_id", checkLikedBookmarked);
router.get("/trending/:type", getTrending);
router.get("/bestTrending", getBestTrending);

export default router;
