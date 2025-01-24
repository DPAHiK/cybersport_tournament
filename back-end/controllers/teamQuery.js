const TeamQueryService = require('../services/teamQuery')
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

class TeamQueryController{
    async list(req, res, next){
        try{
            res.json(await TeamQueryService.list())
        }
        catch(err){
            return next(err)
        }
    }

    async findById(req, res, next){
        try{
            const queryId = req.params.queryId;

            const result = await TeamQueryService.findById(queryId)
            if(result) return res.json(result)

            return next(new NotFoundError('Team queries with ID ' + queryId + ' not found'))
        }
        catch(err){
            return next(err)
        }
    }

    async findByTeamId(req, res, next){
        try{
            const teamId = req.params.teamId;

            const result = await TeamQueryService.findByTeamId(teamId)
            if(result.length) return res.json(result)

            return next(new NotFoundError('Team queries from team with ID ' + teamId + ' not found'))
        }
        catch(err){
            return next(err)
        }
    }

    async findByTournamentId(req, res, next){
        try{
            const tournamentId = req.params.tournamentId;

            const result = await TeamQueryService.findByTournamentId(tournamentId)
            if(result.length) return res.json(result)

            return next(new NotFoundError('Team queries on tournament with ID ' + tournamentId + ' not found'))
        }
        catch(err){
            return next(err)
        }
    }

    async getQueryTeams(req, res, next){
        try{
            const tournamentId = req.params.tournamentId;

            const result = await TeamQueryService.findQueryTeamsByTournamentId(tournamentId)
            if(result.length) return res.json(result)

            return next(new NotFoundError('Teams applied queries on tournament with ID ' + tournamentId + ' not found'))
        }
        catch(err){
            return next(err)
        }
    }


    async create(req, res, next){
        try{
            const userData = req.body;
            
            const check = await TeamQueryService.findByTournamentAndTeamId(userData.tournament_id, userData.team_id)

            if(check) return next(new ConflictError("Query from team with id " + userData.team_id + " for tournament with id " + userData.tournament_id + " already sent"))

            res.json(await TeamQueryService.create(userData))
        }
        catch(err){
            return next(err)
        }
    }

    async update(req, res, next){
        try{
            const teamQueryData = req.body;
            const teamQueryId = req.params.queryId;

            const result = await TeamQueryService.update(teamQueryId, teamQueryData)
            if(result[0]) return res.json(result)

            return next(new NotFoundError('Team query with ID ' + teamQueryId + ' not found'))
        }
        catch(err){
            return next(err)
        }       
    }

    async delete(req, res, next){
        try{
            const queryId = req.params.queryId;

            const result = await TeamQueryService.delete(queryId)
            if(result) return res.json(result)

            return next(new NotFoundError('Team query with ID ' + queryId + ' not found'))
        }
        catch(err){
            return next(err)
        }          
    }
}

module.exports = new TeamQueryController()