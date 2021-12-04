/*******************************************************************************
 * This file is the path that will redirect to the functions in userCon.js
 *******************************************************************************
 */
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
} from "../controllers/userCon.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/checkUsername/:username", checkUsername);
router.get("/checkEmail/:email", checkEmail);
router.patch("/editProfile/:userID", editProfile);
router.post("/add/:key/:userID/:resID", addRestaurantToList);
router.post("/delete/:key/:userID/:resID", removeResFromList);
router.get("/list/:key/:userID", getMyRestaurantList);
router.patch("/editfav/:userID", editMyFavList);
export default router;
