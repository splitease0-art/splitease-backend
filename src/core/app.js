const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const session = require('express-session')
const rateLimiter = require('../middlewares/rate-limiter');


const app = express();
app.use(session({
    secret: process.env.SECRET_KEY, 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
  }));

app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors({ origin: "*" }));
//
app.use(bodyParser.urlencoded({ extended: true }));
//
app.use(morgan("dev"));
//
app.use(rateLimiter)


app.use('/v1/auth', require('../routes/auth.routes')); 

module.exports = app;