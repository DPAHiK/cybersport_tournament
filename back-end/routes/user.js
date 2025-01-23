const express = require('express')
const UserController = require('../controllers/user')
const isAuth = require('../middleware/isAuthorized')
const validate = require('../middleware/validate')
const UserScheme = require('../schemes/user')

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: user
 *   description: user data manipulation
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [user]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer 
 *                   name:
 *                     type: string
 *                   password:
 *                     type: string
 *                   role:
 *                     type: string
 *       401: 
 *         description: invalid token
 *       403: 
 *         description: not admin
 *       500:
 *         description: Server error
 */
router.get('/', isAuth("ROLE_ADMIN"), UserController.list)

/**
 * @swagger
 * /user:
 *   post:
 *     summary: create a new user
 *     tags: [user]
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
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: new user created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer  # Изменено с bigint на integer
 *                 name:
 *                   type: string
 *                 password:
 *                   type: string
 *                 role:
 *                   type: string
 *       401: 
 *         description: invalid token
 *       403: 
 *         description: not admin
 *       500:
 *         description: Server error
 */
router.post('/', isAuth("ROLE_ADMIN"), validate(UserScheme.create), UserController.create)

router.get('/me', UserController.me)

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: get user info by id
 *     tags: [user]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: integer  
 *     responses:
 *       200:
 *         description: user info specified by id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer 
 *                 name:
 *                   type: string
 *                 password:
 *                   type: string
 *                 role:
 *                   type: string
 *       401: 
 *         description: invalid token
 *       403: 
 *         description: not admin
 *       500:
 *         description: Server error
 */
router.get('/:id', isAuth("ROLE_ADMIN"), UserController.findById)

router.get('/:id/profile', UserController.getProfileData)

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: update user info by id
 *     tags: [user]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: integer  
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
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: user info updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer  
 *                 name:
 *                   type: string
 *                 password:
 *                   type: string
 *                 role:
 *                   type: string
 *       401: 
 *         description: invalid token
 *       403: 
 *         description: not admin
 *       500:
 *         description: Server error
 */
router.put('/:id', isAuth("ROLE_ADMIN"), validate(UserScheme.update), UserController.update)

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: delete user by id
 *     tags: [user]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: integer  
 *     responses:
 *       200:
 *         description: user deleted
 *       401: 
 *         description: invalid token
 *       403: 
 *         description: not admin
 *       500:
 *         description: Server error
 */
router.delete('/:id', isAuth("ROLE_ADMIN"), UserController.delete)

module.exports = router;
