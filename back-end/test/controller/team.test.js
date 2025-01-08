const teamService = require("../../services/team");
const teamController = require('../../controllers/team')

jest.mock('../../services/team'); 
jest.mock('../../models/team'); 
jest.mock('jsonwebtoken'); 

describe('Team Controller', () => {

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

    test('team list should return status 200 and all teams', async () => {
        const teams = [
            { id: 1, name: 'Team A' },
            { id: 2, name: 'Team B' }
        ];

        teamService.list.mockResolvedValue(teams);

        await teamController.list(req, res, next);
        expect(teamService.list).toHaveBeenCalledWith(); 
        expect(res.json).toHaveBeenCalledWith(teams);
    });

    test('team by unexisting id should return status 200 and null', async () => {
        req.params = {id: 0}

        teamService.findById.mockResolvedValue(null);

        await teamController.findById(req, res, next);
        expect(teamService.findById).toHaveBeenCalledWith(req.params.id); 
        expect(res.json).toHaveBeenCalledWith(null);
    });

    test('team by  id should return status 200 and one team', async () => {
        req.params = {id: 1}
        const team = { id: 1, name: 'Team A' };
        teamService.findById.mockResolvedValue(team);

        await teamController.findById(req, res, next);
        expect(teamService.findById).toHaveBeenCalledWith(req.params.id); 
        expect(res.json).toHaveBeenCalledWith(team);
    });

    test('create a team should return status 200 and created team', async () => {
        const team = { id: 1, name: 'Team A' };
        req.body = team;
        teamService.create.mockResolvedValue(team);

        await teamController.create(req, res, next);
        expect(teamService.create).toHaveBeenCalledWith(team); 
        expect(res.json).toHaveBeenCalledWith(team);
    });

    test('update a team should return status 200 and 1 with updated team', async () => {
        req.params = {id: 1}
        const team = { name: 'Team A' };
        req.body = team;
        teamService.update.mockResolvedValue([1, [team]]);

        await teamController.update(req, res, next);
        expect(teamService.update).toHaveBeenCalledWith(req.params.id, team); 
        expect(res.json).toHaveBeenCalledWith([1, [team]]);
    });

    test('update an unexisting team should return status 200 and 0 with empty object', async () => {
        req.params = {id: 0}
        const team = { name: 'Team A' };
        req.body = team;
        teamService.update.mockResolvedValue([0, [team]]);

        await teamController.update(req, res, next);
        expect(teamService.update).toHaveBeenCalledWith(req.params.id, team); 
        expect(res.json).toHaveBeenCalledWith([0, [team]]);
    });

    test('delete an unexisting team should return status 200 and 0', async () => {
        req.params = {id: 1}
        teamService.delete.mockResolvedValue(0);

        await teamController.delete(req, res, next);
        expect(teamService.delete).toHaveBeenCalledWith(req.params.id); 
        expect(res.json).toHaveBeenCalledWith(0);
    });

    test('delete a team should return status 200 and 1', async () => {
        req.params = {id: 1}
        teamService.delete.mockResolvedValue(1);

        await teamController.delete(req, res, next);
        expect(teamService.delete).toHaveBeenCalledWith(req.params.id); 
        expect(res.json).toHaveBeenCalledWith(1);
    });
});
