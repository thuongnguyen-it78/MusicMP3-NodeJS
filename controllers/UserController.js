const User = require('../models/user.model')
const Mail = require('../commons/Mail')
const shortid = require('shortid')

class UserController {

    async forgotPass(req, res, next) {
        const { email } = req.body

        // 1. check exists of user
        const user = await User.findOne({email})
        // 2. not exists
        if(!user) {
            res.status(401).json({flag: false})
            return
        }

        user.password = shortid.generate()


        try {
            Mail.sendMail(email, user.fullname, user.password)
            await user.save()
            res.status(200).json({flag: true})
             
        } catch (error) {
            res.status(500).json({flag: false})
        }



    }

    async changePass(req, res, next) {

        const { newPass, oldPass } = req.body

        const user = req.user

        if(newPass === oldPass) 
            return res.status(400).json({flag: 'ds'})

        if(user.password !== oldPass) 
            return res.status(400).json({flag: 'd'})
        console.log(user.password, oldPass)
        
        user.password = newPass

        try {
            await user.save()   
            res.status(200).json({flag: true})
        } catch (error) {
            res.status(500).json({flag: false})
        }
        

    }

    async verifyUser(req, res, next) {
        
    }

    // get user by id
    async getProfileById(req, res, next) {
        const { userID }  = req.body
        try {
            const user = await User.findById(userID)
            res.status(200).json({flag: true, data: user})

        } catch (error) {
            res.status(500).json({flag: false, data: []})

        }

    }

    // get all user
    async getAll(req, res, next) {
        try {
            const users = await User.find({})
            res.status(200).json({flag: true, data: users})
        } catch (e) {
            res.status(500).json({flag: false, data : []})
        }  
    
    }
    
    // get user by id
    async getOne(req, res, next) {
        const idParams = req.params.id

        try {
            const user = await User.findById(idParams)
            res.status(200).json({flag: true, data: user})
        } catch (e) {
            res.status(500).json({flag: false, data : []})
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
            res.status(200).json({flag : true})
        } catch (e) {
            res.status(500).json({flag : false})
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
            res.status(200).json({flag : true})
        } catch (e) {
            res.status(500).json({flag : false})
        }
    
        
    }
    
    // delete user by id
    async deleteOne(req, res, next) {
        const idParams = req.params.id

        try {
            await User.findByIdAndDelete(idParams)
            res.status(200).json({flag : true})
        } catch (e) {
            res.status(500).json({flag : false})
        }
        
    }

}

module.exports = new UserController()