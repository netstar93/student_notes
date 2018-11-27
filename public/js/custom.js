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
})