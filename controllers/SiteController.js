const Song = require('../models/song.model')
const Album = require('../models/album.model')
const User = require('../models/user.model')

class SiteController {
    async getOverview(req, res) {
        // return all amount user, song, album

        try {
        // total user
        const user = await User.count({})
        
        // total song
        const song = await Song.count({})

        // total album
        const album = await Album.count({})  

        res.status(200).json({flag: true, data: {user, song, album}})
        
        } catch (error) {

        res.status(500).json({flag: false, status: 'Server Error'})

        }


        

    }

    async home (req, res) {
    
        try {
            const list = await Album.find({});    
            const index = list.length / 4
    
            // make for you
            const makeForYou = {
                "title": "Make For You", 
                "playlists": list.slice(0, 1 * index)
            }
    
            // relax
            const justRelax = {
                "title": "Just Relax", 
                "playlists": list.slice(1 * index, 2 * index)
            }
    
    
            // top albums
            const topMusic = {
                "title": "Top Music", 
                "playlists": list.slice(2 * index, 3 * index)
            }  

            const readBook = {
                "title:": "Read Book",
                "playlists": list.slice(3 * index, 4 * index - 1)

            }
    
            res.json({flag: true, data: [makeForYou, justRelax, topMusic, readBook]})
            
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