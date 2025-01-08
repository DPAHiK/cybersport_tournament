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
 *     summary: Получить список всех результатов турниров
 *     responses:
 *       200:
 *         description: Список результатов турниров
 */
router.get('/result', TournamentResultController.list);

/**
 * @swagger
 * /tournament/{tournamentId}/result:
 *   get:
 *     tags:
 *       - Tournament Results
 *     summary: Получить результаты турнира по ID турнира
 *     parameters:
 *       - name: tournamentId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID турнира
 *     responses:
 *       200:
 *         description: Результаты турнира
 */
router.get('/:tournamentId/result', isAuth(), TournamentResultController.findByTournamentId);

/**
 * @swagger
 * /tournament/{tournamentId}/result:
 *   post:
 *     tags:
 *       - Tournament Results
 *     summary: Создать результат турнира
 *     parameters:
 *       - name: tournamentId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID турнира
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: string
 *     responses:
 *       201:
 *         description: Результат турнира создан
 */
router.post('/:tournamentId/result', isAuth("ROLE_ORGINIZER"), validate(TournamentResultScheme.create), TournamentResultController.create);

/**
 * @swagger
 * /tournament/{tournamentId}/result:
 *   delete:
 *     tags:
 *       - Tournament Results
 *     summary: Удалить результаты турнира по ID турнира
 *     parameters:
 *       - name: tournamentId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID турнира
 *     responses:
 *       204:
 *         description: Результаты турнира удалены
 */
router.delete('/:tournamentId/result', isAuth("ROLE_ORGINIZER"), TournamentResultController.deleteByTournamentId);

/**
 * @swagger
 * /tournament/:
 *   get:
 *     tags:
 *       - Tournaments
 *     summary: Получить список всех турниров
 *     responses:
 *       200:
 *         description: Список турниров
 */
router.get('/', TournamentController.list);

/**
 * @swagger
 * /tournament/:
 *   post:
 *     tags:
 *       - Tournaments
 *     summary: Создать новый турнир
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       201:
 *         description: Турнир создан
 */
router.post('/', isAuth("ROLE_ORGINIZER"), validate(TournamentScheme.create), TournamentController.create);

/**
 * @swagger
 * /tournament/{id}:
 *   get:
 *     tags:
 *       - Tournaments
 *     summary: Получить турнир по ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID турнира
 *     responses:
 *       200:
 *         description: Информация о турнире
 */
router.get('/:id', isAuth(), TournamentController.findById);

/**
 * @swagger
 * /tournament/{id}:
 *   put:
 *     tags:
 *       - Tournaments
 *     summary: Обновить информацию о турнире
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID турнира
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       200:
 *         description: Турнир обновлен
 */
router.put('/:id', isAuth("ROLE_ORGINIZER"), validate(TournamentScheme.update), TournamentController.update);

/**
 * @swagger
 * /tournament/{id}:
 *   delete:
 *     tags:
 *       - Tournaments
 *     summary: Удалить турнир по ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID турнира
 *     responses:
 *       204:
 *         description: Турнир удален
 */
router.delete('/:id', isAuth("ROLE_ORGINIZER"), TournamentController.delete);

/**
 * @swagger
 * /tournament/{tournamentId}/team:
 *   get:
 *     tags:
 *       - Engaged Teams
 *     summary: Получить список команд по ID турнира
 *     parameters:
 *       - name: tournamentId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID турнира
 *     responses:
 *       200:
 *         description: Список команд
 */
router.get('/:tournamentId/team', isAuth(), EngagedTeamController.findTeamsByTournamentId);

/**
 * @swagger
 * /tournament/{tournamentId}/team:
 *   post:
 *     tags:
 *       - Engaged Teams
 *     summary: Создать команду для турнира
 *     parameters:
 *       - name: tournamentId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID турнира
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       201:
 *         description: Команда создана
 */
router.post('/:tournamentId/team', isAuth("ROLE_ORGINIZER"), validate(EngagedTeamScheme.create), EngagedTeamController.create);

/**
 * @swagger
 * /tournament/{tournamentId}/team:
 *   put:
 *     tags:
 *       - Engaged Teams
 *     summary: Обновить команду для турнира
 *     parameters:
 *       - name: tournamentId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID турнира
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       200:
 *         description: Команда обновлена
 */
router.put('/:tournamentId/team', isAuth("ROLE_ORGINIZER"), validate(EngagedTeamScheme.update), EngagedTeamController.update);

/**
 * @swagger
 * /tournament/{tournamentId}/team/{teamId}:
 *   delete:
 *     tags:
 *       - Engaged Teams
 *     summary: Удалить команду из турнира
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
 *       204:
 *         description: Команда удалена
 */
router.delete('/:tournamentId/team/:teamId', isAuth("ROLE_ORGINIZER"), EngagedTeamController.delete);

/**
 * @swagger
 * /tournament/{tournamentId}/match:
 *   get:
 *     tags:
 *       - Matches
 *     summary: Получить список матчей по ID турнира
 *     parameters:
 *       - name: tournamentId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID турнира
 *     responses:
 *       200:
 *         description: Список матчей
 */
router.get('/:tournamentId/match', isAuth(), MatchController.findByTournamentId);

/**
 * @swagger
 * /tournament/{tournamentId}/match/{matchId}:
 *   get:
 *     tags:
 *       - Matches
 *     summary: Получить матч по ID
 *     parameters:
 *       - name: tournamentId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID турнира
 *       - name: matchId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID матча
 *     responses:
 *       200:
 *         description: Информация о матче
 */
router.get('/:tournamentId/match/:matchId', isAuth(), MatchController.findById);

/**
 * @swagger
 * /tournament/{tournamentId}/match:
 *   post:
 *     tags:
 *       - Matches
 *     summary: Создать матч для турнира
 *     parameters:
 *       - name: tournamentId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID турнира
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
 *       201:
 *         description: Матч создан
 */
router.post('/:tournamentId/match', isAuth("ROLE_ORGINIZER"), validate(MacthScheme.create), MatchController.create);

/**
 * @swagger
 * /tournament/{tournamentId}/match/{matchId}:
 *   put:
 *     tags:
 *       - Matches
 *     summary: Обновить матч
 *     parameters:
 *       - name: tournamentId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID турнира
 *       - name: matchId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID матча
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
 *         description: Матч обновлен
 */
router.put('/:tournamentId/match/:matchId', isAuth("ROLE_ORGINIZER"), validate(MacthScheme.update), MatchController.update);

/**
 * @swagger
 * /tournament/{tournamentId}/match/{matchId}:
 *   delete:
 *     tags:
 *       - Matches
 *     summary: Удалить матч
 *     parameters:
 *       - name: tournamentId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID турнира
 *       - name: matchId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID матча
 *     responses:
 *       204:
 *         description: Матч удален
 */
router.delete('/:tournamentId/match/:matchId', isAuth("ROLE_ORGINIZER"), MatchController.delete);

module.exports = router;
