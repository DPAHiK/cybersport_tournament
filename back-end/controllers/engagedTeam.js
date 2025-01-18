const EngagedTeamService = require('../services/engagedTeam')
const NotFoundError = require('../errors/NotFoundError')

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

            const result = await EngagedTeamService.findTeamsByTournamentId(tournamentId)
            if(result.length) return res.json(result)

            return next(new NotFoundError('Teams engaged in tournament with ID ' + tournamentId + ' not found'))
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async getProfilesByTournamentId(req, res, next){
        try{
            const tournamentId = req.params.tournamentId;

            const result = await EngagedTeamService.findProfilesByTournamentId(tournamentId)
            if(result.length) return res.json(result)

            return next(new NotFoundError('Teams engaged in tournament with ID ' + tournamentId + ' not found'))
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async findTeamsByTeamId(req, res, next){
        try{
            const teamId = req.params.teamId;
            
            const result = await EngagedTeamService.findTeamsByTeamId(teamId)
            if(result.length) return res.json(result)

            return next(new NotFoundError('Teams engaged with team ID ' + teamId + ' not found'))
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
            const teamId = req.params.teamId;

            const result = await EngagedTeamService.update(teamId, userData)
            if(result[0]) return res.json(result)

            next(new NotFoundError('Teams engaged with ID ' + teamId + ' not found'))
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async delete(req, res, next){
        try{
            const teamId = req.params.teamId;

            const result = await EngagedTeamService.delete(teamId)
            if(result) return res.json(result)

            next(new NotFoundError('Teams engaged with ID ' + teamId + ' not found'))
        }
        catch(err){
            console.log(err)
            return next(err)
        }          
    }
}

module.exports = new EngagedTeamController()