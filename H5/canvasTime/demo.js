var myCanvas = document.getElementById('myCanvas');
var ctx = myCanvas.getContext('2d');

ctx.strokeStyle = '#00ffff';
ctx.lineWidth = 15;

ctx.shadowColor = '#00ffff';
ctx.shadowBlur = 15;


function randerTime(){
    var date = new Date();
    var str = date.toDateString();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var ms = date.getMilliseconds();
    var rs = s + ms / 1000;
    var rm = m + (s + ms / 1000) / 60;
    var rh = h + (m + (s + ms / 1000) / 60) / 12;

    //渲染背景;    
    var bg = ctx.createRadialGradient(250,250,5,250,250,300);
    bg.addColorStop(0,'#03303a');
    bg.addColorStop(1,'#000');
    ctx.fillStyle = bg;
    ctx.fillRect(0,0,500,500);
    //渲染外层小时
    ctx.beginPath();
    ctx.arc(250,250,200,deg(270),deg(rh*30 - 90));
    ctx.stroke();
    //渲染中层分钟
    ctx.beginPath();
    ctx.arc(250,250,170,deg(270),deg(rm*6 - 90));
    ctx.stroke();
    //渲染里层秒
    ctx.beginPath();
    ctx.arc(250,250,140,deg(270),deg(rs*6 - 90));
    ctx.stroke();
    // 渲染字体
    ctx.font = "25px Helvetica";
    ctx.fillStyle = 'rgba(0, 255, 255, 1)';
    ctx.fillText(str, 150, 250);
    
    // 渲染时间
    ctx.font = "25px Helvetica";
    ctx.fillStyle = 'rgba(0, 255, 255, 1)';
    //兼容时间  当为1位的话  前面补0
    var h = ('0' + h).slice(-2);
    var m = ('0' + m).slice(-2);
    var s = ('0' + s).slice(-2);
    ctx.fillText(h + ':' + m + ':' + s + ':' + ms, 150,280);
}
function deg(oc){
    return oc*(Math.PI / 180);
}
setInterval(randerTime,40)


