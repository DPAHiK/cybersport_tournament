const TeamService = require('../services/team')
const ConflictError = require('../errors/ConflictError')

class TeamController{
    async list(req, res, next){
        try{
            res.json(await TeamService.list())
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async findById(req, res, next){
        try{
            const userId = req.params.id;

            if(userId != 'query') return res.json(await TeamService.findById(userId))
            
            return next()
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async create(req, res, next){
        const teamExists = await TeamService.findByName(req.body.name)
        if(teamExists) return next(new ConflictError('Team with name ' + req.body.name + ' already exists'))
        try{
            const userData = req.body;

            res.json(await TeamService.create(userData))
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async update(req, res, next){
        try{
            const teamData = req.body;
            const teamId = req.params.id;

            res.json(await TeamService.update(teamId, teamData))
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

            res.json(await TeamService.delete(userId))
        }
        catch(err){
            console.log(err)
            return next(err)
        }          
    }
}

module.exports = new TeamController()