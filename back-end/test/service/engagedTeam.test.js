const EngagedTeamService = require('../../services/engagedTeam'); 
const EngagedTeamRepository = require('../../repository/engagedTeam'); 

jest.mock('../../repository/engagedTeam'); 

describe('Engaged Team Service', () => {
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    test('findTeamsByTournamentId should call EngagedTeamRepository.findTeamsByTournamentId with the correct tournamentId', async () => {
        const tournamentId = 1;
        const teams = [{ id: 1, tournament_id: 1, team_id: 1, team_grid_status: "HIGH_GRID" }, { id: 1, tournament_id: 1, team_id: 2, team_grid_status: "OUT" }];
        EngagedTeamRepository.findTeamsByTournamentId.mockResolvedValue(teams); 

        const result = await EngagedTeamService.findTeamsByTournamentId(tournamentId);

        expect(EngagedTeamRepository.findTeamsByTournamentId).toHaveBeenCalledWith(tournamentId); 
        expect(result).toEqual(teams); 
    });

    test('findTeamsByTeamId should call EngagedTeamRepository.findTeamsByTeamId with the correct teamId', async () => {
        const teamId = 1;
        const teams = [{ id: 1, tournament_id: 1, team_id: 1, team_grid_status: "HIGH_GRID" }];
        EngagedTeamRepository.findTeamsByTeamId.mockResolvedValue(teams); 

        const result = await EngagedTeamService.findTeamsByTeamId(teamId);

        expect(EngagedTeamRepository.findTeamsByTeamId).toHaveBeenCalledWith(teamId); 
        expect(result).toEqual(teams); 
    });

    test('list should call EngagedTeamRepository.list', async () => {
        const teams = [{ id: 1, tournament_id: 1, team_id: 1, team_grid_status: "HIGH_GRID" }, { id: 1, tournament_id: 1, team_id: 2, team_grid_status: "OUT" }];
        EngagedTeamRepository.list.mockResolvedValue(teams);

        const result = await EngagedTeamService.list();

        expect(EngagedTeamRepository.list).toHaveBeenCalled(); 
        expect(result).toEqual(teams); 
    });

    test('update should call EngagedTeamRepository.update with the correct id and userData', async () => {
        const id = 1;
        const userData = {  tournament_id: 1, team_id: 1, team_grid_status: "LOW_GRID" };
        EngagedTeamRepository.update = jest.fn().mockResolvedValue({ id, ...userData }); 

        const result = await EngagedTeamService.update(id, userData);

        expect(EngagedTeamRepository.update).toHaveBeenCalledWith(id, userData); 
        expect(result).toEqual({ id, ...userData }); 
    });

    test('create should call EngagedTeamRepository.create with the correct userData', async () => {
        const newTeam = { id: 3,  tournament_id: 2, team_id: 1, team_grid_status: "HIG_GRID" };
        EngagedTeamRepository.create.mockResolvedValue(newTeam);

        const result = await EngagedTeamService.create(newTeam);

        expect(EngagedTeamRepository.create).toHaveBeenCalledWith(newTeam); 
        expect(result).toEqual(newTeam); 
    });

    test('delete should call EngagedTeamRepository.delete with the correct id', async () => {
        const id = 1;
        EngagedTeamRepository.delete.mockResolvedValue(true); 

        const result = await EngagedTeamService.delete(id);

        expect(EngagedTeamRepository.delete).toHaveBeenCalledWith(id); 
        expect(result).toBe(true); 
    });
});
