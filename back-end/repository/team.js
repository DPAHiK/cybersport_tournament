const Team = require('../models/team')
const sequelize = require('../database/sequelize')

class TeamRepository{
    findById(id){
        return Team.findOne({where: {id: id}});
    }

    findByName(name){
        return Team.findOne({where: {name: name}});
    }
    
    async findProfilesByTournamentId(tournamentId){
        const [results, metadata] = await sequelize.query(
            "SELECT teams.id, teams.name FROM teams, engaged_teams WHERE engaged_teams.tournament_id = " + tournamentId + " and engaged_teams.team_id = teams.id"
          )

        return results
    }

    async findQueryTeamsByTournamentId(tournamentId){
        const [results, metadata] = await sequelize.query(
            "SELECT teams.id, teams.name FROM teams, team_queries WHERE team_queries.tournament_id = " + tournamentId + " and team_queries.team_id = teams.id"
          )

        return results
    }

    list(){
        return Team.findAll();
    }

    async create(teamData){
        let team = null;

        try{
            team = await Team.create(teamData)
        }
        catch(err){
            throw new Error("Failed to create team");
        }

        return team;
    }

    async update(id, teamData){
        return Team.update(teamData, {where: {id: id}})
    }

    async delete(id){
        return await Team.destroy({where: {id: id}})
    }
}

module.exports = new TeamRepository()