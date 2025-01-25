const EngagedTeamRepository = require('../repository/engagedTeam')
const TeamRepository = require('../repository/team')
const TournamentResultRepository = require('../repository/tournamentResult')

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
        return EngagedTeamRepository.findByTeamAndTournamentId( teamId, tournamentId);
    }

    async list(){
        return EngagedTeamRepository.list();
    }

    async update(id, teamData){
        //console.log(teamData)
        if(teamData.team_grid_status === 0){
            const team = await EngagedTeamRepository.findById(id)
            //console.log(team)
            const tournamentTeams = await EngagedTeamRepository.findTeamsByTournamentId(team.tournament_id)
            const tournamentResults = await TournamentResultRepository.findByTournamentId(team.tournament_id)
            if(team) TournamentResultRepository.create({tournament_id: team.tournament_id, team_id: team.team_id, place: tournamentTeams && tournamentResults ? tournamentTeams.length - tournamentResults.length : 0})
        }
        return EngagedTeamRepository.update(id, teamData);
    }

    async create(userData){
        return EngagedTeamRepository.create(userData);
    }

    async delete(id){
        return EngagedTeamRepository.delete(id);
    }
}

module.exports = new EngagedTeamService()