const albumRoute = require('./album.route')
const artistRoute = require('./artist.route')
const authRoute = require('./auth.route')
const songRoute = require('./song.route')
const userRoute = require('./user.route')
const meRoute = require('./me.route')
const siteRoute = require('./site.route')


function route(app) {
    app.use('/album', albumRoute)
    app.use('/artist', artistRoute)
    app.use('/auth', authRoute)
    app.use('/song', songRoute)
    app.use('/user', userRoute)
    app.use('/me', meRoute)
    app.use('/', siteRoute)
}

module.exports = route