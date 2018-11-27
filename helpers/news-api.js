var express  = require('express');
var router = express.Router();
var request = require("request");
const top_headlines = "https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=0289bc2596de42329baf44ae460f1bc4";

module.exports = {
     getNews : function (callback) {
         var data = {};
        request.get(top_headlines, function (err, res,body) {
             data = JSON.parse(body);
             // if(data.status == "ok")
             return callback(JSON.parse(body));
            // console.log(JSON.parse(body));
        })
         // console.log(data);
    }
}
