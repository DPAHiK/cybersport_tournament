const matchService = require("../../services/match");
const matchController = require('../../controllers/match')

jest.mock('../../services/match'); 
jest.mock('../../models/match'); 
jest.mock('jsonwebtoken'); 

describe('Match Controller', () => {

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

    test('match list should return status 200 and all matches', async () => {
        const matches = [{ id: 1, tournament_id: 1, is_team1_winner: true,
            start_date: "12.10.2024", end_date: "13.10.2024", team1_id: 1, team2_id:2 }, 

            { id: 2, tournament_id: 1, is_team1_winner: true,
                start_date: "13.10.2024", end_date: "14.10.2024", team1_id: 1, team2_id:2 }];

        matchService.list.mockResolvedValue(matches);

        await matchController.list(req, res, next);
        expect(matchService.list).toHaveBeenCalledWith(); 
        expect(res.json).toHaveBeenCalledWith(matches);
    });

    test('matches by tournament id should return status 200 and some matches', async () => {
        req.params = {tournamentId: 1}
        const matches = [{ id: 1, tournament_id: 1, is_team1_winner: true,
            start_date: "12.10.2024", end_date: "13.10.2024", team1_id: 1, team2_id:2 }, 

            { id: 2, tournament_id: 1, is_team1_winner: true,
                start_date: "13.10.2024", end_date: "14.10.2024", team1_id: 1, team2_id:2 }];

        matchService.findByTournamentId.mockResolvedValue(matches);

        await matchController.findByTournamentId(req, res, next);
        expect(matchService.findByTournamentId).toHaveBeenCalledWith(req.params.tournamentId); 
        expect(res.json).toHaveBeenCalledWith(matches);
    });

    test('matches by unexisting tournament id should return status 200 and null', async () => {
        req.params = {tournamentId: 0}
        matchService.findByTournamentId.mockResolvedValue(null);

        await matchController.findByTournamentId(req, res, next);
        expect(matchService.findByTournamentId).toHaveBeenCalledWith(req.params.tournamentId); 
        expect(res.json).toHaveBeenCalledTimes(0)
    });

    test('create a match should return status 200 and created match', async () => {
        const match = { id: 1, tournament_id: 1, is_team1_winner: true,
            start_date: "12.10.2024", end_date: "13.10.2024", team1_id: 1, team2_id:2 };
        req.body = match;
        matchService.create.mockResolvedValue(match);

        await matchController.create(req, res, next);
        expect(matchService.create).toHaveBeenCalledWith(match); 
        expect(res.json).toHaveBeenCalledWith(match);
    });

    test('update a match should return status 200 and 1 with updated match', async () => {
        req.params = {matchId: 1}
        const match = { id: 1, tournament_id: 1, is_team1_winner: true,
            start_date: "12.10.2024", end_date: "13.10.2024", team1_id: 1, team2_id:2 };
        req.body = match;
        matchService.update.mockResolvedValue([1, [match]]);

        await matchController.update(req, res, next);
        expect(matchService.update).toHaveBeenCalledWith(req.params.matchId, match); 
        expect(res.json).toHaveBeenCalledWith([1, [match]]);
    });

    test('update an unexisting match should return status 200 and 0 with empty object', async () => {
        req.params = {matchId: 0}
        const match = { id: 1, tournament_id: 1, is_team1_winner: true,
            start_date: "12.10.2024", end_date: "13.10.2024", team1_id: 1, team2_id:2 };
        req.body = match;
        matchService.update.mockResolvedValue([0, [match]]);

        await matchController.update(req, res, next);
        expect(matchService.update).toHaveBeenCalledWith(req.params.matchId, match); 
        expect(res.json).toHaveBeenCalledTimes(0)
    });

    test('delete an unexisting match should return status 200 and 0', async () => {
        req.params = {matchId: 1}
        matchService.delete.mockResolvedValue(0);

        await matchController.delete(req, res, next);
        expect(matchService.delete).toHaveBeenCalledWith(req.params.matchId); 
        expect(res.json).toHaveBeenCalledTimes(0)
    });

    test('delete a match should return status 200 and 1', async () => {
        req.params = {matchId: 1}
        matchService.delete.mockResolvedValue(1);

        await matchController.delete(req, res, next);
        expect(matchService.delete).toHaveBeenCalledWith(req.params.matchId); 
        expect(res.json).toHaveBeenCalledWith(1);
    });
});
