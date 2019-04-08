(function($,root){
    var $scope = $('body');
    function addDom(data){
        var html = '<div class="song-name">'+ data.song +'</div>\
        <div class="song-singer">'+ data.singer +'</div>\
        <div class="song-album">'+ data.album +'</div>';
        $scope.find('.song-text').html(html);
    }
    function addImg(src){
        var img = new Image();
        img.src = src;
        img.onload = function(){
            root.blurImg(img,$scope);
            $('.song-image img').attr('src',img.src);
        }
    }
    function renderlike(data){
        if(data){
            $('.like').addClass('liking');
        }else{
            $('.like').removeClass('liking');
        }
    }
    function init(data){
        addDom(data);
        addImg(data.image);
        renderlike(data.isLike);
    }
    root.init = init;

})(window.Zepto,window.player || (window.player={}))