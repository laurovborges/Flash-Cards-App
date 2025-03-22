const User = require('../models/User')

const register = async (req, res) => {
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(201).json({username: user.username, token})
}

const login = async (req, res) => {
    const {username, password} = req.body

    if(!username || !password){
        return res.status(400).json({msg:'Please provide username and password'})
    }

    const user = await User.findOne({username})
    if(!user){
        return res.status(401).json({msg:'Invalid credentials'})
    }

    const isPasswordCorrect = await user.comparePasswords(password)
    if(!isPasswordCorrect) {
        return res.status(401).json({msg:'Invalid credentials'})
    }

    const token = user.createJWT()
    res.status(200).json({username: user.username, token})
}

module.exports = {register, login}