
const TeamQuery = require('../models/teamQuery')

class TeamQueryRepository{
    findByTeamId(teamId){
        return TeamQuery.findAll({where: {team_id: teamId}});
    }

    findByTournamentId(tournamentId){
        return TeamQuery.findAll({where: {tournament_id: tournamentId}});
    }

    findByTournamentAndTeamId(tournamentId, teamId){
        return TeamQuery.findOne({where: {tournament_id: tournamentId, team_id: teamId}});
    }

    findAcceptedByTournamentId(tournamentId){
        return TeamQuery.findAll({where: {tournament_id: tournamentId, status: true}});
    }

    list(){
        return TeamQuery.findAll();
    }

    findById(id){
        return TeamQuery.findOne({where: {id: id}})
    }

    async create(teamData){
        let team = null;

        try{
            team = await TeamQuery.create(teamData)
        }
        catch(err){
            throw new Error("Failed to create teamQuery");
        }

        return team;
    }

    async update(id, teamData){
        return await TeamQuery.update(teamData, {where: {id: id}})
    }    

    async delete(id){
        return await TeamQuery.destroy({where: {id: id}})
    }
}

module.exports = new TeamQueryRepository()