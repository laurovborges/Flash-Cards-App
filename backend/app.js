require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const authRouter = require('./routes/auth')
const decksRouter = require('./routes/decks')
const connectDB = require('./db/connectDB')
const authMiddleware = require('./middleware/authMiddleware')

//security packages
const helmet = require('helmet')
const cors = require('cors')
const {xss} = require('express-xss-sanitizer')
const rateLimiter = require('express-rate-limit')

//middleware
app.set('trust proxy', true) // makes it so that every user's actual IP is used instead of one proxy IP that is used for all requests
app.use(rateLimiter({
    windowMs: 1000 * 60 * 15, // 15 minutes
    max: 300
}))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

//routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/decks', authMiddleware, decksRouter)


app.get('/', (req, res) => {
    res.send('flash cards')
})


const port = process.env.PORT || 3000

async function startServer() {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}\nhttp://localhost:${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

startServer()