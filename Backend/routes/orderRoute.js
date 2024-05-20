import express from 'express';
import { listOrders, placeOrder, userOrders, updateStatus, verifyOrder } from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /api/orders/place:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Place a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     itemId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *               amount:
 *                 type: number
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   country:
 *                     type: string
 *     responses:
 *       200:
 *         description: Order placed successfully
 *       400:
 *         description: Error placing order
 */
router.post("/place", authMiddleware, placeOrder);

/**
 * @swagger
 * /api/orders/list:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: List all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of all orders
 *       400:
 *         description: Error fetching orders
 */
router.get("/list", listOrders);

/**
 * @swagger
 * /api/orders/userorders:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: List all orders for a specific user
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: List of user's orders
 *       400:
 *         description: Error fetching user's orders
 */
router.post("/userorders", authMiddleware, userOrders);

/**
 * @swagger
 * /api/orders/updateStatus:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Update the status of an order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       400:
 *         description: Error updating order status
 */
router.post("/updateStatus", authMiddleware, updateStatus);

export default router;
