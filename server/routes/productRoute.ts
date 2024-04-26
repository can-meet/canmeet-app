import express from "express";
import { createProduct, getProduct, getProducts, purchaseProduct } from "../controllers/productController";

const router = express.Router();

router.post('/', createProduct);
router.get('/:productId', getProduct);
router.get('/', getProducts);
router.put('/purchase/:productId', purchaseProduct)

export default router;