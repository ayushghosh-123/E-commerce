import express from 'express'
import cors from 'cors'
import dotenv from '@dotenvx/dotenvx'
import connectDb from './config/db.js'
import userRoute from '../backend/route/user.route.js'

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()

const PORT = process.env.PORT || 9000

// conect databse
connectDb()

app.get("/", (req, res)=> {
    res.send("WELCOME TO RABBIT API")
})

// API routes
app.use('/api/user', userRoute)

app.listen(PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})