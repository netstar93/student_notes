var express  = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var Parser = require('rss-parser');
let parser = new Parser(); 
// var wiki_url = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&titles=khesari';
var wiki_url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=khesari&namespace=0&format=json';
router.get('/' , function(req,res){
    var query = {};
    query = req.query.query;
    if(query)
   // wiki_url = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&titles='+query;
    
   request.get(wiki_url , function(err, result ) {
        var pages =  JSON.parse(result.body);
      //  _log(pages[2]);
       res.render('wiki' , {title: "My Learning" , page : {} });
    })
})

module.exports = router;