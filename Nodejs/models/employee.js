const mongoose = require('mongoose'); //request statement for mongoose 

var Employee = mongoose.model('Employee', { //create model employee
    name: { type: String },
    position: { type: String },
    office: { type: String },
    salary: { type: Number }
});


module.exports = { Employee };