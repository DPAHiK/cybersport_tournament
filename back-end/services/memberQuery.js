const MemberQueryRepository = require('../repository/memberQuery')
const UserRepository = require('../repository/user')

class MemberQueryService{
    async findById(id){
        return MemberQueryRepository.findById(id);
    }

    async findByTeamId(teamId){
        return MemberQueryRepository.findByTeamId(teamId);
    }

    async findByUserId(userId){
        return MemberQueryRepository.findByUserId(userId);
    }

    async findProfilesByTeamId(teamId){
        return UserRepository.findMemberProfilesByTeamId(teamId);
    }    

    async list(){
        return MemberQueryRepository.list();
    }

    async create(userData){
        
        return MemberQueryRepository.create(userData);
    }

    async update(id, teamData){
        return MemberQueryRepository.update(id, teamData);
    }

    async deleteByUserId(userId){
        return MemberQueryRepository.deleteByUserId(userId);
    }

    async delete(id){
        return MemberQueryRepository.delete(id);
    }
}

module.exports = new MemberQueryService()