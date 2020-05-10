const express = require('express');
const bodyParser = require('body-parser');
const db = require('./app/models/database');
// create express app
const empApp = express();

// parse requests of content-type - application/x-www-form-urlencoded
empApp.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
empApp.use(bodyParser.json())

const mongoose = require('mongoose');

// Require Employees routes
require('./app/routes/employee.routes.js')(empApp);

// define a simple route
empApp.get('/', (res) => {
    res.json({"message": "Welcome to Employees App!"});
});

// listen for requests
empApp.listen(3200, () => {
    console.log("Server is listening on port 3200");
});
