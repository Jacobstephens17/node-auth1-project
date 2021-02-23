const express = require('express')
const router = express.Router()
const User = require('../users/user-model')
const bcrypt = require("bcryptjs")
const mw = require('../../middleware/middleware')


router.post('/register', mw.checkPayload, mw.checkUnique, async (req,res) => {
    try{
        const hash = bcrypt.hashSync(req.body.password, 10) //2^10 
        const newUser = await User.add({username: req.body.username, password:hash})
        res.status(201).json(newUser)
    }catch(e){
        res.status(500).json({message: e.message})
    }
})


router.post('/login', mw.checkPayload, mw.checkUserExists, (req,res) => {
    try{
        const verified = bcrypt.compareSync(req.body.password, req.userData.password)
        if(verified){
            req.session.user = req.userData
            res.json(`Welcome back ${req.userData.username}`)
        }else{
            res.status(401).json("Username or password are incorrect")
        }
    }catch(e){
        res.status(500).json({message: e.message})
    }
})


router.get('/logout', (req,res) => {
    if(req.session){
        req.session.destroy(err =>{
            if(err){
                res.json("Can't log out")
            }else{
                res.json("You have been logged out ")
            }
        })
    }else{
        res.json("No session")
    }
})


module.exports = router