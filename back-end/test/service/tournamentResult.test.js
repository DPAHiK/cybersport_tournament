const TournamentResultService = require('../../services/tournamentResult'); 
const TournamentResultRepository = require('../../repository/tournamentResult'); 

jest.mock('../../repository/tournamentResult'); 

describe('TournamentResult Service', () => {
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    test('findByTournamentId should call TournamentResultRepository.findByTournamentId with the correct id', async () => {
        const id = 1;
        const result = { id: 1, tournament_id: 1, team_id: 1, place: 1 };
        TournamentResultRepository.findByTournamentId.mockResolvedValue(result); 

        const res = await TournamentResultService.findByTournamentId(id);

        expect(TournamentResultRepository.findByTournamentId).toHaveBeenCalledWith(id); 
        expect(res).toEqual(result); 
    });

    test('list should call TournamentResultRepository.list', async () => {
        const results = [
            { id: 1, tournament_id: 1, team_id: 1, place: 1 },
            { id: 2, tournament_id: 1, team_id: 2, place: 2 }
        ];
        TournamentResultRepository.list.mockResolvedValue(results); 

        const res = await TournamentResultService.list();

        expect(TournamentResultRepository.list).toHaveBeenCalled(); 
        expect(res).toEqual(results); 
    });

    test('create should call TournamentResultRepository.create with the correct userData', async () => {
        const newResult = { id: 3, tournament_id: 2, team_id: 1, place: 2 }
        TournamentResultRepository.create.mockResolvedValue(newResult); 

        const res = await TournamentResultService.create(newResult);

        expect(TournamentResultRepository.create).toHaveBeenCalledWith(newResult); 
        expect(res).toEqual(newResult); 
    });

    test('update should call TournamentResultRepository.update with the correct id and tournamentData', async () => {
        const id = 1;
        const updatedResult = {  tournament_id: 1, team_id: 2, place: 1 };
        TournamentResultRepository.update.mockResolvedValue(updatedResult); 

        const res = await TournamentResultService.update(id, updatedResult);

        expect(TournamentResultRepository.update).toHaveBeenCalledWith(id, updatedResult); 
        expect(res).toEqual(updatedResult); 
    });

    test('delete should call TournamentResultRepository.delete with the correct id', async () => {
        const id = 1;
        TournamentResultRepository.delete.mockResolvedValue(true); 

        const res = await TournamentResultService.delete(id);

        expect(TournamentResultRepository.delete).toHaveBeenCalledWith(id); 
        expect(res).toBe(true); 
    });

    test('deleteByTournamentId should call TournamentResultRepository.deleteByTournamentId with the correct tournamentId', async () => {
        const tournamentId = 1;
        TournamentResultRepository.deleteByTournamentId.mockResolvedValue(true); 

        const res = await TournamentResultService.deleteByTournamentId(tournamentId);

        expect(TournamentResultRepository.deleteByTournamentId).toHaveBeenCalledWith(tournamentId); 
        expect(res).toBe(true); 
    });
});
