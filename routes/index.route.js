const siteRoute = require('./site.route')
const productRoute = require('./product.route')

function route(app) {
    app.use('products', productRoute)
    app.use('/', siteRoute)
}

module.exports = route