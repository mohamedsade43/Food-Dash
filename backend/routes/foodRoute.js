import express from 'express';
import { listFood, addFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';

const router = express.Router();
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

/**
 * @swagger
 * tags:
 *   name: Foods
 *   description: Food item management
 */

/**
 * @swagger
 * /api/foods/list:
 *   get:
 *     summary: List all food items
 *     tags: [Foods]
 *     responses:
 *       200:
 *         description: List of food items
 *       500:
 *         description: Server error
 */
router.get("/list", listFood);

/**
 * @swagger
 * /api/foods/add:
 *   post:
 *     summary: Add a new food item
 *     tags: [Foods]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Food item added successfully
 *       500:
 *         description: Error adding food item
 */
router.post("/add", upload.single('image'), addFood);

/**
 * @swagger
 * /api/foods/remove:
 *   post:
 *     summary: Remove a food item
 *     tags: [Foods]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Food item removed successfully
 *       500:
 *         description: Error removing food item
 */
router.post("/remove", removeFood);

export default router;
