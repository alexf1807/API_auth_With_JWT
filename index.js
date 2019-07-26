const express = require("express");
const app = express();
const dotenv = require('dotenv');
const mongoose = require("mongoose");

dotenv.config();

//Connect to db
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log("connected to db")
);


app.use(express.json());

//Import Routes
const authRoute = require('./routes/auth');
const sendAPostRoute = require('./routes/sendapost')

//Route Middlewares
app.use('/api/user', authRoute)
app.use('/api/test', sendAPostRoute)


app.listen(3000, () => console.log('Server running'));