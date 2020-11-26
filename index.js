require('dotenv').config()
const express = require('express')
const expressLayout = require('express-ejs-layouts')
const methodOverride = require('method-override')
const morgan = require('morgan')
const path = require('path')



const route = require('./routes/index.route')
const db = require('./config/db/index');

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')) 
app.set('layout', 'layouts/layout')
app.use(expressLayout)
app.use(express.static('public'))
app.use(morgan('combined'));

app.use(express.urlencoded({extended: true}))
app.use(express.json())

db.connect();

 

route(app)


app.listen(process.env.PORT || 5000, () => console.log("running"))