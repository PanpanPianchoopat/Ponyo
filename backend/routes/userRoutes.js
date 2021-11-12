import express from "express";
import {
  register,
  login,
  addRestaurantToList,
  removeResFromList,
  getMyRestaurantList,
  editMyFavList,
  getAllUser,
} from "../controllers/userCon.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/add/:key/:user_id/:res_id", addRestaurantToList);
router.post("/delete/:key/:user_id/:index", removeResFromList);
router.get("/list/:key/:user_id", getMyRestaurantList);
router.patch("/editfav/:user_id", editMyFavList);

router.get("/all", getAllUser);
export default router;
