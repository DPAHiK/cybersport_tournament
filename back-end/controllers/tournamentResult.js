const TournamentResultService = require('../services/tournamentResult')

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
            const userId = req.params.tournamentId;

            res.json(await TournamentResultService.findByTournamentId(userId))
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
            const userData = req.body;
            //console.log(userData)
            //console.log(req)
            const userId = req.params.id;

            res.json(await TournamentResultService.update(userId, userData))
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

            res.json(await TournamentResultService.delete(userId))
        }
        catch(err){
            console.log(err)
            return next(err)
        }          
    }

    async deleteByTournamentId(req, res, next){
        try{
            //console.log(userData)
            //console.log(req)
            const userId = req.params.tournamentId;

            res.json(await TournamentResultService.deleteByTournamentId(userId))
        }
        catch(err){
            console.log(err)
            return next(err)
        }          
    }
}

module.exports = new TournamentResultController()