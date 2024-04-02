const express = require('express')
const { body } = require('express-validator')
const tokenValidate = require('../middlewares/validator')
const authController = require('../controllers/auth')
const inputValidator = require('../middlewares/inputValidator')
const User = require('../models/user')

const router = express.Router()

router.post('/signup',
        body("name")
        .not()
        .isEmpty()
        .withMessage("Name field is required")
        .escape(),
        body("email")
        .isEmail()
        .withMessage("Enter a valid email address")
        .trim()
        .escape()
        .normalizeEmail()
        .custom(async value => {
            const user = await User.findOne({ email: value })
            if (user) {
                throw new Error('E-mail already in use');
            }
        }),
        body("password")
        .notEmpty()
        .isLength({ min: 8, max: 16 })
        .withMessage("Must be at least 8 chars or atmost 16 chars long"),
        inputValidator,
        authController.signUp)

router.post('/login', 
        body("email")
        .isEmail()
        .withMessage("Please enter a valid email")
        .trim()
        .escape(),
        body("password")
        .notEmpty()
        .isLength({ min: 8, max: 16 })
        .withMessage("Must be at least 8 chars or atmost 16 chars long"),
        inputValidator,
        authController.login)

router.patch('/status-update',
        body("status")
        .notEmpty()
        .withMessage("status field is required")
        .custom(async value => {
            if (value !== 'Active' && value !== 'Inactive') {
                throw new Error('Status must be Active or Inactive');
            }
        }),
        inputValidator, tokenValidate, authController.statusUpdate)

router.put('/update', tokenValidate, authController.userUpdate)

router.get('/user-details', tokenValidate, authController.getUserDetails)

router.get('/users', tokenValidate, authController.getUsers)

router.get('/forgot-password', authController.forgotPassword)

router.post('/reset-password', 
    body("new_password"),
    body("new_password_confirm"),
    inputValidator,
    authController.resetPassword)

router.post('/logout', tokenValidate, authController.logout)

module.exports = router