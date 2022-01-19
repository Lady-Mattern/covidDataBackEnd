const express = require("express")
const app = express()
require("dotenv").config()
const { PORT = 3001, DATABASE_URL, SECRET } = process.env
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")
const session = require('express-session');
const indexController = require('./controllers/index');
const usersController = require('./controllers/users');

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

//  SESSION
// app.use(session({
//     secret: SECRET,
//     resave: false,
//     saveUninitialized: false
// }));

// app.use(async function (req, res, next) {
//     if (req.session && req.session.user) {
//         const user = await require('./models/user').findById(req.session.user)
//         res.locals.user = user;
//     } else {
//         res.locals.user = null;
//     }
//     next();
// });

// mount routes
app.use('/', indexController)
// app.use('/users', usersController)

// LISTENER
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))