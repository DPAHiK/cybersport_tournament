const MatchService = require('../services/match')
const EngagedTeamService = require('../services/engagedTeam')
const NotFoundError = require('../errors/NotFoundError')
const TournamentResultService = require('../services/tournamentResult')

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
            const match = await MatchService.findById(matchId)
            const isResult = match.is_team1_winner
            

            const result = await MatchService.update(matchId, matchData)
            if(!result[0]) return next(new NotFoundError('Match with ID ' + matchId + ' not found')) 

            
            if((matchData.is_team1_winner || matchData.is_team1_winner === false) && !isResult){
                if(matchData.is_team1_winner === true){
                    const team2 = await EngagedTeamService.findByTournamentAndTeamId(match.tournament_id, match.team2_id)

                    await EngagedTeamService.update(team2.id, {tournament_id: team2.tournament_id, team_id: team2.team_id, team_grid_status: team2.team_grid_status - 1})
                }
                else {
                    const team1 = await EngagedTeamService.findByTournamentAndTeamId(match.tournament_id, match.team1_id)

                    await EngagedTeamService.update(team1.id, {tournament_id: team1.tournament_id, team_id: team1.team_id, team_grid_status: team1.team_grid_status - 1})
                }
            }

            
            const tournamentMatches = await MatchService.findByTournamentId(match.tournament_id)
            


            for(let i = 0; i < tournamentMatches.length; i++){
                if(!tournamentMatches[i].is_team1_winner && tournamentMatches[i].is_team1_winner !== false) return res.json(result)
            }
            
            const tournamentTeams = await EngagedTeamService.findTeamsByTournamentId(match.tournament_id)
            const highGridTeams = tournamentTeams.filter(team => team.team_grid_status == 2)
            const lowGridTeams = tournamentTeams.filter(team => team.team_grid_status == 1)

            //console.log(tournamentTeams)

            // console.log(highGridTeams)
            
            // console.log(lowGridTeams)
            const newStartDate = new Date(match.start_date)
            const newEndDate = new Date(match.start_date)
            newStartDate.setDate(newStartDate.getDate() + 1)
            newEndDate.setDate(newEndDate.getDate() + 2)
            //console.log(newStartDate)

            if (highGridTeams.length + lowGridTeams.length > 2){
                for (let i = 0; i < highGridTeams.length; i += 2){
                    let newMatch = {
                        tournament_id: match.tournament_id,
                        grid_level: 2, 
                        start_date: newStartDate,    
                        end_date: newEndDate, 
                        team1_id: highGridTeams[i] ? highGridTeams[i].team_id : null, 
                        team2_id: highGridTeams[i + 1] ? highGridTeams[i + 1].team_id : null}
                    
                    MatchService.create(newMatch)
                }

                for (let i = 0; i < lowGridTeams.length; i += 2){
                    let newMatch = {
                        tournament_id: match.tournament_id,
                        grid_level: 1,  
                        start_date: newStartDate,   
                        end_date: newEndDate, 
                        team1_id: lowGridTeams[i] ? lowGridTeams[i].team_id : null, 
                        team2_id: lowGridTeams[i + 1] ? lowGridTeams[i + 1].team_id : null}

                    MatchService.create(newMatch)
                }
            }
            else if (highGridTeams.length + lowGridTeams.length == 2){
                highGridTeams.push(lowGridTeams[0])
                MatchService.create({
                    tournament_id: match.tournament_id, 
                    grid_level: 0, 
                    start_date: newStartDate,  
                    end_date: newEndDate, 
                    team1_id: highGridTeams[0] ? highGridTeams[0].team_id : null, 
                    team2_id: highGridTeams[1] ? highGridTeams[1].team_id : null
                })
            }

            else if (highGridTeams.length + lowGridTeams.length == 1){
                console.log(highGridTeams[0] ? highGridTeams[0].team_id : lowGridTeams[0].team_id)
                TournamentResultService.create({tournament_id: match.tournament_id, team_id: highGridTeams[0] ? highGridTeams[0].team_id : lowGridTeams[0].team_id, place: 1})
            }


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