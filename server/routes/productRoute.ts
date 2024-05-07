import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, purchaseProduct, updateProduct } from "../controllers/productController";

const router = express.Router();

router.post('/', createProduct);
router.get('/:productId', getProduct);
router.get('/', getProducts);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);
router.put('/purchase/:productId', purchaseProduct)

export default router;