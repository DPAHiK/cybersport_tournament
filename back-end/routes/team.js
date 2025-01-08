const express = require('express');
const TeamController = require('../controllers/team');
const TeamMemberController = require('../controllers/teamMember');
const EngagedTeamController = require('../controllers/engagedTeam');
const TeamQueryController = require('../controllers/teamQuery');
const isAuth = require('../middleware/isAuthorized');
const validate = require('../middleware/validate');
const TeamScheme = require('../schemes/team');
const TeamMemberScheme = require('../schemes/teamMember');
const TeamQueryScheme = require('../schemes/teamQuery');
const isTeamMember = require('../middleware/isTeamMember');

const router = express.Router();


/**
 * @swagger
 * /team:
 *   get:
 *     tags:
 *       - Teams
 *     summary: Получить список всех команд
 *     responses:
 *       200:
 *         description: Список команд
 */
router.get('/', TeamController.list);

/**
 * @swagger
 * /team:
 *   post:
 *     tags:
 *       - Teams
 *     summary: Создать новую команду
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             description:
 *               type: string
 *     responses:
 *       201:
 *         description: Команда создана
 */
router.post('/', isAuth("ROLE_PLAYER"), validate(TeamScheme.create), TeamController.create);

/**
 * @swagger
 * /team/{id}:
 *   get:
 *     tags:
 *       - Teams
 *     summary: Получить команду по ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID команды
 *     responses:
 *       200:
 *         description: Информация о команде
 */
router.get('/:id', isAuth(), TeamController.findById);

/**
 * @swagger
 * /team/{id}:
 *   put:
 *     tags:
 *       - Teams
 *     summary: Обновить информацию о команде
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID команды
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             description:
 *               type: string
 *     responses:
 *       200:
 *         description: Команда обновлена
 */
router.put('/:id', isTeamMember, validate(TeamScheme.update), TeamController.update);

/**
 * @swagger
 * /team/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     summary: Удалить команду по ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID команды
 *     responses:
 *       204:
 *         description: Команда удалена
 */
router.delete('/:id', isTeamMember, TeamController.delete);

/**
 * @swagger
 * /team/{teamId}/member:
 *   get:
 *     tags:
 *       - Team Members
 *     summary: Получить список участников команды по ID команды
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID команды
 *     responses:
 *       200:
 *         description: Список участников команды
 */
router.get('/:teamId/member', isAuth(), TeamMemberController.findByTeamId);

/**
 * @swagger
 * /team/{teamId}/member:
 *   post:
 *     tags:
 *       - Team Members
 *     summary: Добавить участника в команду
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID команды
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: integer
 *     responses:
 *       201:
 *         description: Участник команды добавлен
 */
router.post('/:teamId/member', isAuth("ROLE_ADMIN"), validate(TeamMemberScheme.create), TeamMemberController.create);

/**
 * @swagger
 * /team/{teamId}/member/{userId}:
 *   delete:
 *     tags:
 *       - Team Members
 *     summary: Удалить участника из команды
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID команды
 *       - name: userId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID участника
 *     responses:
 *       204:
 *         description: Участник команды удален
 */
router.delete('/:teamId/member/:userId', isAuth("ROLE_ADMIN"), TeamMemberController.delete);

/**
 * @swagger
 * /team/{teamId}/tournament:
 *   get:
 *     tags:
 *       - Engaged Teams
 *     summary: Получить список турниров, в которых участвует команда
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID команды
 *     responses:
 *       200:
 *         description: Список турниров
 */
router.get('/:teamId/tournament', isAuth(), EngagedTeamController.findTeamsByTeamId);

/**
 * @swagger
 * /team/query:
 *   get:
 *     tags:
 *       - Team Queries
 *     summary: Получить список всех запросов команды
 *     responses:
 *       200:
 *         description: Список запросов команды
 */
router.get('/query', isAuth(), TeamQueryController.list);

/**
 * @swagger
 * /team/{teamId}/query:
 *   get:
 *     tags:
 *       - Team Queries
 *     summary: Получить запросы команды по ID команды
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID команды
 *     responses:
 *       200:
 *         description: Список запросов команды
 */
router.get('/:teamId/query', isAuth(), TeamQueryController.findByTeamId);

/**
 * @swagger
 * /team/{teamId}/query/{queryId}:
 *   get:
 *     tags:
 *       - Team Queries
 *     summary: Получить запрос по ID
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID команды
 *       - name: queryId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID запроса
 *     responses:
 *       200:
 *         description: Информация о запросе
 */
router.get('/:teamId/query/:queryId', isAuth(), TeamQueryController.findById);

/**
 * @swagger
 * /team/{teamId}/query:
 *   post:
 *     tags:
 *       - Team Queries
 *     summary: Создать новый запрос для команды
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID команды
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             content:
 *               type: string
 *     responses:
 *       201:
 *         description: Запрос создан
 */
router.post('/:teamId/query', isAuth("ROLE_PLAYER"), validate(TeamQueryScheme.create), TeamQueryController.create);

/**
 * @swagger
 * /team/{teamId}/query/{queryId}:
 *   delete:
 *     tags:
 *       - Team Queries
 *     summary: Удалить запрос по ID
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID команды
 *       - name: queryId
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID запроса
 *     responses:
 *       204:
 *         description: Запрос удален
 */
router.delete('/:teamId/query/:queryId', isAuth("ROLE_ADMIN"), TeamQueryController.delete);

module.exports = router;
