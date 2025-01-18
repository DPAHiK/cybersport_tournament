const TeamRepository = require('../repository/team')
const sequelize = require('../database/sequelize')

class TeamService{
    async findById(id){
        return TeamRepository.findById(id);
    }

    async findByName(name){
        return TeamRepository.findByName(name);
    }

    async findProfilesByTournamentId(tournamentId){
        const [results, metadata] = await sequelize.query(
            "SELECT teams.name FROM teams, engaged_teams WHERE engaged_teams.tournament_id = " + tournamentId + " and engaged_teams.team_id = teams.id"
          )

        return results
    }

    async list(){
        return TeamRepository.list();
    }

    update(id, userData){
        return TeamRepository.update(id, userData);
    }

    async create(userData){
        return TeamRepository.create(userData);
    }

    async delete(id){
        return TeamRepository.delete(id);
    }
}

module.exports = new TeamService()