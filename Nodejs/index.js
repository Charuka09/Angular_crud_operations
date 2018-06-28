//local imports
const express = require('express'); //request statement
const bodyParser = require('body-parser'); //middleware
const cors = require('cors');

//package imports
const { mongoose } = require('./db.js'); //make the connection with mongodb
var employeeController = require('./controllers/employeeController.js');

var app = express();  
app.use(bodyParser.json()); // use to send json data for the project
app.use(cors({origin : 'http://localhost:4200' })); //allow request from any port number or domain

app.listen(3000, () => console.log('Server started at port : 3000')); //start the express server

app.use('/employees', employeeController);
