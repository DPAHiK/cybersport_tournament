const MatchService = require('../services/match')

class MatchController{
    async list(req, res, next){
        try{
            res.json(await MatchService.list())
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async findById(req, res, next){
        try{
            const userId = req.params.matchId;

            res.json(await MatchService.findById(userId))
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async findByTournamentId(req, res, next){
        try{
            const userId = req.params.tournamentId;

            res.json(await MatchService.findByTournamentId(userId))
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async create(req, res, next){
        try{
            const userData = req.body;

            res.json(await MatchService.create(userData))
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
            const userId = req.params.matchId;

            res.json(await MatchService.update(userId, userData))
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

            res.json(await MatchService.delete(userId))
        }
        catch(err){
            console.log(err)
            return next(err)
        }          
    }
}

module.exports = new MatchController()