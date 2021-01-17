const express = require('express')
const router = express.Router();

const songController = require('../controllers/SongController')
const { authorAdmin } = require('../middlewares/author.middleware')

const Song = require('../models/song.model')
const User = require('../models/user.model')

// 1. get all songs
router.get('/', songController.getAll)
// 2. get a song by id
router.get('/:id', songController.getOne)
// 3. create a song 
router.post('/', authorAdmin, songController.postOne)  // ADMIN
// 4. put a song by id
router.put('/:id', authorAdmin, songController.putOne)   // ADMIN
// 5. delete song by id
router.delete('/:id', authorAdmin, songController.deleteOne)  // ADMIN

module.exports = router;