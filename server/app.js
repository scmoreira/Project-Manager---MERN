require('dotenv').config()

// Database
require('./configs/mongoose.config')

// App
const express = require('express')
const app = express()

// Enable express.json
app.use(express.json({ extended: true }))

// Routes
app.use('/api/user', require('./routes/user.routes'))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/project', require('./routes/project.routes'))
app.use('/api/task', require('./routes/task.routes'))

// Server
app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Listening on http://localhost:${process.env.PORT}`)
})