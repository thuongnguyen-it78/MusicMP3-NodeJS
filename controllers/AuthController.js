const User = require('../models/user.model')
const { validateEmail } = require('../commons/common.js')

class AuthController {

    async logIn(req, res, next) {

        const { email, password } = req.body

        const user = User.find({email})

         // 1. kiểm tra email có tồn tại không?
        if (!user) return res.json({errros: 'Email không tồn tại'})

        // 2. kiểm tra password có đúng không?
        if (user.password !== password) res.json({errros: 'Password không chính xác'})

        // 3. cho nó đến middleware tiếp theo
        next()

    }

    async signUp(req, res, next) {

        const { fullname, email, password, gender } = req.body

        // khởi tạo một mảng error rỗng
        const errors = []
        
        // 1. kiểm tra tính hợp lệ của dữ liệu gửi lên
        if (fullname.trim().length === 0) errors.push('Tên không hợp lệ')
        if (!validateEmail(email)) errors.push('Email không hợp lệ')
        if (password.trim().length < 6) errors.push('Mật khẩu không hợp lệ')
        if (typeof gender !== 'boolean') errors.push('Giới tính không hợp lệ')

        // trường hợp không hợp lệ
        if (errors.length !== 0) res.json({errors})

        // trường hợp hợp lệ
        
        // 2. lưu vào database
        const user = new User()

        user.fullname = fullname
        user.email = email
        user.password = password
        user.gender = gender

        try {
            await user.save()
            next()
        } catch(e) {
            res.json({error: 'Lưu user vào db thất bại !'})
        }
     
    }


}

module.exports = new AuthController()