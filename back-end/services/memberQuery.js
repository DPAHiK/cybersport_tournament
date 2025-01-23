const MemberQueryRepository = require('../repository/memberQuery')
const jwt = require('jsonwebtoken')

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