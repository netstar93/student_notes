var express  = require('express');
var router = express.Router();
var request = require('request');
var Notes = require('../models/notes');
var apiHelper = require('../helpers/news-api');
var fs = require('fs');
var Parser = require('rss-parser');
let parser = new Parser(); 
var top_headlines = "https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=0289bc2596de42329baf44ae460f1bc4";

router.get('/' , function(req,response){
    // app.set('source', req.query.source);

        var data = {};
        var feed_url = getFeedUrl( req.query.source);
        let feed = parser.parseURL('https://www.reddit.com/.rss');
        request.get(feed_url, function (err, res,body) {
            data = JSON.parse(body);             
            if(data.status == "ok")
            response.render('newslist' , {title : 'New Note' , 'newsData' : data } );            
        })
})

function getFeedUrl(source_name){
    return top_headlines;
}

module.exports = router;