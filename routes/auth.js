const express = require('express')
const { body } = require('express-validator')
const tokenValidate = require('../middlewares/validator')
const authController = require('../controllers/auth')
const inputValidator = require('../middlewares/inputValidator')
const User = require('../models/user')

const router = express.Router()

router.post('/signup',
        [
            body("name")
            .not()
            .isEmpty()
            .escape()
            .withMessage("name is required!"),
            body("email")
            .isEmpty()
            .trim()
            .escape()
            .withMessage("email is required"),
            body("password")
            .isEmpty()
            .isLength({ min: 8, max: 16 })
            .trim()
            .escape()
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