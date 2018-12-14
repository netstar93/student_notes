var express  = require('express');
var path  = require('path');
var http  = require('http');
var reload = require('reload');
var engine = require('ejs-locals');
var flash = require('connect-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
app.engine('ejs', engine);
app.set('view engine' , 'ejs');
var public = path.join(__dirname, './public')
app.use(express.static(public));
app.use(flash());
app.use(cookieParser());
app.set('port', process.env.PORT || 8000);
app.use( bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator())
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    name : 'app.sid',
    secret: 'sharely',
    resave: false,
    saveUninitialized: true
}));
app.use(function(req,res,next){

    // SET SESSION MESSAGES
    var message = {success :  [], error : []} 
    message.success = req.flash('success');
    message.error = req.flash('error');
    res.locals.message = message;
    
    //PASS STUDENT SESSION IN TEMPLATE
    res.locals.student = req.session.student;
   next();
})

app.use('/', require('./controllers/routes.js'));
app.use('/', require('./controllers/notes.js'));
app.use('/wiki',  require('./controllers/wiki.js')) ;
app.use('/reader', require('./controllers/reader'));
// mongoose.set('useFindAndModify', false);

// Passport init
app.use(passport.initialize());
app.use(passport.session());

var server = http.createServer(app)
reload(app);
server.listen(app.get('port') , function(){
    console.log('Running on port ' +app.get('port'));
})

global.log = function(data) {
    console.log(data);
}

module.exports = app;