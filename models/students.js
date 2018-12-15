var mongoose = require('mongoose');
var common = require('../config/config');
var config = common.config();
mongoose.connect(config.database , {useNewUrlParser: true , useCreateIndex: true });
var schema = new mongoose.Schema({
    name : { type: String,min: 5 , max : 20 },
    mobile : { type: Number , index : true},
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
module.exports.authStudent = function(req, res , next) {
    var stu =req.session.student;
	if(!req.session.student)
        next();
			// res.redirect('/login');
	else
		next();
}