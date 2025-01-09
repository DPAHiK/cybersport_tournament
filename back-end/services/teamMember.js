const TeamMemberRepository = require('../repository/teamMember')

class TeamMemberService{
    async findByTeamId(id){
        return TeamMemberRepository.findByTeamId(id);
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