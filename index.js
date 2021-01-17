require('dotenv').config()
const express = require('express')
const methodOverride = require('method-override')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')

const route = require('./routes/index.route')
const db = require('./config/db/index');
const authMiddleware = require('./middlewares/authen.middleware')

const app = express()

app.use(express.static('public'))
app.use(morgan('combined'));

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Allow all requests from all domains & localhost
app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)
    
    next();
});

app.use(cors())


db.connect();

// validate token and verify user
app.use(authMiddleware.validateToken, authMiddleware.verifyUser);

// fake data to test
const User = require('./models/user.model')

// app.use(async (req, res, next) => {
//     try {
//         const user = await User.findById('5ffbe15bf74bd3af9e4972b5')
//         req.user = user
//         next()
//     } catch (error) {
//         res.json({data: 'Server is error'})
//     }

// })

route(app)


app.listen(process.env.PORT || 5000, () => console.log("running"))