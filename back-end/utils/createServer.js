const router = require('../routes')
const bodyParser = require("body-parser")
const express = require("express")
const cors = require('cors')

module.exports = () => {
    const app = express()
    app.use(cors({
        origin: 'http://localhost:3000', 
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
      }));
    app.use(bodyParser.json())
    app.use(router)

    return app
}