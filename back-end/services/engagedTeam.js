const EngagedTeamRepository = require('../repository/engagedTeam')
const TeamRepository = require('../repository/team')

class EngagedTeamService{
    async findTeamsByTournamentId(tournamentId){
        return EngagedTeamRepository.findTeamsByTournamentId(tournamentId);
    }

    async findProfilesByTournamentId(tournamentId){
        return TeamRepository.findProfilesByTournamentId(tournamentId);
    }    

    async findTeamsByTeamId(teamId){
        return EngagedTeamRepository.findTeamsByTeamId(teamId);
    }

    async findByTournamentAndTeamId(tournamentId, teamId){
        return EngagedTeamRepository.findByTeamAndTournamentId(tournamentId, teamId);
    }

    async list(){
        return EngagedTeamRepository.list();
    }

    update(id, userData){
        return EngagedTeamRepository.update(id, userData);
    }

    async create(userData){
        return EngagedTeamRepository.create(userData);
    }

    async delete(id){
        return EngagedTeamRepository.delete(id);
    }
}

module.exports = new EngagedTeamService()