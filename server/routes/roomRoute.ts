import express from "express";
import { createRoom, getRooms, getRoom } from "../controllers/roomController";

const router = express.Router();

router.post("/", createRoom);
router.get("/user/:userId", getRooms);
router.get("/:roomId", getRoom);

export default router;