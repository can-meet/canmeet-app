import express from "express";
import { createProduct } from "../controllers/productController";

const router = express.Router();

router.post('/post', createProduct);

export default router;