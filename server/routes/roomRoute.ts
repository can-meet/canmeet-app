import express from "express";
import { createRoom, getRooms, getRoom } from "../controllers/roomController";

const router = express.Router();

router.post("/", createRoom);
router.get("/users/:userId", getRooms);
router.get("/:roomId", getRoom);

export default router;