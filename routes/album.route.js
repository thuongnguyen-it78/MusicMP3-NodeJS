const express = require('express')
const router = express.Router();
const albumController = require('../controllers/AlbumController')

router.get('/:id', albumController.getOne)



module.exports = router;