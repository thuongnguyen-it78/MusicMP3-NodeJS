const Album = require('../models/album.model')
const Song = require('../models/song.model')

class AlbumController {
    
    async getOne(req, res, next) {
        const id = req.params.id
        const { albumID } = req.query

        const params = albumID || req.params.id
        const album = await Album.findById(params)
        const length = album.listSongs.length
        if(length === 0) return res.status(200).json({flag: true, data: [], status: 'Album of user is empty'})
        let listSongs = []

        try {

            listSongs = await Song.find({_id: { $in : album.listSongs} })
            
            res.status(200).json({flag: true, data: listSongs})
        
        } catch (error) {
            res.status(500).json({flag: false, data: [], status: 'Server error'})
        }

    }

    async getAll(req, res, next) {
        try {
            const album = await Album.find({})
            
            res.status(200).json({flag: true, data: album})
        
        } catch (error) {
            res.status(500).json({flag: false, data: [], status: 'Server error'})
        }

    }
}

module.exports = new AlbumController()