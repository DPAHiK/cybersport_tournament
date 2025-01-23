const TeamMemberService = require('../services/teamMember')
const NotFoundError = require('../errors/NotFoundError')
const UnauthorizedError = require('../errors/UnauthorizedError')
const jwt = require('jsonwebtoken')

class TeamMemberController{

    async isTeamMember(req, res, next){
        try{
            
            const token = req.headers['authorization'];
            let result
            
            await jwt.verify(token, 'secret', async (err, decoded) => {
                if (err) {
                  return next(new UnauthorizedError('Invalid token'))
                }

                result = await TeamMemberService.findByTeamAndUserId(req.params.teamId, decoded.id)
                
              });
            
            return res.json(result)
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async findByTeamId(req, res, next){
        try{
            const teamId = req.params.teamId;

            const result = await TeamMemberService.findByTeamId(teamId)
            if(result.length) return res.json(result)

            return next(new NotFoundError('Team members from team with ID ' + teamId + ' not found'))
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }
    
    async findProfilesByTeamId(req, res, next){
        try{
            const teamId = req.params.teamId;

            const result = await TeamMemberService.findProfilesByTeamId(teamId)
            if(result.length) return res.json(result)

            return next(new NotFoundError('Team members from team with ID ' + teamId + ' not found'))
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
            const userId = req.params.userId;

            const result = await TeamMemberService.deleteByUserId(userId)
            if(result) return res.json(result)

            return next(new NotFoundError('Team member with user ID ' + userId + ' not found'))
        }
        catch(err){
            console.log(err)
            return next(err)
        }          
    }
}

module.exports = new TeamMemberController()