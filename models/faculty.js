var mongoose = require('mongoose');
var common = require('../config/config');
var config = common.config();
mongoose.connect(config.database , {useNewUrlParser: true , useCreateIndex: true });
var schema = new mongoose.Schema({
    name : String,
    expertise : String,
    mobile: Number,
    notes   : [{ type: mongoose.Schema.Types.ObjectId , ref : 'Notes'}]
})

module.exports =  mongoose.model('Faculties' , schema);