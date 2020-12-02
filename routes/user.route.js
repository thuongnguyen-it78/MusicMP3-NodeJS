const express = require('express')
const router = express.Router();
const userController = require('../controllers/user.controller')
const User = require('../models/user.model')

router.get('/', userController.getAll)
router.get('/:id', userController.getOne)
router.post('/', userController.postOne)
router.patch('/:id', userController.patchOne)
router.delete('/:id', userController.deleteOne)


module.exports = router;