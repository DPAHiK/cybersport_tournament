
const DataBase = require('./database')
const createServer = require('./utils/createServer')
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const mongoose = require("mongoose");


const app = createServer()

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0', 
      info: {
        title: 'CybersportTournament REST API', 
        version: '1.0.0', 
        description: 'Проект по  WEB/СПБД', 
      },
      servers: [
        {
          url: 'http://localhost:5000', 
        },
      ],
      
      components: {
        securitySchemes: {
          JWT: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization', 
          },
        },
      },
      security: [
        {
          JWT: [],
        },
      ],
      
    },
  
    apis: ['./routes/*.js'], 
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



async function start(){
    await DataBase.connect()

    await mongoose.connect(`mongodb://localhost:27017/cybersport_tournament_logs`);
    
    app.listen(5000, function(){
        console.log('App listening on port 5000...');
    })

}

start()

