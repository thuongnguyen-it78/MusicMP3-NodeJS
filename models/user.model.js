const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema(
    {
        id: {
            type: String,
        },
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
        gender: {
            type: String,
            required: true
        },
        role: {
            type: String,
        },
        active: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('User', articleSchema)
