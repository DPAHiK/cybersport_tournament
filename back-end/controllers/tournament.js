const TournamentService = require('../services/tournament')
const NotFoundError = require('../errors/NotFoundError')

class TournamentController{
    async list(req, res, next){
        try{
            res.json(await TournamentService.list())
        }
        catch(err){
            return next(err)
        }
    }

    async findById(req, res, next){
        try{
            const tournamentId = req.params.id;

            if(tournamentId == 'query' || tournamentId == 'result') return next();

            const result = await TournamentService.findById(tournamentId)
            if(result) return res.json(result)

            return next(new NotFoundError('Tournament with ID ' + tournamentId + ' not found'))
                
        }
        catch(err){
            return next(err)
        }
    }

    async create(req, res, next){
        try{
            const userData = req.body;

            res.json(await TournamentService.create(userData))
        }
        catch(err){
            return next(err)
        }
    }

    async update(req, res, next){
        try{
            const tournamentData = req.body;
            const tournamentId = req.params.id;

            const result = await TournamentService.update(tournamentId, tournamentData)
            if(result[0]) return res.json(result)

            return next(new NotFoundError('Tournament with ID ' + tournamentId + ' not found'))
        }
        catch(err){
            console.log(err)
            return next(err)
        }       
    }

    async delete(req, res, next){
        try{
            const tournamentId = req.params.id;

            const result = await TournamentService.delete(tournamentId)
            if(result) return res.json(result)

            return next(new NotFoundError('Tournament with ID ' + tournamentId + ' not found'))
        }
        catch(err){
            console.log(err)
            return next(err)
        }          
    }
}

module.exports = new TournamentController()