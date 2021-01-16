const express = require('express')
const router = express.Router();
const songController = require('../controllers/SongController')
const Song = require('../models/song.model')
const User = require('../models/user.model')


router.get('/', songController.getAll)
router.get('/:id', songController.getOne)
router.post('/', songController.postOne)
router.put('/:id', songController.putOne)
router.delete('/:id', songController.deleteOne)




module.exports = router;