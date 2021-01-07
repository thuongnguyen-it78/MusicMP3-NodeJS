require('dotenv').config()
const jwt = require('jsonwebtoken')

function generateAccessToken(user_id) {
    return jwt.sign(user_id, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20000s' })
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = {
    generateAccessToken,
    validateEmail
}