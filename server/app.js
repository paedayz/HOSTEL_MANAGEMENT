const express = require('express')
const app = express()

const mongoose = require('mongoose')

const bodyParser = require('body-parser')
require('dotenv/config')

// Middleware
app.use(bodyParser.json())

// Import Routes
const authRoute = require('./routes/auth')

// Router
app.use('/api/auth', authRoute)

// Routes
app.get('/', (req, res) => {
    res.send('We are on home')
})

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION , 
{useNewUrlParser: true}, 
() => {
    console.log('connected to mongoDB!')
})

app.listen(3000)