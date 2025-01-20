const express = require('express');
const EngagedTeamController = require('../controllers/engagedTeam');
const TournamentController = require('../controllers/tournament');
const TournamentResultController = require('../controllers/tournamentResult');
const MatchController = require('../controllers/match');
const isAuth = require('../middleware/isAuthorized');
const validate = require('../middleware/validate');
const EngagedTeamScheme = require('../schemes/engagedTeam');
const TournamentScheme = require('../schemes/tournament');
const TournamentResultScheme = require('../schemes/tournamentResult');
const TeamQueryController = require('../controllers/teamQuery')

const router = express.Router();


/**
 * @swagger
 * /tournament/{tournamentId}/generate:
 *   post:
 *     tags:
 *       - Tournament
 *     summary: Generates a grid of teams (creating engaged teams from team queries on this tournament)
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
router.post('/:tournamentId/generate', isAuth("ROLE_ORGINIZER"), TournamentController.generateGrid)

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
 * /tournament/result:
 *   get:
 *     tags:
 *       - Tournament Results
 *     summary: get tournament result specified by id
 *     responses:
 *       200:
 *         description: tournament result by id
 *       500:
 *         description: Server error
 */
router.get('/result/:resultId', isAuth(), TournamentResultController.findById);

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
 * /tournament/result/{resultId}:
 *   post:
 *     tags:
 *       - Tournament Results
 *     summary: update a tournament result
 *     parameters:
 *       - name: resultId
 *         in: path
 *         required: true
 *         type: integer
 *         description: result ID
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
 *         description: result updated
 *       401:
 *         description: Invalid token
 *       403:
 *         description: Not a orginizer nor admin
 *       500:
 *         description: Server error
 */
router.put('/result/:resultId', isAuth("ROLE_ORGINIZER"), validate(TournamentResultScheme.update), TournamentResultController.update);

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

router.delete('/:tournamentId/result/:resultId', isAuth("ROLE_ORGINIZER"), TournamentResultController.delete);

/**
 * @swagger
 * /tournament/{tournamentId}/result/{resultId}:
 *   delete:
 *     tags:
 *       - Tournament Results
 *     summary: delete a tournament result specified by id
 *     parameters:
 *       - name: tournamentId
 *         in: path
 *         required: true
 *         type: integer
 *         description: tournament ID
  *       - name: resultId
 *         in: path
 *         required: true
 *         type: integer
 *         description: result ID
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
router.delete('/:tournamentId/result/:resultId', isAuth("ROLE_ORGINIZER"), TournamentResultController.delete);

router.get('/:tournamentId/query', isAuth(), TeamQueryController.findByTournamentId)

router.get('/:tournamentId/query/team', isAuth(), TeamQueryController.getQueryTeams)

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
router.get('/:id', TournamentController.findById);

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
router.get('/:tournamentId/team',  EngagedTeamController.findTeamsByTournamentId);

router.get('/:tournamentId/team/profile',  EngagedTeamController.getProfilesByTournamentId);

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
router.put('/:tournamentId/team/:teamId', isAuth("ROLE_ORGINIZER"), validate(EngagedTeamScheme.update), EngagedTeamController.update);

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
router.get('/:tournamentId/match', MatchController.findByTournamentId);


module.exports = router;
