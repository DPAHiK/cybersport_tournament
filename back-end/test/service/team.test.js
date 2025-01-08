const TeamService = require('../../services/team'); 
const TeamRepository = require('../../repository/team'); 

jest.mock('../../repository/team'); 

describe('Team Service', () => {
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    test('findById should call TeamRepository.findById with the correct id', async () => {
        const id = 1;
        const team = { id: 1, name: 'Team A' };
        TeamRepository.findById.mockResolvedValue(team); 

        const result = await TeamService.findById(id);

        expect(TeamRepository.findById).toHaveBeenCalledWith(id); 
        expect(result).toEqual(team); 
    });

    test('list should call TeamRepository.list', async () => {
        const teams = [
            { id: 1, name: 'Team A' },
            { id: 2, name: 'Team B' }
        ];
        TeamRepository.list.mockResolvedValue(teams);

        const result = await TeamService.list();

        expect(TeamRepository.list).toHaveBeenCalled(); 
        expect(result).toEqual(teams); 
    });

    test('update should call TeamRepository.update with the correct id and userData', async () => {
        const id = 1;
        const userData = { name: 'Updated Team A' };
        TeamRepository.update.mockResolvedValue({ id, ...userData }); 

        const result = await TeamService.update(id, userData);

        expect(TeamRepository.update).toHaveBeenCalledWith(id, userData); 
        expect(result).toEqual({ id, ...userData }); 
    });

    test('create should call TeamRepository.create with the correct userData', async () => {
        const userData = { name: 'New Team' };
        const newTeam = { id: 1, ...userData };
        TeamRepository.create.mockResolvedValue(newTeam);

        const result = await TeamService.create(userData);

        expect(TeamRepository.create).toHaveBeenCalledWith(userData); 
        expect(result).toEqual(newTeam); 
    });

    test('delete should call TeamRepository.delete with the correct id', async () => {
        const id = 1;
        TeamRepository.delete.mockResolvedValue(true); 

        const result = await TeamService.delete(id);

        expect(TeamRepository.delete).toHaveBeenCalledWith(id); 
        expect(result).toBe(true); 
    });
});
