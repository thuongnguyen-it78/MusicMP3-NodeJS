const mongoose = require('mongoose')

const songSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        listSongs: {
            type: Array,
            default: []
        },
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('Album', songSchema, 'albums')
