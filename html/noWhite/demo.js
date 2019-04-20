var z_go = document.getElementsByClassName('go')[0],
    z_a = document.getElementsByTagName('a')[0],
    z_img = document.getElementsByClassName('im')[0],
    z_main = document.getElementsByClassName('main')[0],
    // colors = ['black','black','black','black'],
    timer = null,
    timer1 = null,
    timer2 = null,
    speed = 5,
    sum = 0,
    flag = true;

var json = {
    top: -600,
};
var json1 = {
    opacity: 0,
};

z_a.onclick = function(){
    startMove(z_go,json,function(){
        startMove(z_img,json1);
    });
    clearTimeout(timer2);
    timer2 = setTimeout(function(){
        run();
    },1000)
}

function run(){
    timer = setInterval(function(){
        z_mainH =  parseInt(getStyle(z_main,'top'));
        z_main.style.top = z_mainH + speed + 'px';
        if(z_mainH >= 0 ){
            createRow();
            z_main.style.top = '-150px';
        }
        var len = z_main.children.length;
        if( len == 6 ) {
            for(var i = 0 ; i< 4 ; i++){
               if( z_main.children[len - 1].children[i].getAttribute('attr') == 'i' ){
                    alert('游戏结束,得分' + sum);
                    clearInterval(timer);
                    flag = false;
                    // console.log(z_main.children[len - 1].children[i]);
               } 
            }
            z_main.children[len-1].remove();
        }
    },20)
}


function createRow(){
    var index = Math.floor(Math.random()*4);
    var row = document.createElement('div');
    row.setAttribute('class','row');
    for(var i = 0 ; i< 4 ; i++){
        var zDiv = document.createElement('div');
        zDiv.style.backgroundColor = "#fff";
        if(index == i ){
            zDiv.style.backgroundColor = "#000";
            zDiv.setAttribute('attr','i');
        }
        row.appendChild(zDiv);
    }
    if( !z_main.children ){
        z_main.appendChild(row);
    }else{
        z_main.insertBefore(row , z_main.children[0]);
    }
    click(row);
    // return row;
}


function click(row){
    var timer3 = null;
    row.addEventListener('click', function (e){
        if(flag){
            var tar = e.target;
            // console.log(tar);
            if(tar.getAttribute('attr')  == 'i'){
                tar.style.backgroundColor = '#3299cc';
                tar.setAttribute('attr','');
                sum++;
            }else{
                tar.style.backgroundColor = "red";
                timer3 = setTimeout(function(){
                    alert('游戏结束,得分' + sum);
                },100)
                clearInterval(timer);
                flag = false;
            }
            if(sum % 10 == 0 ){
                speed ++;
            }
        }
    },false)
    
}

// function startMove(div,target){
//     clearInterval(div.timer1);
//     var iSpeed;
//     div.timer1 =  setInterval(function(){
//         iSpeed = (target - div.offsetTop)/8;
//         if(iSpeed > 0){
//             clearInterval(div.timer);
//             div.style.top = target + 'px';
//         }else{
//             div.style.top = div.offsetTop + iSpeed +'px' ;
//         }
//     },40)
// }

function startMove(div,json,callback){
    var iSpeed,
        iCur;
    div.timer1 = setInterval(function(){
        var oStop = true;
        for(var prop in json){
            if(prop == 'opacity'){
                iCur = parseFloat(getStyle(div ,"opacity"))*100;
            }else{
                iCur = parseInt(getStyle(div , prop));
            }
            iSpeed =( json[prop] - iCur ) / 8 ;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if(prop == 'opacity'){
                div.style.opacity = ( iCur + iSpeed ) / 100;
            }else{
                div.style[prop] = iCur + iSpeed + 'px';
            }
            if(iCur != json[prop]){
                oStop = false;
            }
        }
        if(oStop){
            clearInterval(div.timer1)
            typeof callback == "function" ? callback() : '';
            // console.log(oStop);
        } 
    },30)

}