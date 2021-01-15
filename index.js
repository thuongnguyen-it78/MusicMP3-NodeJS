require('dotenv').config()
const express = require('express')
const methodOverride = require('method-override')
const morgan = require('morgan')
const path = require('path')

const route = require('./routes/index.route')
const db = require('./config/db/index');
const authMiddleware = require('./middlewares/auth.middlewares')

const app = express()

app.use(express.static('public'))
app.use(morgan('combined'));

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())


db.connect();

// validate token and verify user
// app.use(authMiddleware.validateToken, authMiddleware.verifyUser);

// fake data to test
const User = require('./models/user.model')

app.use(async (req, res, next) => {
    try {
        const user = await User.findById('5ffbe15bf74bd3af9e4972b5')
        req.user = user
        console.log(user);
        next()
    } catch (error) {
        res.json({data: 'Server is error'})
    }



})

route(app)


app.listen(process.env.PORT || 5000, () => console.log("running"))