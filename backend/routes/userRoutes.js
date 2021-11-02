import express from "express";
import { register, login, addFavorite } from "../controllers/userCon.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/favorite/:id/:res_id", addFavorite);

export default router;
