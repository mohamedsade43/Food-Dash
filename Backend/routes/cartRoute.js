import express from 'express';
import { addToCart, removeFromCart, getCart } from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: Shopping cart management
 */

/**
 * @swagger
 * /api/carts/add:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Add an item to the cart
 *     tags: [Carts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *               itemId:
 *                 type: string
 *                 description: The ID of the item to add
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *       400:
 *         description: Error adding item to cart
 */
router.post("/add", authMiddleware, addToCart);

/**
 * @swagger
 * /api/carts/remove:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Remove an item from the cart
 *     tags: [Carts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *               itemId:
 *                 type: string
 *                 description: The ID of the item to remove
 *     responses:
 *       200:
 *         description: Item removed from cart successfully
 *       400:
 *         description: Error removing item from cart
 */
router.post("/remove", authMiddleware, removeFromCart);

/**
 * @swagger
 * /api/carts/get:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Get all items in the user's cart
 *     tags: [Carts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *     responses:
 *       200:
 *         description: Retrieved cart successfully
 *       400:
 *         description: Error retrieving the cart
 */
router.post("/get", authMiddleware, getCart);

export default router;
