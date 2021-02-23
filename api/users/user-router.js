const router = require('express').Router()

const Users = require('./user-model')


const restricted = (req,res,next) => {
    if(req.session && req.session.user){
        next()
      }else{
        res.status(401).json("unauthorized")
      }
}


router.get('/', restricted,(req,res) => {
    Users.find('users')
        .then((users) => {
            res.status(200).json(users)
        })
        .catch((err) => {
            res.send(err.message)
        })
})


module.exports = router