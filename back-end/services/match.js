const MatchRepository = require('../repository/match')
const EngagedTeamRepository = require('../repository/engagedTeam')

class MatchService{
    async findById(id){
        return MatchRepository.findById(id);
    }

    async findByTournamentId(id){
        return MatchRepository.findByTournamentId(id);
    }

    async list(){
        return MatchRepository.list();
    }

    update(id, userData){
        return MatchRepository.update(id, userData);
    }

    async create(matchData){
        if(!matchData.team1_id) matchData.is_team1_winner = false
        if(!matchData.team2_id) matchData.is_team1_winner = true

        console.log(matchData)
        
        return MatchRepository.create(matchData);
    }

    async delete(id){
        const match = await MatchRepository.findById(id)

        if(match.is_team1_winner !== null){
            //console.log(match)
            if(match.is_team1_winner){
                const team2 = await EngagedTeamRepository.findByTeamAndTournamentId(match.team2_id, match.tournament_id)
                EngagedTeamRepository.update(team2.id, {team_id: team2.team_id, tournament_id: team2.tournament_id, team_grid_status: team2.team_grid_status + 1})
            }
            else{
                const team1 = await EngagedTeamRepository.findByTeamAndTournamentId(match.team1_id, match.tournament_id)
                EngagedTeamRepository.update(team1.id, {team_id: team1.team_id, tournament_id: team1.tournament_id, team_grid_status: team1.team_grid_status + 1})
            }
        }

        return MatchRepository.delete(id);
    }
}

module.exports = new MatchService()