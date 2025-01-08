const User = require('../models/user')


class UserRepository{
    findById(id){
        return User.findOne({where: {id: id}});
    }

    findByName(name){
        return User.findOne({where: {name: name}})
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