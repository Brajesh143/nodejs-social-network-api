const express = require('express')
const tokenValidate = require('../middlewares/validator')
const authController = require('../controllers/auth')

const router = express.Router()

router.post('/signup', authController.signUp)

router.post('/login', authController.login)

router.patch('/status-update', tokenValidate, authController.statusUpdate)

router.put('/update', tokenValidate, authController.userUpdate)

router.get('/user-details', tokenValidate, authController.getUserDetails)

router.get('/users', tokenValidate, authController.getUsers)

router.get('/forgot-password', authController.forgotPassword)

router.post('/reset-password', authController.resetPassword)

router.get('/logout', authController.logout)

module.exports = router