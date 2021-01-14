const mongoose = require('mongoose')

const songSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        },
        image: {
            type: String,
        },
        views: {
            type: Number,
            default: 0
        },
        listArtists: {
            type: Array,
            default: []
        },
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('Song', songSchema, 'songs')
