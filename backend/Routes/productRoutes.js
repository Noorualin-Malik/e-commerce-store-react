import express from 'express';
import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../Controllers/productControllers.js';

import authMiddleware from '../Middleware/Authmiddleware.js'
import uploads from '../Middleware/uploadMiddleware.js';


const router = express.Router();

// Routes
router.post('/', authMiddleware, uploads.single('image'), addProduct);
router.get('/', authMiddleware, getProducts);
router.get('/:id', authMiddleware, getProductById);
router.put('/:id', authMiddleware, uploads.single('image'), updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

export default router;
