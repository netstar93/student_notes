var express  = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var yt = require('youtube-dl');
const ytdl = require('ytdl-core');
var multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
var upload = multer({storage: storage}) .single('image');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Student = require('../models/students');

router.get('/debug' , function(req,res) {
    var options = {'quality': 136};
    var file = 'VggLyTla_s0.mp4';//path.join('VggLyTla_s0.mp4');
    ytdl.getInfo('VggLyTla_s0', (err, info) => {
        if (err) throw err;
        let audioFormats = ytdl.chooseFormat(info.formats, {quality : '136' });
        console.log(audioFormats.url);
    });
})
router.get('/' , function(req,res) {
    res.render('index', {title : "Home"});
});

router.post('/video' , function(req,res) {
    var search_query  =  "";
    var search_url = "https://www.googleapis.com/youtube/v3/search?q="+search_query+"&regioncode=IN&type=video&key=AIzaSyCEpzNH0RT14Y8h_CRcSq6ncUNnq8Ktiws&part=snippet&chart=mostPopular&maxResults=2";
    request.get(search_url , function(err, response, body){
        if(err) return console.dir(err);
        var videos = JSON.parse(body);
        res.render('video', {title: "Watch download Video",query : search_query,  videos : videos });
    });
});

router.get('/video' , function(req,res , next) {
    search_query = '';
    if(req.query.query) {
        search_query  =  req.query.query;
    }
    console.log(search_query);
    var search_url = "https://www.googleapis.com/youtube/v3/search?q="+search_query+"&type=video&key=AIzaSyCEpzNH0RT14Y8h_CRcSq6ncUNnq8Ktiws&part=snippet&maxResults=20";
    request.get(search_url , function(err, response, body){
        if(err) return console.dir(err);
        var videos = JSON.parse(body);
                res.render('video', {title: "Watch download Video",query : search_query,  videos : videos });
        });
});

router.get('/api/download', function (req, res) {
    var file = req.query.id+'.mp4';
    res.download(file, function (err) {
        console.log(file);
        if(!err){
            console.log('dwnded');
            fs.unlink(file,function(res){
            });
        }
    });
})

router.get('/api/generate_video', function (req, res) {
    var quality = req.query.quality;
    var ___dirname = process.env.PWD;
    var video_id = req.query.video_id;
    destDir  = "";
    if(typeof video_id != 'undefined') {
        var videoUrl = "https://www.youtube.com/watch?v=" + video_id;
        console.log(videoUrl);
        var videoReadableStream = ytdl(videoUrl, {filter: ''});
        ytdl.getInfo(videoUrl, function (err, info) {
            var videoName = info.title.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-');
            var file = videoName + '.mp4';
            console.log(file);
            var videoWritableStream = fs.createWriteStream(file);
            var stream = videoReadableStream.pipe(videoWritableStream);
            var filename = path.basename(file);
            var mimetype = mime.lookup(file);
            stream.on('finish', function () {
                var dl_url = "/api/download?id="+videoName;
                res.send({dl_url : dl_url});
                res.end();
            });
        });
    }
});

router.get('/login' , function(req,res) {
    res.render('login' , {title : "Login"});
});

router.get('/register' ,Student.authStudent, function(req,res) {
    res.render('register' , {title : "Register"});
});

router.post('/login' , Student.authStudent , function(req, res , next) {;
    Student.findOne({'mobile' : req.body.mobile  , 'password' : req.body.password }).then(function(result)  {    
        // log(result);
        if(result ) {
            req.session.student = result;
            req.session.save();
            req.flash('success' , 'You have logged in successfully');
            res.redirect('dashboard');
        }
        else{
            req.flash('error' , 'Incorrect Mobile no./Password');
            backURL=req.header('Referer') || '/';
            res.redirect(backURL);
        }
    })
})

router.get('/*', function(req, res, next) {
    res.locals.student = req.session.student;
    if(req.session.student) 					
    next();
        // res.redirect('/dashboard');	    
    else
        res.redirect('/login');
    
});

router.get('/dashboard' , Student.authStudent ,function(req, res , next){
    res.render('student/stu_home' , {title : "Dashboard"});
})
router.post('/register', upload , function(req,res) {
    var data = req.body;
    if(req.file)
    data.image = req.file.filename;
  // Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email Addesss is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    var errors = req.validationErrors();
	if (errors) {
	    // log(errors);
		res.render('register', {
			error: errors,
            title: "Register"
		});
	}else{

    Student.find({'mobile' : parseInt(req.body.mobile)}).limit(1).then(function(result)  {
        if(result .length > 0) { log('found');
            req.flash('error' , "Already Exist Email");
            res.redirect('/register');
        }else{
            var student = new Student(data)
            student.save(function(err,result){
                if(result)
                req.flash('success', 'Registered successfully');
                res.redirect('/register');
            });
        }
        })
    }
});

module.exports = router;