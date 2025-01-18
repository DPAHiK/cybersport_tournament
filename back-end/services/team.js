const TeamRepository = require('../repository/team')

class TeamService{
    async findById(id){
        return TeamRepository.findById(id);
    }

    async findByName(name){
        return TeamRepository.findByName(name);
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