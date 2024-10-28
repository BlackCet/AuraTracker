//configure dotenv
require('dotenv').config()

//requre express
const express = require('express')

//create an express app
const app = express()

//logger middleware
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`)
    next()
})

//route
app.get('/', (req, res) => {
    res.json({msg: 'Welcome to the server'})
})

//listen on port
app.listen(process.env.PORT, () => {
  console.log(`listening at port ${process.env.PORT}`)
})