const TeamMemberRepository = require('../repository/teamMember')
const UserRepository = require('../repository/user')

class TeamMemberService{
    async findByTeamId(id){
        return TeamMemberRepository.findByTeamId(id);
    }

    async findByTeamAndUserId(teamId, userId){
        return TeamMemberRepository.findByTeamAndUserId(teamId, userId);
    }

    async findProfilesByTeamId(teamId){
        return UserRepository.findProfilesByTeamId(teamId);
    }
    
    async create(userData){
        return TeamMemberRepository.create(userData);
    }

    async deleteByUserId(id){
        return TeamMemberRepository.deleteByUserId(id);
    }

    async delete(id){
        return TeamMemberRepository.delete(id);
    }
}

module.exports = new TeamMemberService()