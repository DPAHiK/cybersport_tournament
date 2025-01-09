const TournamentService = require('../services/tournament')
const TeamQueryService = require('../services/teamQuery')
const EngagedTeamService = require('../services/engagedTeam')
const NotFoundError = require('../errors/NotFoundError')

class TournamentController{

    async generateGrid(req, res, next){
        try{
            const tournamentId = req.params.tournamentId;

            const check = await TournamentService.findById(tournamentId)
            if(!check) return next(new NotFoundError('Tournament with ID ' + tournamentId + ' not found'))

            const acceptedQuereis = await TeamQueryService.findAcceptedByTournamentId(tournamentId)

            acceptedQuereis.forEach((item) => {EngagedTeamService.create
                ({tournament_id: tournamentId, team_id: item.team_id, team_grid_status: "HIGH_GRID"})})

            console.log(acceptedQuereis)

            return res.json({message: "Grid generated"})
        }
        catch(err){
            return next(err)
        }        
    }
    
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