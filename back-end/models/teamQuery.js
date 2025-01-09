const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const TeamQuery = sequelize.define('team_queries', {
    
        
        team_id:{
            type: Sequelize.BIGINT,
            allowNull: false
        },
        
        sending_date:{
            type: Sequelize.DATE
        },

        description:{
            type: Sequelize.STRING,
            allowNull: false
        },

        status:{
            type: Sequelize.BOOLEAN
        }
            
        });


module.exports = TeamQuery;