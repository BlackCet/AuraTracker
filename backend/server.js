//configure dotenv
require('dotenv').config()
// console.log(process.env.EMAIL_HOST, process.env.EMAIL_USER); // This should output your email details if loaded
// console.log("EMAIL_HOST:", process.env.EMAIL_HOST); // Should output your EMAIL_HOST value

//require dependencies
const express = require('express')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')
const path = require('path')

//import routes
const dashboardRoutes = require('./routes/dashboard')
const courseRoutes = require('./routes/course')
const assignmentRoutes = require('./routes/assignment')
const eventRoutes = require('./routes/event')
const goalRoutes = require('./routes/goal')
const authRoutes = require('./routes/authRoutes')
const timetableRoutes = require('./routes/timetable');
require('./scheduler/assignmentsScheduler')

//create an express app
const app = express()

//logger middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`)
    next()
})

//serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//routes
app.use('/api/user', userRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/course', courseRoutes)
app.use('/api/assignments', assignmentRoutes)
app.use("/api/events", eventRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/goals', goalRoutes)
app.use('/api/timetables', timetableRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })