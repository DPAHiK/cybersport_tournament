const express = require('express');
const TeamController = require('../controllers/team');
const TeamMemberController = require('../controllers/teamMember');
const MemberQueryController = require('../controllers/memberQuery');
const EngagedTeamController = require('../controllers/engagedTeam');
const TeamQueryController = require('../controllers/teamQuery');
const isAuth = require('../middleware/isAuthorized');
const validate = require('../middleware/validate');
const TeamScheme = require('../schemes/team');
const TeamMemberScheme = require('../schemes/teamMember');
const MemberQueryScheme = require('../schemes/memberQuery')
const TeamQueryScheme = require('../schemes/teamQuery');
const isTeamCreator = require('../middleware/isTeamCreator');

const router = express.Router();


/**
 * @swagger
 * /team:
 *   get:
 *     tags:
 *       - Teams
 *     summary: Get teams list
 *     responses:
 *       200:
 *         description: A list of teams
 *       500:
 *         description: Server error
 */
router.get('/', TeamController.list);

/**
 * @swagger
 * /team:
 *   post:
 *     tags:
 *       - Teams
 *     summary: Create a new team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: A new team created
 *       401:
 *         description: Invalid token
 *       403:
 *         description: Not a player nor admin
 *       500:
 *         description: Server error
 */
router.post('/', isAuth("ROLE_PLAYER"), validate(TeamScheme.create), TeamController.create);

/**
 * @swagger
 * /team/{id}:
 *   get:
 *     tags:
 *       - Teams
 *     summary: get team info by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: team ID
 *     responses:
 *       200:
 *         description: Team info
 *       401:
 *         description: Invalid token
 *       500:
 *         description: Server error
 */
router.get('/:teamId', TeamController.findById);

/**
 * @swagger
 * /team/{id}:
 *   put:
 *     tags:
 *       - Teams
 *     summary: Update team info
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: team ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Team info updated
 *       401:
 *         description: Invalid token
 *       
 *       500:
 *         description: Server error or not enough rights
 */
router.put('/:teamId', isTeamCreator, validate(TeamScheme.update), TeamController.update);

/**
 * @swagger
 * /team/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     summary: Delete team by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: team ID
 *     responses:
 *       200:
 *         description: Team info updated
 *       401:
 *         description: Invalid token
 *       
 *       500:
 *         description: Server error or not enough rights
 */
router.delete('/:teamId', isTeamCreator, TeamController.delete);

/**
 * @swagger
 * /team/{teamId}/member:
 *   get:
 *     tags:
 *       - Team Members
 *     summary: get team members list by team id
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         type: integer
 *         description: team ID
 *     responses:
 *       200:
 *         description: team members list
 *       401:
 *         description: Invalid token     
 *       500:
 *         description: Server error
 */
router.get('/:teamId/member', TeamMemberController.findByTeamId);

router.get('/:teamId/member/profile', TeamMemberController.findProfilesByTeamId);


router.get('/:teamId/member/query', MemberQueryController.findByTeamId);

router.post('/:teamId/member/query', isAuth("ROLE_PLAYER"), validate(MemberQueryScheme.create),   MemberQueryController.create);

router.delete('/:teamId/member/query/:queryId/accept', isTeamCreator, MemberQueryController.deleteWithAccept);

router.delete('/:teamId/member/query/:queryId/deny', isTeamCreator,  MemberQueryController.delete);

/**
 * @swagger
 * /team/{teamId}/member:
 *   post:
 *     tags:
 *       - Team Members
 *     summary: add player to team
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         type: integer
 *         description: team ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                  type: integer
 *               teamId:
 *                  type: integer
 *     responses:
 *       200:
 *         description: team member added
 *       401:
 *         description: Invalid token     
 *       500:
 *         description: Server error or not enough rights
 */
router.post('/:teamId/member', isTeamCreator, validate(TeamMemberScheme.create), TeamMemberController.create);

/**
 * @swagger
 * /team/{teamId}/member/{userId}:
 *   delete:
 *     tags:
 *       - Team Members
 *     summary: Delete member from team
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         type: integer
 *         description: team ID
 *       - name: userId
 *         in: path
 *         required: true
 *         type: integer
 *         description: member ID
 *     responses:
 *       200:
 *         description: team member deleted
 *       401:
 *         description: Invalid token     
 *       500:
 *         description: Server error or not enough rights
 */
router.delete('/:teamId/member/:memberId', isTeamCreator, TeamMemberController.delete);

/**
 * @swagger
 * /team/{teamId}/tournament:
 *   get:
 *     tags:
 *       - Engaged Teams
 *     summary: get tournaments that team was participated in
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         type: integer
 *         description: team ID
 *     responses:
 *       200:
 *         description: tournament list, specified by team ID
 *       401:
 *         description: Invalid token     
 *       500:
 *         description: Server error
 */
router.get('/:teamId/tournament', EngagedTeamController.findTeamsByTeamId);

/**
 * @swagger
 * /team/query:
 *   get:
 *     tags:
 *       - Team Queries
 *     summary: get all team's query list
 *     responses:
 *       200:
 *         description: query list
 *       401:
 *         description: Invalid token     
 *       500:
 *         description: Server error
 */
router.get('/query', TeamQueryController.list);

/**
 * @swagger
 * /team/query/{queryId}:
 *   get:
 *     tags:
 *       - Team Queries
 *     summary: get team query specefied by id
 *     responses:
 *       200:
 *         description: one query specified by id
 *       401:
 *         description: Invalid token     
 *       500:
 *         description: Server error
 */
router.get('/query/:queryId', TeamQueryController.findById);

/**
 * @swagger
 * /team/{teamId}/query:
 *   get:
 *     tags:
 *       - Team Queries
 *     summary: get specific team's query list
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         type: integer
 *         description: team ID
 *     responses:
 *       200:
 *         description: query list specified by team
 *       401:
 *         description: Invalid token     
 *       500:
 *         description: Server error
 */
router.get('/:teamId/query', TeamQueryController.findByTeamId);

router.get('/:teamId/query/applicants', MemberQueryController.findProfilesByTeamId);

/**
 * @swagger
 * /team/{teamId}/query/{queryId}:
 *   get:
 *     tags:
 *       - Team Queries
 *     summary: get query by id
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         type: integer
 *         description: team id
 *       - name: queryId
 *         in: path
 *         required: true
 *         type: integer
 *         description: query id
 *     responses:
 *       200:
 *         description: query info specified by id
 *       401:
 *         description: Invalid token     
 *       500:
 *         description: Server error
 */
router.get('/:teamId/query/:queryId', TeamQueryController.findById);

/**
 * @swagger
 * /team/{teamId}/query:
 *   post:
 *     tags:
 *       - Team Queries
 *     summary: create team query
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         type: integer
 *         description: team ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teamId:
 *                  type: integer
 *               sendingDate:
 *                  type: date
 *               description:
 *                  type: string
 *               status:
 *                  type: boolean
 *     responses:
 *       200:
 *         description: query created
 *       401:
 *         description: Invalid token     
 *       500:
 *         description: Server error or not enough rights
 */
router.post('/:teamId/query', isTeamCreator, validate(TeamQueryScheme.create), TeamQueryController.create);

/**
 * @swagger
 * /team/{teamId}/query/{queryId}:
 *   delete:
 *     tags:
 *       - Team Queries
 *     summary: delete query by id
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         type: integer
 *         description: team ID
 *       - name: queryId
 *         in: path
 *         required: true
 *         type: integer
 *         description: query ID
 *     responses:
 *       200:
 *         description: query deleted
 *       401:
 *         description: Invalid token     
 *       500:
 *         description: Server error or not enough rights
 */
router.delete('/:teamId/query/:queryId', isAuth("ROLE_ADMIN"), TeamQueryController.delete);

module.exports = router;
