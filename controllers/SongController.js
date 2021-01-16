const Song = require('../models/song.model')

class SongController {
    async getAll (req, res, next) {
        let songs = []
        try {
            songs = await Song.find({})
            res.status(200).json({flag: true, data: songs})
        } catch (error) {
            res.status(500).json({flag: false, data: []})
        }

    }

    async getOne (req, res, next) {
        const songID = req.params.id
        let song = {}
        try {
            song = await Song.findById(songID)
            res.status(200).json({flag: true, data: song})
        } catch (error) {
            res.status(500).json({flag: false, data: []})
        }

    }

    async postOne (req, res, next) {
        const {title, genre, path, image, listArtists} = req.body
        let song
        try {
            song = new Song()

            song.title = title
            song.genre = genre
            song.path = path
            song.image = image
            song.listArtists = listArtists

            await song.save()

            res.status(200).json({flag: true})
        } catch (error) {
            res.status(500).json({flag: false})

        }

    }

    async putOne (req, res, next) {
        const songID = req.params.id
        const { title, genre, path, image, listArtists } = req.body
        let song
        try {
            song = await Song.findById(songID)
            song.title = title
            song.genre = genre
            song.path = path
            song.image = image
            song.listArtists = listArtists

            await song.save()

            res.status(200).json({flag: true})
        } catch (error) {
            res.status(500).json({flag: false})

        }


    }

    async deleteOne (req, res, next) {
        const songID = req.params.id

        try {
            await Song.findByIdAndDelete(songID)
            res.status(200).json({flag: true})
        } catch (error) {
            res.status(500).json({flag: false})
        }
    }

}

module.exports = new SongController()