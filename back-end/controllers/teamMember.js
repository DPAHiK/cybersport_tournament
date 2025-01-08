const TeamMemberService = require('../services/teamMember')

class TeamMemberController{

    async findByTeamId(req, res, next){
        try{
            const teamId = req.params.teamId;

            res.json(await TeamMemberService.findByTeamId(teamId))
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async create(req, res, next){
        try{
            const userData = req.body;

            res.json(await TeamMemberService.create(userData))
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
            const userId = req.params.userId;

            res.json(await TeamMemberService.delete(userId))
        }
        catch(err){
            console.log(err)
            return next(err)
        }          
    }
}

module.exports = new TeamMemberController()