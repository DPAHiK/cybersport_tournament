const MatchService = require('../services/match')
const NotFoundError = require('../errors/NotFoundError')

class MatchController{
    async list(req, res, next){
        try{
            res.json(await MatchService.list())
        }
        catch(err){
            return next(err)
        }
    }

    async findById(req, res, next){
        try{
            const matchId = req.params.matchId;

            const result = await MatchService.findById(matchId) 
            if(result) return res.json(result)

            return next(new NotFoundError('Match with ID ' + matchId + ' not found'))
        }
        catch(err){
            return next(err)
        }
    }

    async findByTournamentId(req, res, next){
        try{
            const matchId = req.params.tournamentId;

            const result = await MatchService.findByTournamentId(matchId)
            if(result.length) return res.json(result)

            return next(new NotFoundError('Matches from tournament with ID ' + matchId + ' not found'))
        }
        catch(err){
            return next(err)
        }
    }

    async create(req, res, next){
        try{
            const userData = req.body;

            res.json(await MatchService.create(userData))
        }
        catch(err){
            return next(err)
        }
    }

    async update(req, res, next){
        try{
            const userData = req.body;
            const matchId = req.params.matchId;

            const result = await MatchService.update(matchId, userData)
            if(result[0]) return res.json(result)

            return next(new NotFoundError('Matches with ID ' + matchId + ' not found'))
        }
        catch(err){
            return next(err)
        }       
    }

    async delete(req, res, next){
        try{
            const matchId = req.params.matchId;

            const result = await MatchService.delete(matchId)
            if(result) return res.json(result)

            return next(new NotFoundError('Matches with ID ' + matchId + ' not found'))
        }
        catch(err){
            return next(err)
        }          
    }
}

module.exports = new MatchController()