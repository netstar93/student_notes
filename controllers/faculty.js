var mongoose = require('mongoose');
var faculty =  require('../models/faculty');
var Student =  require('../models/students');

module.exports.login = function(req,callback) {
    // console.log(req)
    if(req) { 
    Student.findOne({mobile : req.body.mobile , password : req.body.password}) .then(function(response){
        callback(response);
    })
    }
}

module.exports.createFaculty =  function(req, res, callback) {
    var faculty_model = new faculty(req.body);
    faculty_model.save(callback); 
}