const MatchRepository = require('../repository/match')

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

    async create(userData){
        return MatchRepository.create(userData);
    }

    async delete(id){
        return MatchRepository.delete(id);
    }
}

module.exports = new MatchService()