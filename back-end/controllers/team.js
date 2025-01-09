const TeamService = require('../services/team')
const ConflictError = require('../errors/ConflictError')
const NotFoundError = require('../errors/NotFoundError')

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
            const teamId = req.params.id;

            if(teamId == 'query') return next()

            const result = await TeamService.findById(teamId)
            if(result) return res.json(result)

            return next(new NotFoundError('Team with ID ' + teamId + ' not found'))
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

            const result = await TeamService.update(teamId, teamData)
            if(result[0]) return res.json(result)

            return next(new NotFoundError('Team with ID ' + teamId + ' not found'))
        }
        catch(err){
            console.log(err)
            return next(err)
        }       
    }

    async delete(req, res, next){
        try{
            const teamId = req.params.id;

            const result = await TeamService.delete(teamId)
            if(result) return res.json(result)

            return next(new NotFoundError('Team with ID ' + teamId + ' not found'))
        }
        catch(err){
            console.log(err)
            return next(err)
        }          
    }
}

module.exports = new TeamController()