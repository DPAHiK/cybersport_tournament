const EngagedTeamService = require('../services/engagedTeam')

class EngagedTeamController{
    async list(req, res, next){
        try{
            res.json(await EngagedTeamService.list())
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async findTeamsByTournamentId(req, res, next){
        try{
            const tournamentId = req.params.tournamentId;

            res.json(await EngagedTeamService.findTeamsByTournamentId(tournamentId))
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async findTeamsByTeamId(req, res, next){
        try{
            const teamId = req.params.teamId;

            res.json(await EngagedTeamService.findTeamsByTeamId(teamId))
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async create(req, res, next){
        try{
            const userData = req.body;

            res.json(await EngagedTeamService.create(userData))
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async update(req, res, next){
        try{
            const userData = req.body;

            const userId = req.params.teamId;

            res.json(await EngagedTeamService.update(userId, userData))
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

            res.json(await EngagedTeamService.delete(userId))
        }
        catch(err){
            console.log(err)
            return next(err)
        }          
    }
}

module.exports = new EngagedTeamController()