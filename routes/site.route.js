const express = require('express')
const router = express.Router();
const siteController = require('../controllers/SiteController')
const Song = require('../models/song.model')
const Album = require('../models/album.model')

// home: list albums
router.get('/', async (req, res) => {

    let result = {}
   
    result.data = { data : [] }

    try {
        const list = await Album.find({});    
        const index = list.length / 3

        // make for you
        const makeForYou = {
            "title": "Make For You", 
            "playlists": [list.slice(1 * index)]
        }

        // relax
        const justRelax = {
            "title": "Just Relax", 
            "playlists": [list.slice(2 * index)]
        }


        // top albums
        const topMusic = {
            "title": "Top Music", 
            "playlists": [list.slice(3 * index - 1)]
        }

        result.data = [makeForYou, justRelax, topMusic]


        res.json(result)
        
    } catch (error) {
        res.json(result)
    }
})  

router.get('/search', async (req, res) => {
    const { q } = req.query
    const result = {data : []}
    try {
        result.data = await Song.find({"title": {$regex: q, $options:'i'}})
        res.json(result)
    } catch (error) {
        res.json(result)
    }

}) 


module.exports = router;