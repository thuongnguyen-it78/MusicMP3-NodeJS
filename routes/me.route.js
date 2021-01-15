const express = require('express')
const router = express.Router();
const meController = require('../controllers/MeController');
const { route } = require('./site.route');


router.get('/favorite', meController.getFavoriteAll)
router.post('/favorite', meController.postFavoriteOne)
router.patch('/favorite', meController.patchFavoriteOne)

router.get('/playlist', meController.getPlaylistAll)
router.get('/playlist/:id', meController.getPlaylistOne)
router.post('/playlist', meController.postPlaylistOne)
router.patch('/playlist/:id', meController.patchPlaylistOne)
router.delete('/playlist/:id', meController.deletePlaylistOne)
router.post('/playlist/:id/add', meController.postSongFromPlaylist)
router.delete('/playlist/:id/delete', meController.deleteSongFromPlaylist)








module.exports = router;