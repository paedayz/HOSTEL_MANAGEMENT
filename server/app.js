const express = require('express')
const app = express()

const cors = require("cors");

const mongoose = require('mongoose')

const bodyParser = require('body-parser')
require('dotenv/config')

// Middleware
app.use(bodyParser.json())
app.use(cors());

// Import Routes
const authRoute = require('./routes/auth')
const hostelRoute = require('./routes/hostel')

// Router
app.use('/api/auth', authRoute)
app.use('/api/hostel', hostelRoute)

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION , 
{useNewUrlParser: true}, 
() => {
    console.log('connected to mongoDB!')
})

app.listen(5000)