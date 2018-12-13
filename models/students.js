var mongoose = require('mongoose');
var common = require('../config/config');
var config = common.config();
mongoose.connect(config.database , {useNewUrlParser: true});
var schema = new mongoose.Schema({
    name : { type: String,min: 5 , max : 20 },
    mobile : Number,
	password : String,
	email : String,
	course: String,
	year : Number,
	image: String    
},
{
	timestamps : true
});

// let timestampPlugin = require('../plugins/timestamp');
// noteSchema.plugin(timestampPlugin);
module.exports = mongoose.model('Students' , schema);
