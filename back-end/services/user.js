const UserRepository = require('../repository/user')

class UserService{
    async findById(id){
        return UserRepository.findById(id);
    }

    async list(){
        return UserRepository.list();
    }

    update(id, userData){
        return UserRepository.update(id, userData);
    }

    async create(userData){
        return UserRepository.create(userData);
    }

    async delete(id){
        return UserRepository.delete(id);
    }
}

module.exports = new UserService()