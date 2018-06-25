const mongoose = require('mongoose'); //request mongoose packages

mongoose.connect('mongodb://localhost:27017/CrudDB', (err) => { 
    /*
    connect by using the object mongoose,
    pass the mongodb connection,
    (err) is the is the call back fuction to find errors while connecting to database
    */
    if (!err)
        console.log('MongoDB connection succeeded');
    else
        console.log('Error in DB connection :' + JSON.stringify(err, undefined, 2));
        /*print the error with the detailed error object
        use the JSON.stringify function to convert the object to a string
        */
});

module.exports = mongoose; 