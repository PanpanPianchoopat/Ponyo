import express from "express";
import { register, login, test } from "../controllers/userCon.js";
const router = express.Router();

router.get("/", test);
router.post("/register", register);
router.post("/login", login);

export default router;
