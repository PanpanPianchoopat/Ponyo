import express from "express";
import {
  register,
  login,
  addList,
  deleteList,
  getList,
} from "../controllers/userCon.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/add/:key/:id/:res_id", addList);
router.get("/list/:key/:user_id", getList);
router.post("/delete/:key/:id/:index", deleteList);

export default router;
