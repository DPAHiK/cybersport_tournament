const MatchService = require('../services/match')
const EngagedTeamService = require('../services/engagedTeam')
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
            const matchData = req.body;
            const matchId = req.params.matchId;

            const result = await MatchService.update(matchId, matchData)
            if(!result[0]) return next(new NotFoundError('Match with ID ' + matchId + ' not found')) 

            const match = await MatchService.findById(matchId)
            console.log(match)
            if(matchData.is_team1_winner || matchData.is_team1_winner === false){
                if(matchData.is_team1_winner === true){
                    const team2 = await EngagedTeamService.findByTournamentAndTeamId(match.tournament_id, match.team2_id)

                    await EngagedTeamService.update(team2.id, {tournament_id: team2.tournament_id, team_id: team2.team_id, team_grid_status: team2.team_grid_status - 1})
                }
                else {
                    const team1 = await EngagedTeamService.findByTournamentAndTeamId(match.tournament_id, match.team1_id)

                    await EngagedTeamService.update(team1.id, {tournament_id: team1.tournament_id, team_id: team1.team_id, team_grid_status: team1.team_grid_status - 1})
                }
            }

            
            // 
            // const tournamentMatches = MatchService.findByTournamentId(match.tournament_id)

            // for(let i = 0; i < tournamentMatches.length; i++){
            //     if(!tournamentMatches[i].is_team1_winner) return res.json(result)
            // }
            
            // const highGridMatches = 
            // for (let i = 0; i < tournamentMatches.length; i++){
            //     let newMatch = {tournament_id: match.tournament_id, start_date: match.start_date, end_date: match.end_date, team1_id: acceptedQuereis[i].team_id, team2_id: null}
            //     if(i + 1 < acceptedQuereis.length) match.team2_id = acceptedQuereis[i + 1].team_id

            //     MatchService.create(match)                
            // }

            return res.json(result)
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