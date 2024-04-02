const express = require('express')
const { body } = require('express-validator')
const tokenValidate = require('../middlewares/validator')
const authController = require('../controllers/auth')
const inputValidator = require('../middlewares/inputValidator')

const router = express.Router()

router.post('/signup',
        [
            body("name")
            .not()
            .isEmpty()
            .withMessage("name is required!")
        ],
        inputValidator,
        authController.signUp)

router.post('/login', authController.login)

router.patch('/status-update', tokenValidate, authController.statusUpdate)

router.put('/update', tokenValidate, authController.userUpdate)

router.get('/user-details', tokenValidate, authController.getUserDetails)

router.get('/users', tokenValidate, authController.getUsers)

router.get('/forgot-password', authController.forgotPassword)

router.post('/reset-password', authController.resetPassword)

router.post('/logout', tokenValidate, authController.logout)

module.exports = router