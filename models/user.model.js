const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
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
            required: true
        },
        active: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('User', articleSchema)
