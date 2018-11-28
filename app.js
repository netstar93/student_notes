var express  = require('express');
var path  = require('path');
var http  = require('http');
var reload = require('reload');
var engine = require('ejs-locals');
var app = express();
var bodyParser = require('body-parser');

app.engine('ejs', engine);
app.set('view engine' , 'ejs');
var public = path.join(__dirname, './public')
app.use(express.static(public));

app.set('port', process.env.PORT || 8000);
app.use( bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var routes = require('./controllers/routes.js');
var notes = require('./controllers/notes.js');
app.use('/', routes);
app.use('/', notes);
app.use('/reader', require('./controllers/reader'));
// mongoose.set('useFindAndModify', false);

var server = http.createServer(app)
reload(app);
server.listen(app.get('port') , function(){
    console.log('Running on port ' +app.get('port'));
})

global.debug = function(data) {
    console.log(data);
}

module.exports = app;