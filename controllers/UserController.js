const User = require('../models/user.model')
const Mail = require('../commons/Mail')
const shortid = require('shortid')

class UserController {

    async forgotPass(req, res, next) {
        const { email } = req.body

        // 1. check exists of user
        const user = User.find({email})
        if(!user) res.json({data: false})

        user.password = shortid.generate()


        try {
            Mail.sendMail(email, user.fullname, user.password)
            await user.save()
            res.json({data: true})
             
        } catch (error) {
            res.json({data: false})
        }


        // 2. set pass

    }

    async changePass(req, res, next) {
        const { newPass, oldPass } = req.body

        const user = req.user

        if(user.password !== oldPass) {
            res.json({})
        }



    }

    async verifyUser(req, res, next) {

    }

    // get all user
    async getAll(req, res, next) {
        try {
            const users = await User.find({})
            res.json({data: users})
        } catch (e) {
            res.status(500).json({data : null})
        }  
    
    }
    
    // get user by id
    async getOne(req, res, next) {
        const idParams = req.params.id

        try {
            const user = await User.findById(idParams)
            res.json({data: user})
        } catch (e) {
            res.status(500).json({data : null})
        }  
        
    }
    
    // create user
    async postOne(req, res, next) {
        const { fullname, email, password, gender } = req.body

        let user = new User()

        user.fullname = fullname
        user.email = email
        user.password = password
        user.gender = true 

        try {
            await user.save()
            res.json({data : true})
        } catch (e) {
            res.status(500).json({data : false, body: req.body})
        }  
    }
    
    // update user
    async patchOne(req, res, next) {
        const idParams = req.params.id

        const { fullname, gender } = req.body

        let user = await User.findById(idParams)

        user.fullname = fullname
        user.gender = gender

        try {
            await user.save()
            res.status(200).json({data : true})
        } catch (e) {
            res.status(500).json({data : false})
        }
    
        
    }
    
    // delete user by id
    async deleteOne(req, res, next) {
        const idParams = req.params.id

        try {
            await User.findByIdAndDelete(idParams)
            res.status(200).json({data : true})
        } catch (e) {
            res.status(500).json({data : false})
        }
        
    }

}

module.exports = new UserController()