const UserService = require('../services/user')
const ConflictError = require('../errors/ConflictError')

class UserController{
    async list(req, res, next){
        //console.log(req.user)
        try{
            res.json(await UserService.list())
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async findById(req, res, next){
        try{
            const userId = req.params.id;

            res.json(await UserService.findById(userId))
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async create(req, res, next){
        const userExists = await UserService.findByName(req.body.name)
        if(userExists) return next(new ConflictError('User with name ' + req.body.name + ' already exists'))
        try{
            const userData = req.body;

            res.json(await UserService.create(userData))
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async update(req, res, next){
        try{
            const userData = req.body;
            //console.log(userData)
            //console.log(req)
            const userId = req.params.id;

            res.json(await UserService.update(userId, userData))
        }
        catch(err){
            console.log(err)
            return next(err)
        }       
    }

    async delete(req, res, next){
        try{
            //console.log(userData)
            //console.log(req)
            const userId = req.params.id;

            res.json(await UserService.delete(userId))
        }
        catch(err){
            console.log(err)
            return next(err)
        }          
    }
}

module.exports = new UserController()