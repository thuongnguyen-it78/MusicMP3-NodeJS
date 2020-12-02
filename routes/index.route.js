const albumRoute = require('./product.route')
const artistRoute = require('./product.route')
const authRoute = require('./product.route')
const songRoute = require('./product.route')
const userRoute = require('./product.route')
const meRoute = require('./product.route')
const siteRoute = require('./site.route')



function route(app) {
    app.use('album/', albumRoute)
    app.use('artist/', artistRoute)
    app.use('auth/', authRoute)
    app.use('song/', songRoute)
    app.use('user/', userRoute)
    app.use('me/', meRoute)
    app.use('/', siteRoute)
}

module.exports = route