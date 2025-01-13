const UserService = require('../services/user')
const ConflictError = require('../errors/ConflictError')
const NotFoundError = require('../errors/NotFoundError')

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
            
            const result = await UserService.findById(userId) 
            if(result) return res.json(result)

            next(new NotFoundError('User with ID ' + userId + ' not found'))
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async getProfileData(req, res, next){
        try{
            const userId = req.params.id;
            
            const result = await UserService.findById(userId) 
            if(result) return res.json({name: result.name})

            next(new NotFoundError('User with ID ' + userId + ' not found'))
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
            const userId = req.params.id;

            const result = await UserService.update(userId, userData)
            if(result[0]) return res.json(result)

            next(new NotFoundError('User with ID ' + userId + ' not found'))
        }
        catch(err){
            console.log(err)
            return next(err)
        }       
    }

    async delete(req, res, next){
        try{
            const userId = req.params.id;

            const result = await UserService.delete(userId)
            if(result) return res.json(result)

            next(new NotFoundError('User with ID ' + userId + ' not found'))
        }
        catch(err){
            console.log(err)
            return next(err)
        }          
    }
}

module.exports = new UserController()