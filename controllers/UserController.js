const User = require('../models/user.model')
const Mail = require('../commons/Mail')
const shortid = require('shortid')

const { generatePass } = require('../commons/common')

class UserController {

    async forgotPass(req, res, next) {
        const { email } = req.body

        // 1. check exists of user
        const user = await User.findOne({email})
        // 2. not exists
        if(!user) {
            res.status(401).json({flag: false, status: "Wrong email"})
            return
        }

        const shortPass = shortid.generate()

        user.password = generatePass(shortPass)


        try {
            Mail.sendMail(email, user.fullname, shortPass)
            await user.save()
            res.status(200).json({flag: true})
             
        } catch (error) {
            res.status(500).json({flag: false, status: "Server error"})
        }



    }

    async changePass(req, res, next) {

        const { newPass, oldPass } = req.body

        const user = req.user

        if(newPass === oldPass) 
            return res.status(400).json({flag: false, status: "newPass is not equal oldPass"})

        if(user.password !== generatePass(oldPass)) 
            return res.status(400).json({flag: false, status: "oldPass is not equal present pass"})
        
        user.password = generatePass(newPass)

        try {
            await user.save()   
            res.status(200).json({flag: true})
        } catch (error) {
            res.status(500).json({flag: false, status: "Server error"})
        }
        

    }

    async verifyUser(req, res, next) {
        
    }

    // get user by id
    async getProfileById(req, res, next) {
        const { userID }  = req.query
        try {
            const user = await User.findById(userID)
            res.status(200).json({flag: true, data: user})

        } catch (error) {
            res.status(500).json({flag: false, data: [], status: "Server error"})

        }

    }

    // get all user
    async getAll(req, res, next) {
        try {
            const users = await User.find({})
            res.status(200).json({flag: true, data: users})
        } catch (e) {
            res.status(500).json({flag: false, data : [], status: "Server error"})
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

        const userExists = await User.findOne({email: email})

        if(userExists) return res.status(403).json({flag : false, status: "email already exists"})

        let user = new User()

        user.fullname = fullname
        user.email = email
        user.password = generatePass(password) 
        user.gender = gender

        try {
            await user.save()
            res.status(200).json({flag : true})
        } catch (e) {
            res.status(500).json({flag : false, status: "Server error"})
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
            res.status(500).json({flag : false, status: "Server error"})
        }
    
        
    }
    
    // delete user by id
    async deleteOne(req, res, next) {
        const idParams = req.params.id

        try {
            await User.findByIdAndDelete(idParams)
            res.status(200).json({flag : true})
        } catch (e) {
            res.status(500).json({flag : false, status: "Server error"})
        }
        
    }

}

module.exports = new UserController()