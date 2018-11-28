var express  = require('express');
var router = express.Router();
var request = require("request");
var Parser = require('rss-parser');
let parser = new Parser();  
var top_headlines = "https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=0289bc2596de42329baf44ae460f1bc4";

module.exports = {
     getNews : function (callback,reqObj) {
         var data = {};
         var feed_url = getFeedUrl(req);
         console.log(reqObj); 
         let feed = parser.parseURL('https://www.reddit.com/.rss');
        request.get(top_headlines, function (err, res,body) {
             data = JSON.parse(body);             
             if(data.status == "ok")
             return callback(data);
            
        })
    }
}

function getFeedUrl(source_name){
    return top_headlines;
}
