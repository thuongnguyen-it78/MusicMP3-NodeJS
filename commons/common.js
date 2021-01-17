require('dotenv').config()
const jwt = require('jsonwebtoken')
const md5 = require('md5')

function generatePass(code) {
    return md5(code)
}

function generateAccessToken(userID) {
    return jwt.sign({userID}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2000000s' })
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = {
    generateAccessToken,
    validateEmail,
    generatePass
}
