const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoute = require('./routes/auth')

const app = express()

app.use(bodyParser.json())

app.use('/auth', authRoute)

mongoose.connect('mongodb://localhost:27017/social-network-api')
.then((result) => {
    app.listen(3000)
})
.catch(err => console.log(err))
