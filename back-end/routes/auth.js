const express = require('express');
const AuthController = require('../controllers/auth');
const validate = require('../middleware/validate');
const UserScheme = require('../schemes/user');

const router = express.Router();


/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login into system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Incorrect name or password
 */
router.post("/login", validate(UserScheme.login), AuthController.login);

/**
 * @swagger
 * /signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Registration of new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registration successful
 *       500:
 *         description: Invalid data for registration
 */
router.post("/signup", validate(UserScheme.create), AuthController.signup);

module.exports = router;
