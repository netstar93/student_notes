$(document).ready(function(){

    $('.download').click(function() {
        var quality = $(this).attr("quality");
        var video_id = $(this).attr("videoid");
        var entity = $(this);
         $(this).attr("clicked" , 1);
        if(typeof video_id != 'undefined') {
            $.ajax({
                url: '/api/generate_video',
                type: 'GET',
                data: {quality: quality, video_id: video_id},
                dataType: 'JSON',
                success: function (data) {
                    entity.hide();
                    entity.siblings('a').attr('href', data.dl_url)
                    entity.siblings('a').find('button').removeClass('hide');
                }
            });
        }
    })

    $('#wiki_query').keypress(function (e) { 
        WikipediaAPISearch();
        if (e.keyCode == 13)
            $('#submit-wiki').click();
    });

$('.suggestions li')  . click(function(this){
    $("#wiki_query").val(this.text);
})
    function WikipediaAPISearch() {
        var txt = $("#wiki_query").val();
        $.ajax({
            type: "GET",
            url: "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + txt + "&callback=?",
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {              
                //console.log(JSON.parse(data[1]));
                $('ul.suggestions').html('');
                $.each(data[1], function (i, item) {
                    
                        var searchData = item;
                        $('ul.suggestions').append("<li>" +item+"</li>")
                        console.log(searchData);
                       // WikipediaAPIGetContent(searchData);
                    
                });
            },
            error: function (errorMessage) {
                console.log(errorMessage);
            }
        });
    }
})