const Sequelize = require('sequelize');
const sequelize = new Sequelize('cybersport_tournament', 'postgres', 'user', {
	dialect: 'postgresql',
	define: {
		timestamps: false
	}
	//host: 'localhost',
	//port: '5432'
});



module.exports = sequelize;
