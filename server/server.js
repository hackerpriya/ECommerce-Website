const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')


// Create database connection
mongoose.connect('mongodb+srv://priyankabhrgva:pranshupriyanka9396@cluster0.xtmkd.mongodb.net/').then(()=>console.log('MongoDB connected')).catch((error)=>console.log(error))

const app = express()
const PORT = process.env.PORT || 5000

app.use(
    cors({
        origin : "http://localhost:5173/",
        methods : ["GET","POST","DELETE","PUT"],
        allowHeaders : [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials : true 
    })
)

app.use(cookieParser())
app.use(express.json())
app.listen(PORT,()=>console.log(`Server is now running on port ${PORT}`))