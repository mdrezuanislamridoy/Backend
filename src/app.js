const express = require("express")
const connectDB = require("./db/index")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express()


app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin:"*",
    credentials:true
}))
app.use(cookieParser())

connectDB()

module.exports = app  