const User = require('../models/user.model')

class UserController {

    async getAll(req, res, next) {
        const users = await User.find({})
        res.json({users})
    
    }
    
    async getOne(req, res, next) {
        const idParams = req.params.id
        const user = await User.find( {id: idParams} )
        res.json({user})
        
    }
    
    async postOne(req, res, next) {

        const { fullname, email, password, gender } = req.body

        let user = new User()

        user.fullname = fullname
        user.email = email
        user.password = password
        user.gender = gender

        try {
            await user.save()
            res.status(200).json({success: true})
        } catch (e) {
            res.status(500).json({success: false})
        }
    
    
        
    }
    
    async patchOne(req, res, next) {
        const idParams = req.params.id
    
        
    }
    
    async deleteOne(req, res, next) {
        const idParams = req.params.id
    
        
    }

}

module.exports = new UserController()