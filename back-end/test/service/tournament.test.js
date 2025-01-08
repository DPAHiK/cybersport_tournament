const TournamentService = require('../../services/tournament'); 
const TournamentRepository = require('../../repository/tournament'); 

jest.mock('../../repository/tournament'); 

describe('Tournament Service', () => {
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    test('findById should call TournamentRepository.findById with the correct id', async () => {
        const id = 1;
        const tournament = { id: 1, name: 'Championship' };
        TournamentRepository.findById.mockResolvedValue(tournament); 

        const result = await TournamentService.findById(id);

        expect(TournamentRepository.findById).toHaveBeenCalledWith(id); 
        expect(result).toEqual(tournament); 
    });

    test('list should call TournamentRepository.list', async () => {
        const tournaments = [
            { id: 1, name: 'Championship' },
            { id: 2, name: 'League' }
        ];
        TournamentRepository.list.mockResolvedValue(tournaments);

        const result = await TournamentService.list();

        expect(TournamentRepository.list).toHaveBeenCalled(); 
        expect(result).toEqual(tournaments); 
    });

    test('create should call TournamentRepository.create with the correct userData', async () => {
        const tournamentData = { name: 'Championship' };
        const newTournament = { id: 1, ...tournamentData };
        TournamentRepository.create.mockResolvedValue(newTournament);

        const result = await TournamentService.create(tournamentData);

        expect(TournamentRepository.create).toHaveBeenCalledWith(tournamentData); 
        expect(result).toEqual(newTournament); 
    });

    test('update should call TournamentRepository.update with the correct id and tournamentData', async () => {
        const id = 1;
        const tournamentData = { name: 'Updated Championship' };
        TournamentRepository.update.mockResolvedValue({ id, ...tournamentData });

        const result = await TournamentService.update(id, tournamentData);

        expect(TournamentRepository.update).toHaveBeenCalledWith(id, tournamentData); 
        expect(result).toEqual({ id, ...tournamentData }); 
    });

    test('delete should call TournamentRepository.delete with the correct id', async () => {
        const id = 1;
        TournamentRepository.delete.mockResolvedValue(true); 

        const result = await TournamentService.delete(id);

        expect(TournamentRepository.delete).toHaveBeenCalledWith(id); 
        expect(result).toBe(true); 
    });
});
