const TournamentResult = require('../models/tournamentResult')

class TournamentResultRepository{
    findByTournamentId(tournamentId){
        return TournamentResult.findOne({where: {tournament_id: tournamentId}});
    }

    findById(id){
        return Team.findOne({where: {id: id}});
    }

    list(){
        return TournamentResult.findAll();
    }

    async create(tournamentResultData){
        let tournamentResult = null;

        try{
            tournamentResult = await TournamentResult.create(tournamentResultData)
        }
        catch(err){
            throw new Error("Failed to create TournamentResult");
        }

        return tournamentResult;
    }

    async update(id, tournamentResultData){
        return TournamentResult.update(tournamentResultData, {where: {id: id}})
    }

    async delete(id){
        return await TournamentResult.destroy({where: {id: id}})
    }

    async deleteByTournamentId(tournamentId){
        return await TournamentResult.destroy({where: {tournament_id: tournamentId}})
    }
}

module.exports = new TournamentResultRepository()