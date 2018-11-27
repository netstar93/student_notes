var express  = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var yt = require('youtube-dl');
const ytdl = require('ytdl-core');

router.get('/debug' , function(req,res) {
    var options = {'quality': 136};
    var file = 'VggLyTla_s0.mp4';//path.join('VggLyTla_s0.mp4');
    ytdl.getInfo('VggLyTla_s0', (err, info) => {
        if (err) throw err;
        let audioFormats = ytdl.chooseFormat(info.formats, {quality : '136' });
        // console.log(info.title);
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

router.get('/video' , function(req,res , next) {
    var search_query  =  req.query.query;
    console.log(search_query);
    var search_url = "https://www.googleapis.com/youtube/v3/search?q="+search_query+"&type=video&key=AIzaSyCEpzNH0RT14Y8h_CRcSq6ncUNnq8Ktiws&part=snippet&maxResults=20";
    request.get(search_url , function(err, response, body){
        if(err) return console.dir(err);
        var videos = JSON.parse(body);
        // videos['items']. forEach(function(video) {
                res.render('video', {title: "Watch download Video",query : search_query,  videos : videos });
            // })
        });
});

router.get('/register' , function(req,res) {
    res.render('register');
});

module.exports = router;