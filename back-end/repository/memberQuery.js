const MemberQuery = require('../models/memberQuery')

class MemberQueryRepository{
    findByTeamId(teamId){
        return MemberQuery.findAll({where: {team_id: teamId}});
    }

    findByUserId(userId){
        return MemberQuery.findOne({where: {user_id: userId}})
    }

    findById(id){
        return MemberQuery.findOne({where: {id: id}});
    }

    list(){
        return MemberQuery.findAll();
    }

    async create(teamMemberData){
        let teamMember = null;

        try{
            teamMember = await MemberQuery.create(teamMemberData);
        }
        catch(err){
            console.log(err)
            throw new Error('Failed to create TeamMember');
        }

        return teamMember;
    }

    async update(id, teamMemberData){
        return await MemberQuery.update(teamMemberData, {where: {id: id}})
    } 

    async deleteByUserId(userId){
        return await MemberQuery.destroy({where: {user_id: userId}})
    }

    async delete(teamMemberId){
        return await MemberQuery.destroy({where: {id: teamMemberId}})
    }

}

module.exports = new MemberQueryRepository()