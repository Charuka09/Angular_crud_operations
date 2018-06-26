const express = require('express');
var router = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;

var { Employee } = require('../models/employee.js');

// => localhost:3000/employees/` 
router.get('/',(req, res) => {
    Employee.find((err, docs) => {
        if(!err){ 
            //If ther is no error we can return the daa got from db back to the responce
            res.send(docs);
         }
        else {
            console.log('Error in retriving Employees :'+ JSON.stringify(err, undefined, 2));
        }
    });
});

//requesting ID
router.get('/:id', (req,res) => {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('No record with given id : ${req.params.id}');
    }
    Employee.findById(req.params.id , (err,doc) => {
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in retriving Employee :' + JSON.stringify(err,undefined,2));
        }
    });
});

router.post('/', (req,res) => {
    var emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
    emp.save((err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in sending Employees :'+ JSON.stringify(err,undefined,2));
        }
    });
})

//update opperations
//this is putweb method 
router.put('./:id', (req,res) => {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('No records with given Id : $(req.params.id)');
    }
    var emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    };
    //update the employe by the give id
    Employee.findByIdAndUpdate(req.params.id, { $set:emp } , { new: true }, (err,doc) => 
    //use new is use for return whether all data or updated data back to the response
    //if new is true the call back parameter doc will have the updated values otherwise it will have old value of the corresponding employee
    {
        if(!err){ res.send(doc); }
        else{ console.log('Error in employee update :' + JSON.stringify(err, undefined,2)); }
    });
});


//delete a record
router.delete('/:id',(req,res) => {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('No record with the given id : $(req.params.id)');
    }
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in Employee delete :' + JSON.stringify(err,undefined,2));
        }
    });
});

module.exports = router;