import express from "express";
import {
  register,
  login,
  addRestaurantToList,
  removeResFromList,
  getMyRestaurantList,
  editMyFavList,
} from "../controllers/userCon.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/add/:key/:id/:res_id", addRestaurantToList);
router.get("/list/:key/:user_id", getMyRestaurantList);
router.post("/delete/:key/:id/:index", removeResFromList);
router.patch("/editfav/:id", editMyFavList);

export default router;
