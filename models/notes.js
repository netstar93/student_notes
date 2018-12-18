var mongoose = require('mongoose');
var config = require('../config/config');

var common = require('../config/config');
var config = common.config();
mongoose.connect(config.database , {useNewUrlParser: true});
var noteSchema = new mongoose.Schema({
    type : String,
    added_by : { type: String,min: 5 , max : 20 } ,
    description : String,
    student : { type: mongoose.Schema.Types.ObjectId , ref : 'Students'},
    faculty : { type: mongoose.Schema.Types.ObjectId , ref : 'Faculties'}
},
    {
        timestamps : true
    });
noteSchema.add({subject: 'string' , course: 'string' });
noteSchema.add({file: 'string' });
// let timestampPlugin = require('../plugins/timestamp');
// noteSchema.plugin(timestampPlugin);
module.exports = mongoose.model('Notes' , noteSchema);
