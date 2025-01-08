const User = require('../models/user')
const TeamMember = require('../models/teamMember')
const sequelize = require('../database/sequelize');
const { Sequelize } = require('sequelize');

class TeamMemberRepository{
    findByTeamId(teamId){
        return sequelize.query(`
            SELECT users.id, users.name
            FROM users, team_members
            WHERE team_members.team_id = ` + teamId +` AND team_members.user_id = users.id
            `,{
                type: Sequelize.QueryTypes.SELECT
            })
    }

    findByUserId(userId){
        return TeamMember.findOne({where: {user_id: userId}})
    }

    async create(teamMemberData){
        let teamMember = null;

        try{
            teamMember = await TeamMember.create(teamMemberData);
        }
        catch(err){
            throw new Error('Failed to create TeamMember');
        }

        return teamMember;
    }

    async delete(teamMemberId){
        return await TeamMember.destroy({where: {id: teamMemberId}})
    }

}

module.exports = new TeamMemberRepository()