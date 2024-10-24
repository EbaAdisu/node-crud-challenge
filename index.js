const express = require('express')
const cors = require('cors')
const app = express()
//This is your in memory database
let persons = require('./db/db')

app.use(express.json())
app.use(cors())

app.set('db', persons)

// Middlewares
const errorHandler = require('./middlewares/errorHandler')
const notFoundHandler = require('./middlewares/notFoundHandler')

// Routes
const personRouter = require('./routes/person')

//TODO: Implement crud of person

app.use('/person', personRouter)
app.use(notFoundHandler)
app.use(errorHandler)

if (require.main === module) {
    app.listen(3000)
    console.log('server is running on port 3000')
}
module.exports = app
