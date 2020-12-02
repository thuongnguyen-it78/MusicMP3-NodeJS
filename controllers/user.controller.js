const User = require('../models/user.model')


module.exports.getAll = async function(req, res) {
    const users = await User.find({})
    res.json({users})

}

module.exports.getOne = async function(req, res) {
    const idParams = req.params.id
    const user = await User.find( {id: idParams} )
    res.json({user})
    
}

module.exports.postOne = function(req, res) {

    
}

module.exports.patchOne = function(req, res) {
    const idParams = req.params.id

    
}

module.exports.deleteOne = function(req, res) {
    const idParams = req.params.id

    
}