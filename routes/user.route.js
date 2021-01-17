const express = require('express')
const router = express.Router();

const userController = require('../controllers/UserController');
const { authorAdmin } = require('../middlewares/author.middleware')
const { route } = require('./site.route');

// A. USER
// 1. forgot pass
router.post('/forgot', userController.forgotPass)
// 2. change password
router.post('/change', userController.changePass)
// 3. verify user
router.post('/verify', userController.verifyUser)
// 4. get profile by param URL
router.get('/profile', userController.getProfileById)
// 5. patch a user by id: fullname and gender
router.patch('/:id', userController.patchOne)

// B. ADMIN
// 1. get all user
router.get('/', authorAdmin, userController.getAll)
// 2. get user by id
router.get('/:id', authorAdmin, userController.getOne)
// 3. create a user
router.post('/', authorAdmin, userController.postOne)
// 4. delete a user by id
router.delete('/:id', authorAdmin, userController.deleteOne)

module.exports = router;