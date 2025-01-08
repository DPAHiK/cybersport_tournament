const EngagedTeam = require('../models/engagedTeam')

class EngagedTeamRepository{
    findTeamsByTournamentId(tournamentId){
        return EngagedTeam.findAll({where: {tournament_id: tournamentId}});
    }

    findTeamsByTeamId(teamId){
        return EngagedTeam.findAll({where: {team_id: teamId}});
    }

    list(){
        return EngagedTeam.findAll();
    }

    async update(id, teamData){
        return EngagedTeam.update(teamData, {where: {id: id}})
    }

    async create(teamData){
        let team = null;

        try{
            team = await EngagedTeam.create(teamData)
        }
        catch(err){
            throw new Error("Failed to create engagedTeam");
        }

        return team;
    }

    async delete(id){
        return await EngagedTeam.destroy({where: {id: id}})
    }
}

module.exports = new EngagedTeamRepository()