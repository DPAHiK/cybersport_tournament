const TeamQueryService = require('../../services/teamQuery'); 
const TeamQueryRepository = require('../../repository/teamQuery'); 

jest.mock('../../repository/teamQuery'); 

describe('TeamQuery Service', () => {
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    test('findById should call TeamQueryRepository.findById with the correct id', async () => {
        const id = 1;
        const team = { id: 1, name: 'Team A' };
        TeamQueryRepository.findById.mockResolvedValue(team); 

        const result = await TeamQueryService.findById(id);

        expect(TeamQueryRepository.findById).toHaveBeenCalledWith(id); 
        expect(result).toEqual(team); 
    });

    test('findByTeamId should call TeamQueryRepository.findByTeamId with the correct teamId', async () => {
        const teamId = 1;
        const teams = [{ id: 1, name: 'Team A' }, { id: 2, name: 'Team B' }];
        TeamQueryRepository.findByTeamId.mockResolvedValue(teams); 

        const result = await TeamQueryService.findByTeamId(teamId);

        expect(TeamQueryRepository.findByTeamId).toHaveBeenCalledWith(teamId); 
        expect(result).toEqual(teams); 
    });

    test('list should call TeamQueryRepository.list', async () => {
        const teams = [
            { id: 1, name: 'Team A' },
            { id: 2, name: 'Team B' }
        ];
        TeamQueryRepository.list.mockResolvedValue(teams); 

        const result = await TeamQueryService.list();

        expect(TeamQueryRepository.list).toHaveBeenCalled(); 
        expect(result).toEqual(teams); 
    });

    test('create should call TeamQueryRepository.create with the correct userData', async () => {
        const userData = { name: 'New Team' };
        const newTeam = { id: 1, ...userData };
        TeamQueryRepository.create.mockResolvedValue(newTeam); 

        const result = await TeamQueryService.create(userData);

        expect(TeamQueryRepository.create).toHaveBeenCalledWith(userData); 
        expect(result).toEqual(newTeam); 
    });

    test('delete should call TeamQueryRepository.delete with the correct id', async () => {
        const id = 1;
        TeamQueryRepository.delete.mockResolvedValue(true); 

        const result = await TeamQueryService.delete(id);

        expect(TeamQueryRepository.delete).toHaveBeenCalledWith(id); 
        expect(result).toBe(true); 
    });
});
