const TournamentService = require('../services/tournament')

class TournamentController{
    async list(req, res, next){
        try{
            res.json(await TournamentService.list())
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async findById(req, res, next){
        try{
            const userId = req.params.id;

            

            if(userId != 'query' && userId != 'result') res.json(await TournamentService.findById(userId))
                else next()
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async create(req, res, next){
        try{
            const userData = req.body;

            res.json(await TournamentService.create(userData))
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

            res.json(await TournamentService.update(userId, userData))
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

            res.json(await TournamentService.delete(userId))
        }
        catch(err){
            console.log(err)
            return next(err)
        }          
    }
}

module.exports = new TournamentController()