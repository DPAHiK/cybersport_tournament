const User = require('../models/user')
const sequelize = require('../database/sequelize')

class UserRepository{
    findById(id){
        return User.findOne({where: {id: id}});
    }

    findByName(name){
        return User.findOne({where: {name: name}})
    }

    async findProfilesByTeamId(teamId){
        const [results, metadata] = await sequelize.query(
            "SELECT users.id, users.name FROM users, team_members WHERE team_members.team_id = " + teamId + " and team_members.user_id = users.id"
          )

        return results
    }

    async findMemberProfilesByTeamId(teamId){
        const [results, metadata] = await sequelize.query(
            "SELECT users.id, users.name FROM users, member_queries WHERE member_queries.team_id = " + teamId + " and member_queries.user_id = users.id"
          )

        return results
    }

    list(){
        return User.findAll();
    }

    async create(userData){
        let user = null;

        try{
            user = await User.create(userData)
        }
        catch(err){
            throw new Error("Failed to create user");
        }

        return user;
    }

    async update(id, userData){
        return await User.update(userData, {where: {id: id}, individualHooks: true})
    }

    async delete(id){
        return await User.destroy({where: {id: id}})
    }
}

module.exports = new UserRepository()