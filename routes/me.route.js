const express = require('express')
const router = express.Router();
const meController = require('../controllers/MeController')


router.get('/favorite', meController.getFavoriteAll)
router.post('/favorite', meController.postFavoriteOne)
router.patch('/favorite', meController.patchFavoriteOne)



module.exports = router;