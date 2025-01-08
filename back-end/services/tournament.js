const TournamentRepository = require('../repository/tournament')

class TournamentService{
    async findById(id){
        return TournamentRepository.findById(id);
    }


    async list(){
        return TournamentRepository.list();
    }

    async create(userData){
        return TournamentRepository.create(userData);
    }

    async update(id, tournamentData){
        return TournamentRepository.update(id, tournamentData)
    }

    async delete(id){
        return TournamentRepository.delete(id);
    }
}

module.exports = new TournamentService()