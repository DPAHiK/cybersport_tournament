const TournamentResultRepository = require('../repository/tournamentResult')

class TournamentResultService{
    async findByTournamentId(id){
        return TournamentResultRepository.findByTournamentId(id);
    }


    async list(){
        return TournamentResultRepository.list();
    }

    async create(userData){
        return TournamentResultRepository.create(userData);
    }

    async update(id, tournamentData){
        return TournamentResultRepository.update(id, tournamentData)
    }

    async delete(id){
        return TournamentResultRepository.delete(id);
    }

    async deleteByTournamentId(tournamentId){
        return TournamentResultRepository.deleteByTournamentId(tournamentId)
    }
}

module.exports = new TournamentResultService()