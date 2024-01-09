require('dotenv').config() // allows access to dotenv everywhere
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3500

const currentDir = __dirname

connectDB()

//creats logs in logs folder
app.use(logger)

//adds security to what web pages can access the api
app.use(cors(corsOptions))

//allows JSON in server app
app.use(express.json())

//allows app to parse cookies
app.use(cookieParser())

//allows access to static files in public folder
app.use('/', express.static(path.join(currentDir, '/public'))) // allows you to access public folder files in this case, css/style.css

//main route 
app.use('/', require('./routes/root')) //middleware that responds with index.html file 

//user routes
app.use('/users', require('./routes/userRoutes'))

//note routes
app.use('/notes', require('./routes/noteRoutes'))



// Catch all route
app.all('*', (req, res) => {

    res.status(404)
    if (req.accepts('html')) {

        res.sendFile(path.join(currentDir, 'views', '404.html'))

    } else if (req.accepts('json')) {

        res.json({ message: '404 Not Found' })

    } else {

        res.type('txt').send('404 Not Found')

    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {

    console.log('Connected to MongoDB')

    app.listen(PORT, () => {

        console.log(`server running on port ${PORT}`)

    })
})

mongoose.connection.on('error', err => {

    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')

})
