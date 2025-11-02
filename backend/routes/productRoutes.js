import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock
} from '../controllers/product.controller.js';

const router = express.Router();



// get
router.get('/', getAllProducts);

// get
router.get('/:id', getProductById); 

// post
router.post('/', createProduct); 

// put
router.put('/:id', updateProduct); 

// delete
router.delete('/:id', deleteProduct);

// actualizar stock después de una compra
router.patch('/update-stock', updateStock);

export default router;