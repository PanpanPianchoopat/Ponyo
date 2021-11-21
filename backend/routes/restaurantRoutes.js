import express from "express";
import {
  addRestaurant,
  getAllRestaurant,
  getResByName,
  getResByPostCode,
  getResByProvince,
  getResStatus,
} from "../controllers/restaurantCon.js";

const router = express.Router();

router.post("/", addRestaurant);
router.get("/", getAllRestaurant);
router.get("/name", getResByName);
router.get("/code", getResByPostCode);
router.get("/province", getResByProvince);
router.get("/status/:name", getResStatus);

export default router;
