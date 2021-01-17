const Song = require('../models/song.model')
const Album = require('../models/album.model')

class SiteController {
    async home (req, res) {
    
        try {
            const list = await Album.find({});    
            const index = list.length / 3
    
            // make for you
            const makeForYou = {
                "title": "Make For You", 
                "playlists": list.slice(1 * index)
            }
    
            // relax
            const justRelax = {
                "title": "Just Relax", 
                "playlists": list.slice(2 * index)
            }
    
    
            // top albums
            const topMusic = {
                "title": "Top Music", 
                "playlists": list.slice(3 * index - 1)
            }  
    
            res.json({flag: true, data: [makeForYou, justRelax, topMusic]})
            
        } catch (error) {
            res.json({flag: false, data: []})
        }
    }

    async search (req, res) {
        const { q } = req.query
        try {
            const data = await Song.find({"title": {$regex: q, $options:'i'}})
            res.json({flag: true, data})
        } catch (error) {
            res.json({flag: false, data: [], status: "Server error"})
        }
    
    }
}

module.exports = new SiteController()