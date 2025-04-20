import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validate-request';
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadProductModel,
} from '../controllers/product.controller';
import { upload } from '../middleware/upload';

const router = Router();

// Get all products
router.get('/', getProducts);

// Get single product
router.get('/:id', getProduct);

// Create product (protected route)
router.post(
  '/',
  authenticate,
  [
    body('name').trim().notEmpty().withMessage('Product name is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  ],
  validateRequest,
  createProduct
);

// Update product (protected route)
router.put(
  '/:id',
  authenticate,
  [
    body('name').optional().trim().notEmpty().withMessage('Product name cannot be empty'),
    body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
    body('category').optional().trim().notEmpty().withMessage('Category cannot be empty'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  ],
  validateRequest,
  updateProduct
);

// Delete product (protected route)
router.delete('/:id', authenticate, deleteProduct);

// Upload 3D model (protected route)
router.post(
  '/:id/model',
  authenticate,
  upload.single('model'),
  [
    body('modelType').isIn(['glb', 'gltf']).withMessage('Model type must be either glb or gltf'),
  ],
  validateRequest,
  uploadProductModel
);

export default router; 