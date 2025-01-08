const Tournament = require('../models/tournament')

class TournamentRepository{
    findById(id){
        return Tournament.findOne({where: {id: id}});
    }

    list(){
        return Tournament.findAll();
    }

    async create(tournamentData){
        let tournament = null;

        try{
            tournament = await Tournament.create(tournamentData)
        }
        catch(err){
            throw new Error("Failed to create tournament");
        }

        return tournament;
    }

    async update(id, tournamentData){
        return Tournament.update(tournamentData, {where: {id: id}})
    }

    async delete(id){
        return await Tournament.destroy({where: {id: id}})
    }
}

module.exports = new TournamentRepository()