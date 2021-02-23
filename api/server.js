const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)


const authRouter = require('./auth/auth-router')
const userRouter = require('./users/user-router')


const server = express();

const config = {
    name: 'jacob',
    secret: 'test',
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
      knex: require('./../database/connection'),
      tablename: 'sessions',
      sidfieldname: 'session_id',
      createtable: true,
      clearInterval: 1000 * 60 * 60,
    }),
  };
  

server.use(session(config))
server.use(helmet())
server.use(express.json())
server.use(cors())


server.use('/api/users', userRouter)
server.use('/api/auth', authRouter)

server.get('/', (req,res) => {
    res.json({message: 'WORKING'})
})

module.exports = server