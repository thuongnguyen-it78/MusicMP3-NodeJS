require('dotenv').config()
const jwt = require('jsonwebtoken')

function generateAccessToken(userID) {
    return jwt.sign({userID}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2000000s' })
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = {
    generateAccessToken,
    validateEmail
}