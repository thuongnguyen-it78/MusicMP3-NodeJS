const Album = require('../models/album.model')
const Song = require('../models/song.model')

class AlbumController {
    async getOne(req, res, next) {
        const { albumID } = req.body
        const id = req.params.id
        const album = await Album.findById(albumID)
        const length = album.listSongs.length
        if(length === 0) return res.status(200).json({flag: true, data: []})
        let listSongs = []

        try {

            listSongs = await Song.find({_id: { $in : album.listSongs} })
            
            res.status(200).json({flag: true, data: listSongs})
        
        } catch (error) {
            res.status(500).json({flag: false, data: []})
        }

    }
}

module.exports = new AlbumController()