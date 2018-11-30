var express  = require('express');
var router = express.Router();
var request = require('request');
var Notes = require('../models/notes');
var apiHelper = require('../helpers/news-api');
var fs = require('fs');
var Parser = require('rss-parser');
let parser = new Parser(); 
const GoogleNewsRss = require('google-news-rss');
const googleNews = new GoogleNewsRss();
var top_headlines = "https://news.google.com/_/rss?hl=en-IN&gl=IN&ceid=IN:en";
var coolztricks = "https://www.coolztricks.com/rss";
var earticleblog = "https://www.earticleblog.com/feed"; 
var desidime = "https://www.desidime.com/deals.atom";

router.get('/' , function(req,response){
        var feed_url = getFeedUrl(req.query.source);
    debug(feed_url);
        parser.parseURL(feed_url). then(function(feedlist) {
            // debug(feedlist);
                response.render('newslist' , {title : 'New Note' , 'newsData' : feedlist , 'source' : req.query.source } );
        });

        // request.get(feed_url, function (err, res,body) {
        //     data = JSON.parse(body);
        //     if(data.status == "ok")
        //     response.render('newslist' , {title : 'New Note' , 'newsData' : data } );
        // })
})

function getFeedUrl(source_name) {
    switch(source_name) {
        case 'coolztricks' :
            return coolztricks;
        case 'google-news' :
            return top_headlines;
        case 'earticleblog' :
            return earticleblog;
            case 'desidime' :
            return desidime;
    }
    return top_headlines;
}

module.exports = router;