
// var player = {};
var root = window.player,
    index = 0,
    $ = window.Zepto,
    $scope = $(document.body),
    dataJson,
    control,
    audio = new root.audioPlay();
function changes(){
    root.init(dataJson[index]);
    root.main.overTime(dataJson[index].duration);
    root.main.start(0);
}
function bingEvent() {
    $('.prev').on('click', function () {
        index = control.prev();
        changes();
        $scope.trigger("play:change", index);
    })
    $('.next').on('click', function () {
        index = control.next();
        changes();
        $scope.trigger("play:change", index);
    })
    $scope.on('play:change', function (e, index) {
        audio.getAudio(dataJson[index].audio);
        if (audio.status == "play") {
            audio.play();
        }
    })
    $('.play').on('click', function () {
        if (audio.status == "pause") {
            audio.play();
            root.main.start();
        } else {
            audio.pause();
            root.main.stop();
        }
        $(this).toggleClass("playing");
    })
}
function bindTouch() {
    var $slider = $('.sider-point');
    var offset = $('.time-down').offset();
    var left = offset.left;
    var width = offset.width;
    $slider.on('touchstart', function (e) {
        root.main.stop();
    }).on('touchmove', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per > 0 && per <= 1) {
            root.main.upStart(per);
        }
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per > 0 && per <= 1) {
            var curTime = per * dataJson[index].duration;
            audio.playTo(curTime);
            $scope.find('.play').addClass('playing');
            audio.status = 'play';
            root.main.start(per);
        }
    })
}


function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            bingEvent();
            bindTouch();
            dataJson = data;
            control = new root.setIndex(dataJson.length);
            root.init(dataJson[index]);
            root.main.overTime(dataJson[index].duration);
            console.log(dataJson);
            // $scope.trigger('play:change',0);
            $scope.trigger("play:change", 0);
        },
        error: function () {
            console.log('error');
        }
    })
}
getData("/dist/mock/data.json");