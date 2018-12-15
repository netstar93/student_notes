var express  = require('express');
var router = express.Router();
var request = require('request');
var Notes = require('../models/notes');
var fs = require('fs');

router.get('/notes/add' , function(req,res){
    res.render('notes/addnotes' , {title : 'New Note'});
})

module.exports = router;

module.exports.saveNotes = function(data , callback) {
    var note = new Notes(data);
    note.save(callback);
}