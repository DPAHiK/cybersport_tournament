const express = require('express');
const MatchController = require('../controllers/match');
const isAuth = require('../middleware/isAuthorized');
const validate = require('../middleware/validate');
const MacthScheme = require('../schemes/match');

const router = express.Router();

/**
 * @swagger
 * /match:
 *   get:
 *     tags:
 *       - Matches
 *     summary: get all matches
 *     responses:
 *       200:
 *         description: match info
 *       401:
 *         description: Invalid token
 *       500:
 *         description: Server error
 */
router.get('/match', MatchController.list);

/**
 * @swagger
 * /match/{matchId}:
 *   get:
 *     tags:
 *       - Matches
 *     summary: get match specified by ID
 *     parameters:
 *       - name: matchId
 *         in: path
 *         required: true
 *         type: integer
 *         description: match ID
 *     responses:
 *       200:
 *         description: match info
 *       401:
 *         description: Invalid token
 *       500:
 *         description: Server error
 */
router.get('/match/:matchId', isAuth(), MatchController.findById);

/**
 * @swagger
 * /tournament/{tournamentId}/match:
 *   post:
 *     tags:
 *       - Matches
 *     summary: create a match
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tournamentId:
 *                  type: integer
 *               is_team1_winner:
 *                  type: boolean
 *               start_date:
 *                  type: date
 *               end_date:
 *                  type: date
 *               team1_id:
 *                  type: integer
 *               team2_id:
 *                  type: integer
 *     responses:
 *       200:
 *         description: Match created
 *       401:
 *         description: Invalid token
 *       403:
 *         description: Not a orginizer nor admin
 *       500:
 *         description: Server error
 */
router.post('/match', isAuth("ROLE_ORGINIZER"), validate(MacthScheme.create), MatchController.create);

/**
 * @swagger
 * /match/{matchId}:
 *   put:
 *     tags:
 *       - Matches
 *     summary: update a match
 *     parameters:
 *       - name: matchId
 *         in: path
 *         required: true
 *         type: integer
 *         description: match ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tournamentId:
 *                  type: integer
 *               is_team1_winner:
 *                  type: boolean
 *               start_date:
 *                  type: date
 *               end_date:
 *                  type: date
 *               team1_id:
 *                  type: integer
 *               team2_id:
 *                  type: integer
 *     responses:
 *       200:
 *         description: Match updated
 *       401:
 *         description: Invalid token
 *       403:
 *         description: Not a orginizer nor admin
 *       500:
 *         description: Server error
 */
router.put('/match/:matchId', isAuth("ROLE_ORGINIZER"), validate(MacthScheme.update), MatchController.update);

/**
 * @swagger
 * /match/{matchId}:
 *   delete:
 *     tags:
 *       - Matches
 *     summary: Delete match
 *     parameters:
 *       - name: tournamentId
 *         in: path
 *         required: true
 *         type: integer
 *         description: Tournament ID
 *       - name: matchId
 *         in: path
 *         required: true
 *         type: integer
 *         description: Match ID
 *     responses:
 *       200:
 *         description: Match deleted
 *       401:
 *         description: Invalid token
 *       403:
 *         description: Not a orginizer nor admin
 *       500:
 *         description: Server error
 */
router.delete('/match/:matchId', isAuth("ROLE_ORGINIZER"), MatchController.delete);

module.exports = router