const User = require('../models/user.model')
const { validateEmail, generatePass } = require('../commons/common.js')

class AuthController {

    async logIn(req, res, next) {

        // get data from params
        const { email, password } = req.body

        // get user by email
        const user = await User.findOne({email: email})

        if (!user) {
             res.status(403).json({flag: false, status: "Email doesn't exists"})
             return
        }


        if (user.password !== generatePass(password) ) {
            res.status(403).json({flag: false, status: "Wrong password"})
            return
        }
        // next middleware
        req.userID = user._id
        next()

    }


    async signUp(req, res, next) {

        const { fullname, email, password, gender } = req.body

        // declare to contain errors
        let errors = []

        if(!(fullname && email && password && gender !== 'undefined')) 
            return res.status(403).json({flag: false, status: "All field isn't allow empty"})
        
        // 1. kiểm tra tính hợp lệ của dữ liệu gửi lên
        if (fullname.trim().length === 0) errors.push('Tên không hợp lệ')
        if (!validateEmail(email)) errors.push('Email không hợp lệ')
        if (password.trim().length < 6) errors.push('Mật khẩu không hợp lệ')
        if (typeof gender !== 'boolean') errors.push('Giới tính không hợp lệ')
      
        // check email exists
        const userExists = await User.findOne({email})
        if(userExists) return res.status(403).json({flag: false, status: "Email already exists in system"})

        // trường hợp không hợp lệ
        if (errors.length !== 0) {
            res.status(403).json({flag: false, status: "Field error"})
            return
        }

        // trường hợp hợp lệ
        
        // 2. lưu vào database
        const user = new User()

        user.fullname = fullname
        user.email = email
        user.password = generatePass(password) 
        user.gender = gender

        try {
            await user.save()
            req.userID = user._id
            next()
        } catch(e) {
            res.status(500).json({flag: false, status: "Server error"})
        }
     
    }

}

module.exports = new AuthController()