const TournamentService = require('../services/tournament')
const TeamQueryService = require('../services/teamQuery')
const EngagedTeamService = require('../services/engagedTeam')
const MatchService = require('../services/match')
const NotFoundError = require('../errors/NotFoundError')
const jwt = require('jsonwebtoken')
const UnauthorizedError = require('../errors/UnauthorizedError')
const ForbiddenError = require('../errors/ForbiddenError')
const ConflictError = require('../errors/ConflictError')
const BadRequestError = require('../errors/BadRequestError')

class TournamentController{

    async generateGrid(req, res, next){
        try{
            const tournamentId = req.params.tournamentId;

            const check = await TournamentService.findById(tournamentId)
            if(!check) return next(new NotFoundError('Tournament with ID ' + tournamentId + ' not found'))
            if(check.is_began) return next(new ConflictError('Tournament with ID ' + tournamentId + ' already started'))
            TournamentService.update(check.id, {title: check.title, start_date: check.start_date, end_date: check.end_date, organizer_id: check.organizer_id, is_began: true})

            const acceptedQuereis = await TeamQueryService.findAcceptedByTournamentId(tournamentId)

            if(acceptedQuereis.length < 2 || acceptedQuereis.length > 8) return next(new BadRequestError('Too many or too few accepted queries to begin tournament'))

            acceptedQuereis.forEach((item) => {EngagedTeamService.create
                ({tournament_id: tournamentId, team_id: item.team_id, team_grid_status: 2})})

            let startDate = new Date(check.start_date)
            let endDate = new Date(check.start_date)
            startDate.setDate(startDate.getDate() + 1)
            endDate.setDate(endDate.getDate() + 2)

            for (let i = 0; i < acceptedQuereis.length; i += 2){
                let match = {
                    tournament_id: tournamentId,
                    grid_level: 2, 
                    start_date: startDate,
                    end_date: endDate,  
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
            const tournamentId = req.params.tournamentId;

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
            const tournamentId = req.params.tournamentId;

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
            const tournamentId = req.params.tournamentId;

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