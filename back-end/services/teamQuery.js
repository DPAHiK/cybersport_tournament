const TeamQueryRepository = require('../repository/teamQuery')

class TeamQueryService{
    async findById(id){
        return TeamQueryRepository.findById(id);
    }

    async findByTeamId(teamId){
        return TeamQueryRepository.findByTeamId(teamId);
    }

    async list(){
        return TeamQueryRepository.list();
    }

    async create(userData){
        return TeamQueryRepository.create(userData);
    }

    async update(id, teamData){
        return TeamQueryRepository.update(id, teamData);
    }

    async delete(id){
        return TeamQueryRepository.delete(id);
    }
}

module.exports = new TeamQueryService()