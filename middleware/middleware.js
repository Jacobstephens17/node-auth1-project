const express = require("express")
const User = require("../api/users/user-model")


const checkPayload = (req,res,next) => {
    if(!req.body.username || !req.body.password){
        res.status(401).json("Username or password missing")
    }else{
        next()
    }
}


const checkUnique = async (req,res,next) => {
    try{
        const rows = await User.findBy({username: req.body.username})
        if(!rows.length){
            next()
        }else{
            res.status(401).json("Username already exists")
        }
    }catch(e){
        res.status(500).json(`Server error: ${e}`)
    }
}


const checkUserExists = async (req,res,next) => {
    try{
        const rows = await User.findBy({username: req.body.username})
        if(rows.length){
            req.userData = rows[0]
            next()
        }else{
            res.status(401).json("Login error, check credentials")
        }
    }catch(e){
        res.status(500).json(`Server error: ${e}`)
    }
}


module.exports = {
    checkPayload, 
    checkUnique,
    checkUserExists
}