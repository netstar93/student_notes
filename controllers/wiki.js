var express  = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var Parser = require('rss-parser');
let parser = new Parser(); 

router.get('/' , function(req,res){
    var query = {};
    var pages = {title: ''};
    query = req.query.query;
    if(query) {
        wiki_url = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&titles='+query;
        var img_wiki = "https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=300&titles="+query;
        request.get(wiki_url, function (err, result) {
            var page = JSON.parse(result.body) ;
            var query =  page.query;
            pages = query.pages[Object.keys(query.pages)];

            request.get(img_wiki, function (err, result) {
                var image = JSON.parse(result.body) ;
                var query =  image.query;
                images = query.pages[Object.keys(query.pages)];
                if(typeof images.thumbnail  != 'undefined') {
                    pages.image = images.thumbnail.source;
                }
                res.render('wiki', {title: "My Learning", page: pages });
            })

        })
    }  else {
        res.render('wiki', {title: "My Learning", page: pages});
    }
})

var sinchApi = require('sinch-rest-api')({
    key: '3e32fd02-afb7-414b-a0cb-b7bcab184cfb',
    secret: 'sGY5cryqtkWqZPjCoyiyKA=='
});

// sinchApi.messaging.sendSms({number: '+918368917209', message: 'Hello World!'})
//     .then(console.log)
//     .fail(console.log)

module.exports = router;