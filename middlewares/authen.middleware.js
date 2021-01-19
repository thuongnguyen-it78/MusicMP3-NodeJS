require('dotenv').config()
const jwt = require('jsonwebtoken')

const { generateAccessToken } = require('../commons/common.js')
const User = require('../models/user.model')

// generate một token
async function getToken(req, res, next) {
    // nhận vào userID từ middware trước
    const userID = req.userID

    // tạo một token với payload là userID
    const token = generateAccessToken(userID)
    res.json({flag: true, data: {id: userID, token: token}})
}

// check token valid
async function validateToken(req, res, next) {
    
    // kiểm tra nếu nó là login hoặc sign thì cho qua
    if(!req.originalUrl.indexOf('/auth/login') ||
     !req.originalUrl.indexOf('/auth/signup') ||
     !req.originalUrl.indexOf('/user/forgot')) {
        next()
        return
     }
            
    
    
    // lấy token từ headers
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    // nếu không có token thì trả về lỗi
    if (token == null) return res.status(403).json({flag: false, status: "Token is empty"})

    // verify token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

        // nếu token không hợp lệ thì trả về lỗi
        if (err) return res.status(403).json({flag: false, status: "Token Valid"})

        // truyền biến userID tới request tiếp theo
        req.userID = user.userID
        next()
      })
}

// verify a user
async function verifyUser(req, res, next) {
    
    // kiểm tra nếu nó là login hoặc sign thì cho qua
    if(!req.originalUrl.indexOf('/auth/login') ||
     !req.originalUrl.indexOf('/auth/signup') ||
     !req.originalUrl.indexOf('/user/forgot')) {
        next()
        return
     }
    
    try {
        // từ thằng userID query ra thằng user
        const user = await User.findById(req.userID)

        // truyền biến user tới request tiếp
        req.user = user
        next()
    } catch {
        res.json({flag: false, status: "Server error"})
    }

}

module.exports = {
    getToken,
    validateToken,
    verifyUser
}





  