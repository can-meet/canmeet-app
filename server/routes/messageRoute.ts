import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController";

const router = express.Router();

router.post("/:messageId", getMessages);
router.get("/send/:messageId", sendMessage);

export default router;
