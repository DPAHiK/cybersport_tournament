const TeamMember = require('../models/teamMember')

class TeamMemberRepository{
    findByTeamId(teamId){
        return TeamMember.findAll({where: {team_id: teamId}});
    }

    findByTeamAndUserId(teamId, userId){
        return TeamMember.findOne({where: {team_id: teamId, user_id: userId}});
    }

    findByUserId(userId){
        return TeamMember.findOne({where: {user_id: userId}})
    }

    findById(id){
        return TeamMember.findOne({where: {id: id}});
    }

    list(){
        return TeamMember.findAll();
    }

    async create(teamMemberData){
        let teamMember = null;

        try{
            teamMember = await TeamMember.create(teamMemberData);
        }
        catch(err){
            console.log(err)
            throw new Error('Failed to create TeamMember');
        }

        return teamMember;
    }

    async update(id, teamMemberData){
        return await TeamMember.update(teamMemberData, {where: {id: id}})
    } 

    async deleteByUserId(userId){
        return await TeamMember.destroy({where: {user_id: userId}})
    }

    async delete(teamMemberId){
        return await TeamMember.destroy({where: {id: teamMemberId}})
    }

}

module.exports = new TeamMemberRepository()