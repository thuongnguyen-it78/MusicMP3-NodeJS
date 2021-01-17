const AuthController = require("../controllers/AuthController")

async function authorAdmin (req, res, next) {
    const role = req.user.role
    if(role < 1) return res.status(404).json({flag: false, status: "You are not allow to access this"})
    next()
}

module.exports = { authorAdmin }