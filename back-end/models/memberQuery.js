const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const MemberQuery = sequelize.define('member_queries', {
    
        
        team_id:{
            type: Sequelize.BIGINT,
            allowNull: false
        },

        user_id:{
            type: Sequelize.BIGINT,
            allowNull: false
        },
        
        sending_date:{
            type: Sequelize.DATE
        }
            
        });


module.exports = MemberQuery;