const express = require('express')
const router = express.Router();
const songController = require('../controllers/SongController')
const Song = require('../models/song.model')
const User = require('../models/user.model')


router.get('/', async (req, res, next) => {
    const songs = await Song.find({}).limit(2).sort({view: -1})
    const user = await User.findById('5fe9d61080aedd36f00cb8b4')
    console.log(user);
    listAlbums = await Song.find({_id: { $in : user.listFavoriteSongs} } )
    res.json({listAlbums}) 
})







module.exports = router;