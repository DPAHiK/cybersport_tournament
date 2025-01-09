const engagedTeamService = require("../../services/engagedTeam");
const engagedTeamController = require('../../controllers/engagedTeam')
const NotFoundError = require('../../errors/NotFoundError')

jest.mock('../../services/engagedTeam'); 
jest.mock('../../models/engagedTeam'); 
jest.mock('jsonwebtoken'); 

describe('EngagedTeam Controller', () => {

    beforeEach(() => {
        req = {
            body: {},
            session: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks(); 
    });

    test('engaged team list should return status 200 and all engaged teams', async () => {
        const teams = [{ id: 1, tournament_id: 1, team_id: 1, team_grid_status: "HIGH_GRID" }, { id: 1, tournament_id: 1, team_id: 2, team_grid_status: "OUT" }];

        engagedTeamService.list.mockResolvedValue(teams);

        await engagedTeamController.list(req, res, next);
        expect(engagedTeamService.list).toHaveBeenCalledWith(); 
        expect(res.json).toHaveBeenCalledWith(teams);
    });

    test('engaged teams by tournament id should return status 200 and some engaged teams', async () => {
        req.params = {tournamentId: 1}
        const teams = [{ id: 1, tournament_id: 1, team_id: 1, team_grid_status: "HIGH_GRID" }, { id: 1, tournament_id: 1, team_id: 2, team_grid_status: "OUT" }];

        engagedTeamService.findTeamsByTournamentId.mockResolvedValue(teams);

        await engagedTeamController.findTeamsByTournamentId(req, res, next);
        expect(engagedTeamService.findTeamsByTournamentId).toHaveBeenCalledWith(req.params.tournamentId); 
        expect(res.json).toHaveBeenCalledWith(teams);
    });

    test('engaged teams by unexisting tournament id should return status 200 and null', async () => {
        req.params = {tournamentId: 0}
        engagedTeamService.findTeamsByTournamentId.mockResolvedValue(null);

        await engagedTeamController.findTeamsByTournamentId(req, res, next);
        expect(engagedTeamService.findTeamsByTournamentId).toHaveBeenCalledWith(req.params.tournamentId); 
        expect(res.json).toHaveBeenCalledTimes(0)
    });

    test('engaged teams by team id should return status 200 and some engaged teams', async () => {
        req.params = {teamId: 1}
        const teams = [{ id: 1, tournament_id: 1, team_id: 1, team_grid_status: "HIGH_GRID" }, { id: 1, tournament_id: 1, team_id: 2, team_grid_status: "OUT" }];

        engagedTeamService.findTeamsByTeamId.mockResolvedValue(teams);

        await engagedTeamController.findTeamsByTeamId(req, res, next);
        expect(engagedTeamService.findTeamsByTeamId).toHaveBeenCalledWith(req.params.teamId); 
        expect(res.json).toHaveBeenCalledWith(teams);
    });

    test('engaged teams by unexisting team id should return status 200 and null', async () => {
        req.params = {teamId: 0}
        engagedTeamService.findTeamsByTeamId.mockResolvedValue([]);

        await engagedTeamController.findTeamsByTeamId(req, res, next);
        expect(engagedTeamService.findTeamsByTeamId).toHaveBeenCalledWith(req.params.teamId); 
        expect(next).toHaveBeenCalledWith(new NotFoundError('Teams engaged with team ID ' + 0 + ' not found'))
    });

    test('create an engaged team should return status 200 and created team', async () => {
        const team = { id: 1, tournament_id: 1, team_id: 1, team_grid_status: "HIGH_GRID" };
        req.body = team;
        engagedTeamService.create.mockResolvedValue(team);

        await engagedTeamController.create(req, res, next);
        expect(engagedTeamService.create).toHaveBeenCalledWith(team); 
        expect(res.json).toHaveBeenCalledWith(team);
    });

    test('update an engaged team should return status 200 and 1 with updated team', async () => {
        req.params = {teamId: 1}
        const team = { tournament_id: 1, team_id: 1, team_grid_status: "HIGH_GRID" };
        req.body = team;
        engagedTeamService.update.mockResolvedValue([1, [team]]);

        await engagedTeamController.update(req, res, next);
        expect(engagedTeamService.update).toHaveBeenCalledWith(req.params.teamId, team); 
        expect(res.json).toHaveBeenCalledWith([1, [team]]);
    });

    test('update an unexisting engaged team should return status 200 and 0 with empty object', async () => {
        req.params = {teamId: 0}
        const team = { tournament_id: 1, team_id: 1, team_grid_status: "HIGH_GRID" };
        req.body = team;
        engagedTeamService.update.mockResolvedValue([0, [team]]);

        await engagedTeamController.update(req, res, next);
        expect(engagedTeamService.update).toHaveBeenCalledWith(req.params.teamId, team); 
        expect(res.json).toHaveBeenCalledTimes(0)
    });

    test('delete an unexisting engaged team should return status 200 and 0', async () => {
        req.params = {teamId: 1}
        engagedTeamService.delete.mockResolvedValue(0);

        await engagedTeamController.delete(req, res, next);
        expect(engagedTeamService.delete).toHaveBeenCalledWith(req.params.teamId); 
        expect(res.json).toHaveBeenCalledTimes(0)
    });

    test('delete an engaged team should return status 200 and 1', async () => {
        req.params = {teamId: 1}
        engagedTeamService.delete.mockResolvedValue(1);

        await engagedTeamController.delete(req, res, next);
        expect(engagedTeamService.delete).toHaveBeenCalledWith(req.params.teamId); 
        expect(res.json).toHaveBeenCalledWith(1);
    });
});
