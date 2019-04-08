(function ($, root) {
    // function playChange(){

    // }
    //渲染总时间   更新播放过的时间  更新进度条   拖拽进度条
    var frameId,
        lastStart = 0,
        curData,
        startTime;
    function overTime(time) {
        curData = time;
        time = change(time);
        $('.over').html(time);
    }
    function change(time) {
        time = Math.round(time);
        var m = Math.floor(time / 60);
        var s = time - m * 60;
        if (m < 10) {
            m = '0' + m;
        }
        if (s < 10) {
            s = '0' + s;
        }
        time = m + ':' + s;
        return time;
    }
    function upStart(per) {
        var time = per * curData;
        time = change(time);
        $('.start').html(time);
        var tranX = (per - 1) * 100 + '%';
        $('.time-up').css({
            transform: 'translateX(' + tranX + ')',
        })
    }
    function start(per) {
        cancelAnimationFrame(frameId);
        lastStart = per === undefined ? lastStart : per;
        startTime = new Date().getTime();
        function frame() {
            var newStart = new Date().getTime();
            var precent = lastStart + (newStart - startTime) / (curData * 1000);
            upStart(precent);
            frameId = window.requestAnimationFrame(frame);
        }
        frame();
    }
    function stop() {
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastStart = lastStart + (stopTime - startTime) / (curData * 1000);
    }
    root.main = {
        overTime: overTime,
        start: start,
        stop: stop,
        upStart: upStart,
    }
})(window.Zepto, window.player || (window.player = {}))