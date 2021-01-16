const express = require('express')
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middlewares')
const authController = require('../controllers/AuthController')


router.post('/login', authController.logIn, authMiddleware.getToken)
router.post('/signup', authController.signUp, authMiddleware.getToken)


module.exports = router;