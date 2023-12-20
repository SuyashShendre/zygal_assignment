import express from "express";
import {
  clearCookie,
  login,
  logout,
  storeMessage,
} from "./common.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/store-message", storeMessage);
router.post("/logout", logout);
router.post("/clear", clearCookie);

export default router;
