const express = require('express')

const router = express.Router();

const userController = require('../controllers/UserController');
const { route } = require('./site.route');

router.post('/forgot', userController.forgotPass)
router.post('/change', userController.changePass)
router.post('/verify', userController.verifyUser)

router.get('/profile', userController.getProfileById)

router.get('/', userController.getAll)
router.get('/:id', userController.getOne)
router.post('/', userController.postOne)
router.patch('/:id', userController.patchOne)
router.delete('/:id', userController.deleteOne)


module.exports = router;