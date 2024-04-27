import express from "express";
import { getUser } from "../controllers/userController";
import protectRoute from "../middleware/protectRoute";

const router = express.Router();

router.get("/:userId", protectRoute, getUser);

export default router;
