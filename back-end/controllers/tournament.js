const TournamentService = require('../services/tournament')
const TeamQueryService = require('../services/teamQuery')
const EngagedTeamService = require('../services/engagedTeam')
const MatchService = require('../services/match')
const NotFoundError = require('../errors/NotFoundError')
const jwt = require('jsonwebtoken')
const UnauthorizedError = require('../errors/UnauthorizedError')
const ForbiddenError = require('../errors/ForbiddenError')

class TournamentController{

    async generateGrid(req, res, next){
        try{
            const tournamentId = req.params.tournamentId;

            const check = await TournamentService.findById(tournamentId)
            if(!check) return next(new NotFoundError('Tournament with ID ' + tournamentId + ' not found'))

            const acceptedQuereis = await TeamQueryService.findAcceptedByTournamentId(tournamentId)

            acceptedQuereis.forEach((item) => {EngagedTeamService.create
                ({tournament_id: tournamentId, team_id: item.team_id, team_grid_status: 2})})
            
            for (let i = 0; i < acceptedQuereis.length; i += 2){
                let match = {
                    tournament_id: tournamentId,
                    grid_level: 2, 
                    start_date: check.start_date, 
                    team1_id: acceptedQuereis[i].team_id, 
                    team2_id: null
                }
                if(i + 1 < acceptedQuereis.length) match.team2_id = acceptedQuereis[i + 1].team_id

                MatchService.create(match)
            }

            //console.log(acceptedQuereis)

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

            const token = req.headers['authorization']; 
            jwt.verify(token, 'secret', async (err, decoded) => {
                if (err) {
                  return next(new UnauthorizedError('Invalid token'))
                }
                if(!decoded) return next(new ForbiddenError('Not enough rights'));
                
                userData.organizer_id = decoded.id

              });

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