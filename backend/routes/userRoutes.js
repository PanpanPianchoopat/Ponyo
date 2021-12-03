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
router.patch("/editProfile/:uesrID", editProfile);
router.post("/add/:key/:uesrID/:resID", addRestaurantToList);
router.post("/delete/:key/:uesrID/:resID", removeResFromList);
router.get("/list/:key/:uesrID", getMyRestaurantList);
router.patch("/editfav/:uesrID", editMyFavList);
export default router;
