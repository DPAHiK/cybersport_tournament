const TeamQueryRepository = require('../repository/teamQuery')
const TeamRepository = require('../repository/team')

class TeamQueryService{
    async findById(id){
        return TeamQueryRepository.findById(id);
    }

    async findByTeamId(teamId){
        return TeamQueryRepository.findByTeamId(teamId);
    }

    async findByTournamentId(tournamentId){
        return TeamQueryRepository.findByTournamentId(tournamentId);
    }

    async findQueryTeamsByTournamentId(tournamentId){
        return TeamRepository.findQueryTeamsByTournamentId(tournamentId);
    }

    async findAcceptedByTournamentId(tournamentId){
        return TeamQueryRepository.findAcceptedByTournamentId(tournamentId);
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