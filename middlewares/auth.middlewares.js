require('dotenv').config()
const jwt = require('jsonwebtoken')

const { generateAccessToken } = require('../commons/common.js')
const User = require('../models/user.model')

// generate một token
async function getToken(req, res, next) {
    // nhận vào user_id từ middware trước
    const user_id = req.user.id

    // tạo một token với payload là user_id
    const token = generateAccessToken(user_id)
    res.json({token})
}

// check token valid
async function validateToken(req, res, next) {
    
    // lấy token từ headers
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    // nếu không có token thì trả về lỗi
    if (token == null) return res.sendStatus(401)

    // verify token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user_id) => {
        console.log(err)

        // nếu token không hợp lệ thì trả về lỗi
        if (err) return res.json({error: 'Token không hợp lệ'})

        // truyền biến user_id tới request tiếp theo
        req.user_id = user_id
        next()
      })
}

// verify a user
async function verifyUser(req, res, next) {
    try {
        // từ thằng user_id query ra thằng user
        const user = User.findById(req.user_id)

        // truyền biến user tới request tiếp
        req.user = user
        next()
    } catch {
        res.json({error: 'Server error'})
    }

}

module.exports = {
    getToken,
    validateToken,
    verifyUser
}





  