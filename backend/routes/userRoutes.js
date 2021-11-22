import express from "express";
import {
  register,
  login,
  checkEmail,
  checkUsername,
  editProfile,
  addRestaurantToList,
  removeResFromList,
  getMyRestaurantList,
  editMyFavList,
  getAllUser,
} from "../controllers/userCon.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/checkUsername/:username", checkUsername);
router.get("/checkEmail/:email", checkEmail);
router.patch("/editProfile/:user_id", editProfile);
router.post("/add/:key/:user_id/:res_id", addRestaurantToList);
router.post("/delete/:key/:user_id/:res_id", removeResFromList);
router.get("/list/:key/:user_id", getMyRestaurantList);
router.patch("/editfav/:user_id", editMyFavList);
router.get("/all", getAllUser);
export default router;
