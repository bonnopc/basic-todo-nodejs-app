// import express from 'express';
// import bodyParser from 'body-parser';
const express = require('express');
const bodyParser = require('body-parser');

// creating the app
const app = express();

// parse requests of content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse request of content type application/json
app.use(bodyParser.json())

// Require todo routes
require('./app/routes/todo.routes')(app);

// routes
app.get('/', (req, res) => {
    res.json({ "message": "Lets handle your tasks with this to-do app" })
})

// listen for requests
app.listen(3002, () => {
    console.log("Server is listening on port 3002");
})

// configuring the DB
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// connecting to the DB
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the Database")
}).catch(err => {
    console.log("Could not connect to the database. Exiting..", err)
    process.exit()
})


