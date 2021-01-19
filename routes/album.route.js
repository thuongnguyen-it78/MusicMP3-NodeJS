const express = require('express')
const router = express.Router();
const albumController = require('../controllers/AlbumController')

router.get('/:id', albumController.getOne)
router.get('/', albumController.getAll)



module.exports = router;