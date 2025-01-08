const TeamMemberService = require('../../services/teamMember'); 
const TeamMemberRepository = require('../../repository/teamMember'); 

jest.mock('../../repository/teamMember'); 

describe('TeamMember Service', () => {
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    test('findByTeamId should call TeamMemberRepository.findByTeamId with the correct id', async () => {
        const teamId = 1;
        const members = [{ id: 1, name: 'Member A' }, { id: 2, name: 'Member B' }];
        TeamMemberRepository.findByTeamId.mockResolvedValue(members); 

        const result = await TeamMemberService.findByTeamId(teamId);

        expect(TeamMemberRepository.findByTeamId).toHaveBeenCalledWith(teamId); 
        expect(result).toEqual(members); 
    });

    test('create should call TeamMemberRepository.create with the correct userData', async () => {
        const userData = { name: 'New Member', teamId: 1 };
        const newMember = { id: 1, ...userData };
        TeamMemberRepository.create.mockResolvedValue(newMember); 

        const result = await TeamMemberService.create(userData);

        expect(TeamMemberRepository.create).toHaveBeenCalledWith(userData); 
        expect(result).toEqual(newMember); 
    });

    test('delete should call TeamMemberRepository.delete with the correct id', async () => {
        const id = 1;
        TeamMemberRepository.delete.mockResolvedValue(true); 

        const result = await TeamMemberService.delete(id);

        expect(TeamMemberRepository.delete).toHaveBeenCalledWith(id); 
        expect(result).toBe(true); 
    });
});
