require('dotenv').config()
const jwt = require('jsonwebtoken')

const { generateAccessToken } = require('../commons/common.js')
const User = require('../models/user.model')




async function provideToken(req, res, next) {
    const user_id = req.user.id
    const token = generateAccessToken(user_id)
    res.json({token})
}

async function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user_id) => {
        console.log(err)
        if (err) return res.json({error: 'Token không hợp lệ'})
        req.user_id = user_id
        next()
      })
}

async function checkUser(req, res, next) {
    try {
        const user = User.findById(req.user_id)
        req.user = user
        next()
    } catch {
        res.json({error: 'Server error'})
    }

}




  