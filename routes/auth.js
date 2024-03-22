const express = require('express')
const authController = require('../controllers/auth')

const router = express.Router()

router.get('/signup', authController.signUp)

module.exports = router