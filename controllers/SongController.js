const Song = require('../models/song.model')

class SongController {
    async getAll (req, res, next) {
        let songs = []
        try {
            songs = await Song.find({})
            res.json({data: songs})
        } catch (error) {
            res.json({data: null})
        }

    }

    async getOne (req, res, next) {
        const songID = req.params.id
        let song = {}
        try {
            song = await Song.findById(songID)
            res.json({data: song})
        } catch (error) {
            res.json({data: null})
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

            res.json({data : true})
        } catch (error) {
            res.json({data : false})

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

            res.json({data : true})
        } catch (error) {
            res.json({data : false})

        }


    }

    async deleteOne (req, res, next) {
        const songID = req.params.id

        try {
            await Song.findByIdAndDelete(songID)
            res.json({data: true})
        } catch (error) {
            res.json({data: false})
        }
    }

}

module.exports = new SongController()