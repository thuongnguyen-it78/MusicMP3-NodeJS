const express = require('express')

const router = express.Router();

const userController = require('../controllers/UserController');
const { route } = require('./site.route');

route.post('/forgot', userController.forgotPass)
route.post('/change', userController.changePass)


router.get('/', userController.getAll)
router.get('/:id', userController.getOne)
router.post('/', userController.postOne)
router.patch('/:id', userController.patchOne)
router.delete('/:id', userController.deleteOne)


module.exports = router;