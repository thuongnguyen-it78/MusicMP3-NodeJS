const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            default: 'mickey.png'
        },
        gender: {
            type: Boolean,
            required: true
        },
        role: {
            type: Number,
            default: 1
        },
        active: {
            type: String,
            default: true
        },
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('User', userSchema)
