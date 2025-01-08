const MatchService = require('../../services/match'); 
const MatchRepository = require('../../repository/match'); 

jest.mock('../../repository/match'); 

describe('Match Service', () => {
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    test('findById should call MatchRepository.findById with the correct id', async () => {
        const id = 1;
        const match = { id: 1, tournament_id: 1, is_team1_winner: true,
             start_date: "12.10.2024", end_date: "13.10.2024", team1_id: 1, team2_id:2 };
        MatchRepository.findById.mockResolvedValue(match); 

        const result = await MatchService.findById(id);

        expect(MatchRepository.findById).toHaveBeenCalledWith(id); 
        expect(result).toEqual(match); 
    });

    test('findByTournamentId should call MatchRepository.findByTournamentId with the correct tournamentId', async () => {
        const tournamentId = 1;
        const matches = [{ id: 1, tournament_id: 1, is_team1_winner: true,
            start_date: "12.10.2024", end_date: "13.10.2024", team1_id: 1, team2_id:2 }, 

            { id: 2, tournament_id: 1, is_team1_winner: true,
                start_date: "13.10.2024", end_date: "14.10.2024", team1_id: 1, team2_id:2 }];
        MatchRepository.findByTournamentId.mockResolvedValue(matches); 

        const result = await MatchService.findByTournamentId(tournamentId);

        expect(MatchRepository.findByTournamentId).toHaveBeenCalledWith(tournamentId); 
        expect(result).toEqual(matches); 
    });

    test('list should call MatchRepository.list', async () => {
        const matches = [{ id: 1, tournament_id: 1, is_team1_winner: true,
            start_date: "12.10.2024", end_date: "13.10.2024", team1_id: 1, team2_id:2 }, 

            { id: 2, tournament_id: 1, is_team1_winner: true,
                start_date: "13.10.2024", end_date: "14.10.2024", team1_id: 1, team2_id:2 }];
        MatchRepository.list.mockResolvedValue(matches);

        const result = await MatchService.list();

        expect(MatchRepository.list).toHaveBeenCalled(); 
        expect(result).toEqual(matches); 
    });

    test('update should call MatchRepository.update with the correct id and userData', async () => {
        const id = 1;
        const userData = { id: 1, tournament_id: 1, is_team1_winner: false,
            start_date: "12.10.2024", end_date: "13.10.2024", team1_id: 1, team2_id:2 };
        MatchRepository.update.mockResolvedValue({ id, ...userData }); 

        const result = await MatchService.update(id, userData);

        expect(MatchRepository.update).toHaveBeenCalledWith(id, userData); 
        expect(result).toEqual({ id, ...userData }); 
    });

    test('create should call MatchRepository.create with the correct userData', async () => {
        const userData = { id: 3, tournament_id: 2, is_team1_winner: false,
            start_date: "15.10.2024", end_date: "16.10.2024", team1_id: 1, team2_id:2 };
        MatchRepository.create.mockResolvedValue(userData);

        const result = await MatchService.create(userData);

        expect(MatchRepository.create).toHaveBeenCalledWith(userData); 
        expect(result).toEqual(userData); 
    });

    test('delete should call MatchRepository.delete with the correct id', async () => {
        const id = 1;
        MatchRepository.delete.mockResolvedValue(true); 

        const result = await MatchService.delete(id);

        expect(MatchRepository.delete).toHaveBeenCalledWith(id); 
        expect(result).toBe(true); 
    });
});
