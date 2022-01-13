const express = require("express")
const app = express()
require("dotenv").config()
const { PORT = 3001, DATABASE_URL } = process.env
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")
const indexController = require('./controllers/index');

// DATABASE CONNECTION 
mongoose.connect(DATABASE_URL)
// Connection Events
mongoose.connection
    .on("open", () => console.log("You are connected to MongoDB"))
    .on("close", () => console.log("You are disconnected from MongoDB"))
    .on("error", (error) => console.log(error))

// MiddleWare
app.use(cors()) // to prevent cors errors, open access to all origins
app.use(morgan("dev")) // logging
app.use(express.json()) // parse json bodies
app.use('/', indexController)

// LISTENER
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))