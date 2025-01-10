const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const Match= sequelize.define('matches', {
			
	tournament_id:{
		type: Sequelize.BIGINT,
		allowNull: false
	},
	
	is_team1_winner:{
		type: Sequelize.BOOLEAN
	},

	start_date:{
		type: Sequelize.DATE,
		allowNull: false
	},

	end_date:{
		type: Sequelize.DATE
	},

	team1_id:{
		type: Sequelize.BIGINT,
		allowNull: false	
	},

	team2_id:{
		type: Sequelize.BIGINT
	}
});

module.exports = Match;