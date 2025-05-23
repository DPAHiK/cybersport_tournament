const express = require('express')

const userRouter = require('./user')
const teamRouter = require('./team')
const tournamentRouter = require('./tournament')
const errorHandler = require('../middleware/errorHandler')
const authRouter = require('./auth')
const matchRouter = require('./match')

const router = express.Router()

router.use("/user", userRouter)
router.use("/team", teamRouter)
router.use("/tournament", tournamentRouter)
router.use(matchRouter)
router.use(authRouter)
router.use(errorHandler)

module.exports = router
