const Team = require('../models/team')

class TeamRepository{
    findById(id){
        return Team.findOne({where: {id: id}});
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