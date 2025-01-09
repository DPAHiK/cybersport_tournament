const TeamQueryService = require('../services/teamQuery')
const TeamQuery = require('../models/teamQuery')

class TeamQueryController{
    async list(req, res, next){
        try{
            res.json(await TeamQueryService.list())
        }
        catch(err){
            return next(err)
        }
    }

    async findById(req, res, next){
        try{
            const queryId = req.params.queryId;

            res.json(await TeamQueryService.findById(queryId))
        }
        catch(err){
            return next(err)
        }
    }

    async findByTeamId(req, res, next){
        try{
            const teamId = req.params.teamId;

            res.json(await TeamQueryService.findByTeamId(teamId))
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async create(req, res, next){
        try{
            const userData = req.body;

            res.json(await TeamQueryService.create(userData))
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

            res.json(await TeamQueryService.delete(userId))
        }
        catch(err){
            console.log(err)
            return next(err)
        }          
    }
}

module.exports = new TeamQueryController()