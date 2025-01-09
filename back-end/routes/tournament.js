const express = require('express');
const EngagedTeamController = require('../controllers/engagedTeam');
const TournamentController = require('../controllers/tournament');
const TournamentResultController = require('../controllers/tournamentResult');
const MatchController = require('../controllers/match');
const isAuth = require('../middleware/isAuthorized');
const validate = require('../middleware/validate');
const EngagedTeamScheme = require('../schemes/engagedTeam');
const MacthScheme = require('../schemes/match');
const TournamentScheme = require('../schemes/tournament');
const TournamentResultScheme = require('../schemes/tournamentResult');

const router = express.Router();



/**
 * @swagger
 * /tournament/result:
 *   get:
 *     tags:
 *       - Tournament Results
 *     summary: get all tournament results
 *     responses:
 *       200:
 *         description: list of tournament results
 *       500:
 *         description: Server error
 */
router.get('/result', TournamentResultController.list);

/**
 * @swagger
 * /tournament/{tournamentId}/result:
 *   get:
 *     tags:
 *       - Tournament Results
 *     summary: get tournament results specified by tournament ID
 *     parameters:
 *       - name: tournamentId
 *         in: path
 *         required: true
 *         type: integer
 *         description: tournament ID
 *     responses:
 *       200:
 *         description: list of tournament results
 *       401:
 *         description: Invalid token
 *       500:
 *         description: Server error
 */
router.get('/:tournamentId/result', isAuth(), TournamentResultController.findByTournamentId);

/**
 * @swagger
 * /tournament/{tournamentId}/result:
 *   post:
 *     tags:
 *       - Tournament Results
 *     summary: create a tournament result
 *     parameters:
 *       - name: tournamentId
 *         in: path
 *         required: true
 *         type: integer
 *         description: tournament ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teamId:
 *                  type: integer
 *               tournamentId:
 *                  type: integer
 *               place:
 *                  type: integer
 *     responses:
 *       200:
 *         description: result created
 *       401:
 *         description: Invalid token
 *       403:
 *         description: Not a orginizer nor admin
 *       500:
 *         description: Server error
 */
router.post('/:tournamentId/result', isAuth("ROLE_ORGINIZER"), validate(TournamentResultScheme.create), TournamentResultController.create);

/**
 * @swagger
 * /tournament/{tournamentId}/result:
 *   delete:
 *     tags:
 *       - Tournament Results
 *     summary: delete a tournament result
 *     parameters:
 *       - name: tournamentId
 *         in: path
 *         required: true
 *         type: integer
 *         description: tournament ID
 *     responses:
 *       200:
 *         description: result deleted
 *       401:
 *         description: Invalid token
 *       403:
 *         description: Not a orginizer nor admin
 *       500:
 *         description: Server error
 */
router.delete('/:tournamentId/result', isAuth("ROLE_ORGINIZER"), TournamentResultController.deleteByTournamentId);

/**
 * @swagger
 * /tournament/:
 *   get:
 *     tags:
 *       - Tournaments
 *     summary: get all tournaments
 *     responses:
 *       200:
 *         description: tournament list
 *       500:
 *         description: Server error
 */
router.get('/', TournamentController.list);

/**
 * @swagger
 * /tournament/:
 *   post:
 *     tags:
 *       - Tournaments
 *     summary: create a tournament
 *     parameters:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                  type: string
 *               startDate:
 *                  type: date
 *               endDate:
 *                  type: date
 *               queryId:
 *                  type: integer
 *               orginizerId:
 *                  type: integer
 *     responses:
 *       200:
 *         description: tournament created
 *       401:
 *         description: Invalid token
 *       403:
 *         description: Not a orginizer nor admin
 *       500:
 *         description: Server error
 */
router.post('/', isAuth("ROLE_ORGINIZER"), validate(TournamentScheme.create), TournamentController.create);

/**
 * @swagger
 * /tournament/{id}:
 *   get:
 *     tags:
 *       - Tournaments
 *     summary: get tournament specified by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: tournament ID
 *     responses:
 *       200:
 *         description: tournamen specified by ID
 *       401:
 *         description: Invalid token
 *       500:
 *         description: Server error
 */
router.get('/:id', isAuth(), TournamentController.findById);

/**
 * @swagger
 * /tournament/{id}:
 *   put:
 *     tags:
 *       - Tournaments
 *     summary: update tournament info
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: tournament ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                  type: string
 *               startDate:
 *                  type: date
 *               endDate:
 *                  type: date
 *               queryId:
 *                  type: integer
 *               orginizerId:
 *                  type: integer
 *     responses:
 *       200:
 *         description: tournament updated
 *       401:
 *         description: Invalid token
 *       403:
 *         description: Not a orginizer nor admin
 *       500:
 *         description: Server error
 */
router.put('/:id', isAuth("ROLE_ORGINIZER"), validate(TournamentScheme.update), TournamentController.update);

/**
 * @swagger
 * /tournament/{id}:
 *   delete:
 *     tags:
 *       - Tournaments
 *     summary: delete tournament by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID турнира
 *     responses:
 *       200:
 *         description: tournament deleted
 *       401:
 *         description: Invalid token
 *       403:
 *         description: Not a orginizer nor admin
 *       500:
 *         description: Server error
 */
router.delete('/:id', isAuth("ROLE_ORGINIZER"), TournamentController.delete);

/**
 * @swagger
 * /tournament/{tournamentId}/team:
 *   get:
 *     tags:
 *       - Engaged Teams
 *     summary: get engaged teams by tournament ID
 *     parameters:
 *       - name: tournamentId
 *         in: path
 *         required: true
 *         type: integer
 *         description: tournament ID
 *     responses:
 *       200:
 *         description: team list specified by tournament ID
 *       401:
 *         description: Invalid token
 *       500:
 *         description: Server error
 */
router.get('/:tournamentId/team', isAuth(), EngagedTeamController.findTeamsByTournamentId);

/**
 * @swagger
 * /tournament/{tournamentId}/team:
 *   post:
 *     tags:
 *       - Engaged Teams
 *     summary: engage a team into a tournament
 *     parameters:
 *       - name: tournamentId
 *         in: path
 *         required: true
 *         type: integer
 *         description: tournament ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tournamentId:
 *                  type: integer
 *               teamId:
 *                  type: integer
 *               teamGridStatus:
 *                  type: string
 *     responses:
 *       200:
 *         description: team engaged
 *       401:
 *         description: Invalid token
 *       403:
 *         description: Not a orginizer nor admin
 *       500:
 *         description: Server error
 */
router.post('/:tournamentId/team', isAuth("ROLE_ORGINIZER"), validate(EngagedTeamScheme.create), EngagedTeamController.create);

/**
 * @swagger
 * /tournament/{tournamentId}/team:
 *   put:
 *     tags:
 *       - Engaged Teams
 *     summary: update engaged team
 *     parameters:
 *       - name: tournamentId
 *         in: path
 *         required: true
 *         type: integer
 *         description: tournament ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tournamentId:
 *                  type: integer
 *               teamId:
 *                  type: integer
 *               teamGridStatus:
 *                  type: string
 *     responses:
 *       200:
 *         description: engaged team updated
 *       401:
 *         description: Invalid token
 *       403:
 *         description: Not a orginizer nor admin
 *       500:
 *         description: Server error
 */
router.put('/:tournamentId/team', isAuth("ROLE_ORGINIZER"), validate(EngagedTeamScheme.update), EngagedTeamController.update);

/**
 * @swagger
 * /tournament/{tournamentId}/team/{teamId}:
 *   delete:
 *     tags:
 *       - Engaged Teams
 *     summary: delete engaged team by id
 *     parameters:
 *       - name: tournamentId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID турнира
 *       - name: teamId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID команды
 *     responses:
 *       200:
 *         description: engaged team deleted
 *       401:
 *         description: Invalid token
 *       403:
 *         description: Not a orginizer nor admin
 *       500:
 *         description: Server error
 */
router.delete('/:tournamentId/team/:teamId', isAuth("ROLE_ORGINIZER"), EngagedTeamController.delete);

/**
 * @swagger
 * /tournament/{tournamentId}/match:
 *   get:
 *     tags:
 *       - Matches
 *     summary: get matches specified by tournament ID
 *     parameters:
 *       - name: tournamentId
 *         in: path
 *         required: true
 *         type: integer
 *         description: tournament ID
 *     responses:
 *       200:
 *         description: match list
 *       401:
 *         description: Invalid token
 *       500:
 *         description: Server error
 */
router.get('/:tournamentId/match', isAuth(), MatchController.findByTournamentId);

/**
 * @swagger
 * /tournament/{tournamentId}/match/{matchId}:
 *   get:
 *     tags:
 *       - Matches
 *     summary: get matche specified by ID
 *     parameters:
 *       - name: tournamentId
 *         in: path
 *         required: true
 *         type: integer
 *         description: tournament ID
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
router.get('/:tournamentId/match/:matchId', isAuth(), MatchController.findById);

/**
 * @swagger
 * /tournament/{tournamentId}/match:
 *   post:
 *     tags:
 *       - Matches
 *     summary: create a match
 *     parameters:
 *       - name: tournamentId
 *         in: path
 *         required: true
 *         type: integer
 *         description: tournament ID
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             teamA:
 *               type: string
 *             teamB:
 *               type: string
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
router.post('/:tournamentId/match', isAuth("ROLE_ORGINIZER"), validate(MacthScheme.create), MatchController.create);

/**
 * @swagger
 * /tournament/{tournamentId}/match/{matchId}:
 *   put:
 *     tags:
 *       - Matches
 *     summary: update a match
 *     parameters:
 *       - name: tournamentId
 *         in: path
 *         required: true
 *         type: integer
 *         description: tournament ID
 *       - name: matchId
 *         in: path
 *         required: true
 *         type: integer
 *         description: match ID
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             teamA:
 *               type: string
 *             teamB:
 *               type: string
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
router.put('/:tournamentId/match/:matchId', isAuth("ROLE_ORGINIZER"), validate(MacthScheme.update), MatchController.update);

/**
 * @swagger
 * /tournament/{tournamentId}/match/{matchId}:
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
router.delete('/:tournamentId/match/:matchId', isAuth("ROLE_ORGINIZER"), MatchController.delete);

module.exports = router;
