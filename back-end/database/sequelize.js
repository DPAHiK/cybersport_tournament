const Sequelize = require('sequelize');
const sequelize = new Sequelize('cybersport_tournament', 'PblBA', 'postgres', {
	dialect: 'postgresql',
	define: {
		timestamps: false
	}
	//host: 'localhost',
	//port: '5432'
});



module.exports = sequelize;
