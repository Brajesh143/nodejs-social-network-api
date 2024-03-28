const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')

const app = express()

app.use(bodyParser.json())

app.use('/auth', authRoute)
app.use('/post', postRoute)

mongoose.connect('mongodb://localhost:27017/social-network-api')
.then((result) => {
    app.listen(3000)
})
.catch(err => console.log(err))
