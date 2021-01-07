const express = require('express')
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middlewares')
const authController = require('../controllers/AuthController')


router.get('/login', authController.logIn, authMiddleware.getToken)
router.get('/signup', authController.signUp, authMiddleware.getToken)

module.exports = router;