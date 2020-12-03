const User = require('../models/user.model')

class UserController {

    async getAll(req, res) {
        const users = await User.find({})
        res.json({users})
    
    }
    
    async getOne(req, res) {
        const idParams = req.params.id
        const user = await User.find( {id: idParams} )
        res.json({user})
        
    }
    
    async postOne(req, res) {
    
        
    }
    
    async patchOne(req, res) {
        const idParams = req.params.id
    
        
    }
    
    async deleteOne(req, res) {
        const idParams = req.params.id
    
        
    }

}

module.exports = new UserController()