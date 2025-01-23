const Match = require('../models/match')

class MatchRepository{
    findById(id){
        return Match.findOne({where: {id: id}});
    }

    findByTournamentId(tournamentId){
        return Match.findAll({where: {tournament_id: tournamentId},
                              order:[['start_date', 'ASC'], ['grid_level', 'DESC'] ]});
    }

    list(){
        return Match.findAll({order:[['start_date', 'ASC'], ['grid_level', 'DESC'] ]});
    }

    async create(matchData){
        let match = null;

        try{
            match = await Match.create(matchData)
        }
        catch(err){
            console.log(err)
            throw new Error("Failed to create match");
        }

        return match;
    }

    async update(id, matchData){
        return Match.update(matchData, {where: {id: id}})
    }

    async delete(id){
        return await Match.destroy({where: {id: id}})
    }
}

module.exports = new MatchRepository()