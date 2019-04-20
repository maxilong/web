var z_snake = document.getElementsByClassName('snake')[0],
    timer = null,
    direction = 'left',
    speed = 200,
    H = 10,
    L = 15,
    lock = true,
    ten,
    num = 0;

//渲染蛇  通过设置蛇的l  h  来渲染蛇的坐标;
function setPos(obj){ // 设置蛇的坐标
    obj.div.style.left = obj.l * 40 + 'px';
    obj.div.style.top = obj.h * 40 + 'px';
};

//用一个数组来存储蛇的每一节
var z_snakeArr = [];

//构建初始的蛇
function snake(){
    for(var i = 0 ; i < 5; i++){
        var z_shead = document.createElement('div');
        z_shead.className = 'shead';
        if(i == 0 ){
            //把蛇头设置为最上面
            z_shead.style.zIndex = 2;
        }
        z_snake.appendChild(z_shead);
        //用一个数组来接受每一个蛇结构的 长   高  以及该标签
        z_snakeArr.push({
            l: 4 + i,
            h: 4,
            div: z_shead
        })
        setPos(z_snakeArr[i]);
    }
}
snake();



//食物随机出现  用一个数组接收食物
var z_foodArr = [];

function food(){
    ten = true;
    var z_ftop = Math.floor(Math.random()*10);
    var z_fleft = Math.floor(Math.random()*15);

    //设置食物等于蛇身的话为false
    z_snakeArr.forEach(function(ele){
        if(ele.l == z_fleft && ele.h == z_ftop){
            ten = false;
        }
    })

    //判断食物是否在蛇身上  在false在蛇身上  那么重新执行food
    if(ten){
        //设置食物的class名
        var z_food = document.createElement('div');
        z_food.className = 'sfood';
        z_snake.appendChild(z_food);
        
        //用对象记录食物的长 高 以及 食物的标签
        z_foodArr[0] = {
            h: z_ftop,
            l: z_fleft,
            div:z_food
        }
        setPos(z_foodArr[0]);
    }else{
        food();
    }
}
food();


function startMove(){
    clearInterval(timer);
    timer = setInterval(function (){

        //让身体跟着前面的动
        for(var i = z_snakeArr.length-1; i >0 ; i--){
            z_snakeArr[i].l = z_snakeArr[i-1].l;

            z_snakeArr[i].h = z_snakeArr[i-1].h;
        }
        //让头自己动
        switch(direction){
            case 'left' :  z_snakeArr[0].l-- ; break;
            case 'right': z_snakeArr[0].l++; break;
            case 'top': z_snakeArr[0].h--; break;
            case 'bottom': z_snakeArr[0].h++; break;
        }


        //设置撞墙停止
        if(z_snakeArr[0].h === H || z_snakeArr[0].h < 0){
            clearInterval(timer);
            alert('说好的你的蛇皮走位呢 ' + num + '分')
            lock = false;
        }else if(z_snakeArr[0].l === L || z_snakeArr[0].l < 0){
            clearInterval(timer);
            alert('说好的你的蛇皮走位呢 ' + num + '分')
            lock = false;
        }

        //设置撞自己停止
        for(var i = 1 ; i< z_snakeArr.length ; i++){
            if(z_snakeArr[0].l == z_snakeArr[i].l && z_snakeArr[0].h == z_snakeArr[i].h ){
                clearInterval(timer);
                alert('心里没点数  ' + num + '分');
                lock = false;
            }
        }

        //点击操作  并且返回想哪运动   并且不能点击相反的
        document.onkeydown = function(e){
            var event = e || window.event;
            var key = event.keyCode;
            if(key == 37 && direction != 'right'){
                direction = 'left';
            }else if(key == 38 && direction != 'bottom'){
                direction = 'top';
            }else if(key == 39 && direction != 'left'){
                direction = 'right';
            }else if(key == 40 && direction != 'top'){
                direction = 'bottom';
            }
            // switch(key){
            //     case 37: direction = 'left'; break;
            //     case 38: direction = 'top'; break;
            //     case 39: direction = 'right'; break;
            //     case 40: direction = 'bottom'; break;
            //     case 32: direction = 'start'; break;
            //     case 83: direction = 'stop'; break;
            // }
            //判断是否为撞死  然后继续进行运动
            if(lock){
                startMove();
            }
        };
        //设置吃食物
        // 删除上一个食物  建立下一个食物
        // 添加一个身体
        if(z_snakeArr[0].l == z_foodArr[0].l && z_snakeArr[0].h == z_foodArr[0].h){
            z_foodArr[0].div.remove();
            food();
            num++;
            creates();
        }
        //创建身体  
        function creates(){
            var z_shead = document.createElement('div');
            z_shead.className = 'shead';
            z_shead.style.left = (L + 1)  * 40 + 'px';
            z_shead.style.top = ( H + 1 ) * 40 + 'px';
            z_snake.appendChild(z_shead);
            z_snakeArr.push({
                div: z_shead
            })
        }

        //  渲染蛇  如果不渲染那么蛇不走
        for(var i = 0 ; i < z_snakeArr.length ; i++){
            setPos(z_snakeArr[i]);
        } 
    }
    ,speed)}

startMove();

//判断当蛇多长时加速度
if(z_snake.children.length % 10 == 0 ){
    speed = speed / 2;
}




















//蛇运动函数
// function run(){
//     var z_width = 40;
//     if(direction == 'left' || direction == 'top'){
//         z_width *= -1;
//     }
//     for(var i = 0 ; i < z_snakeArr.length ; i ++){
//         if(i>0){
//             if(direction == 'left' || direction == 'right'){
//                 z_snakeArr[i].div.offsetLeft = z_snakeArr[i-1].div.offsetLeft;
//             }else if(direction == 'top' || direction == 'bottom'){
//                 z_snakeArr[i].div.offsetTop = z_snakeArr[i-1].div.offsetTop;
//             }
//         }
//         if(direction == 'left' || direction == 'right'){
//             z_snakeArr[i].div.style.left = z_snakeArr[i].offsetLeft + z_width + 'px'; 
//         }else if(direction == 'top' || direction == 'bottom'){
//             z_snakeArr[i].div.style.top = z_snakeArr[i].offsetTop + z_width + 'px';
//         }
//     }
//     if(z_snakeArr[0].offsetTop == z_snake.offsetHeight || z_snakeArr[0].offsetTop > 0){
//         clearInterval(timer);
//     }else if(z_snakeArr[0].offsetLeft == z_snake.offsetWidth || z_snakeArr[0].offsetLeft > 0){
//         clearInterval(timer);
//     }
//     document.onkeydown = function(e){
//         var event = e || window.event;
//         var key = event.keyCode;
//         switch(key){
//             case 37: direction = 'left'; break;
//             case 38: direction = 'top'; break;
//             case 39: direction = 'right'; break;
//             case 40: direction = 'bottom'; break;
//             case 32: direction = 'start'; break;
//             case 83: direction = 'stop'; break;
//         }
//         run();
//     };
// }

// function getStyle(ele,prop){
//     if(window.getComputedStyle){
//         return  window.getComputedStyle(ele,null)[prop];
//     }else{
//         return ele.currentStyle[prop];
//     }
// }


// function starMove(div , json , callback){
//     clearInterval(div.timer);
//     var iSpeed,
//         iCur;
//     div.timer = setInterval(function(){
//         var oStop = true;
//         for(var prop in json){
//             if(prop == 'opacity'){
//                 iCur = parseFloat(getStyle(div,prop)) * 100;
//             }else{
//                 iCur = parseInt(getStyle(div,prop));
//             }
//             iSpeed = (json[prop] - iCur) / 8;
//             iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
//             if(prop == 'opacity'){
//                 div.style.opacity = (iCur + iSpeed) / 100;
//             }else{
//                 div.style[prop] = iCur + iSpeed + 'px';
//             }
//             if(iCur != json[prop]){
//                 oStop = false;
//             }
//         }
//         if(oStop){
//             clearInterval(div.timer);
//             typeof callback == 'function' ? callback() : '';
//         }
//     },30)
// }