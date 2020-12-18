const { findByIdAndDelete } = require('../models/user.model')
const User = require('../models/user.model')

class UserController {

    // get all user
    async getAll(req, res, next) {
        const users = await User.find({})
        res.json({users})
    
    }
    
    // get user by id
    async getOne(req, res, next) {
        const idParams = req.params.id
        const user = await User.find( {id: idParams} )
        res.json({user})
        
    }
    
    // create user
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
    
    // update user
    async patchOne(req, res, next) {
        const { id, fullname, gender } = req.body

        let user = await User.find({ id: id})

        user.fullname = fullname
        user.gender = gender

        try {
            await user.save()
            res.status(200).json({success: true})
        } catch (e) {
            res.status(500).json({success: false})
        }
    
        
    }
    
    // delete user by id
    async deleteOne(req, res, next) {
        const idParams = req.params.id
        console.log(idParams);

        try {
            await User.findByIdAndDelete(idParams)
            res.status(200).json({success: true})
        } catch (e) {
            res.status(500).json({e:"abc"})
        }
        
    }

}

module.exports = new UserController()