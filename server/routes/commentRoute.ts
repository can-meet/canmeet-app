import express from "express";
import { createComment, getComment, getComments } from "../controllers/commentController";

const router = express.Router();

router.post("/", createComment);
router.get("/:commentId", getComment);
router.get("/products/:productId", getComments);

export default router;
