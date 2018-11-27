var express  = require('express');
var router = express.Router();
var request = require('request');
var Notes = require('../models/notes');
var apiHelper = require('../helpers/news-api');
var fs = require('fs');

router.get('/' , function(req,res){
 apiHelper.getNews(function(news){
     res.render('newslist' , {title : 'New Note' , 'newsData' : news } );
       // console.log(response);
    });
})

module.exports = router;