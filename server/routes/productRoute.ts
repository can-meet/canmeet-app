import express from "express";
import { createProduct, getProduct } from "../controllers/productController";

const router = express.Router();

router.post('/post', createProduct);
router.get('/:id', getProduct)

export default router;