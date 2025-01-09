const TournamentResultService = require('../services/tournamentResult')
const NotFoundError = require('../errors/NotFoundError')

class TournamentResultController{
    async list(req, res, next){
        try{
            res.json(await TournamentResultService.list())
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async findByTournamentId(req, res, next){
        try{
            const tournamentId = req.params.tournamentId;

            const result = await TournamentResultService.findByTournamentId(tournamentId)
            if(result.length) return res.json(result)

            return next(new NotFoundError('Result of tournament with ID ' + tournamentId + ' not found'))
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async findById(req, res, next){
        try{
            const tournamentResultId = req.params.resultId;

            const result = await TournamentResultService.findById(tournamentResultId)
            if(result) return res.json(result)

            return next(new NotFoundError('Tournament result with ID ' + tournamentResultId + ' not found'))
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async create(req, res, next){
        try{
            const userData = req.body;

            res.json(await TournamentResultService.create(userData))
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async update(req, res, next){
        try{
            const tournamentData = req.body;
            const tournamentResultId = req.params.resultId;

            const result = await TournamentResultService.update(tournamentResultId, tournamentData)
            if(result) return res.json(result)

            return next(new NotFoundError('Tournament result with ID ' + tournamentResultId + ' not found'))
        }
        catch(err){
            return next(err)
        }       
    }

    async delete(req, res, next){
        try{
            const tournamentResultId = req.params.resultId;

            const result = await TournamentResultService.delete(tournamentResultId)
            if(result) return res.json(result)

            return next(new NotFoundError('Tournament result with ID ' + tournamentResultId + ' not found'))
        }
        catch(err){
            return next(err)
        }          
    }

    async deleteByTournamentId(req, res, next){
        try{
            const tournamentId = req.params.tournamentId;

            const result = await TournamentResultService.deleteByTournamentId(tournamentId)
            if(result) return res.json(result)

            return next(new NotFoundError('Result of tournament with ID ' + tournamentId + ' not found'))
        }
        catch(err){
            return next(err)
        }          
    }
}

module.exports = new TournamentResultController()