//求当前滚动条的滚动 的 x  和  y   适应于所有浏览器 
function getScorllOffset() {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    } else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}


// 求当前可视窗口的宽窄  适用于所有浏览器   viewprot  可视的
//  document.compatMode  判断 是否是正常模式或者怪异模式
// CSS1Compat正常模式      BackCompat怪异模式 
function getViewportOffset() {
    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    } else {
        if (document.compatMode === "BackCompat") {
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            }
        } else {
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            }

        }
    }
}



// 查看当前元素的所有属性值
// 传入dom元素  以及'属性' 必须是字符串的
function getStyle(ele, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(ele, null)[prop];
    } else {
        return ele.currtentStyle[prop];
    }
}

// 封装一个函数兼容所有浏览器的 任意事件 任意方法 任意dom元素
function addEvent(ele, type, fn) {
    if (ele.addEventListener) {
        ele.addEventListener(type, fn, false);
    } else if (ele.attachEvent) {
        ele.attachEvent(("on" + type), function () {
            fn.call(ele);
        })
    } else {
        ele["on" + type] = fn;
    }
}

// 清除事件
function removeEvent(elem, type, handler) {
    if (elem.removeEventListener) {
        elem.removeEventListener(type, handler, false);
    } else if (elem.detachEvent) {
        elem.detachEvent('on' + type, handler);
    } else {
        elem['on' + type] = null;
    }
}


// 封装insertAfter 和insertBefore用法一样
Element.prototype.insertAfter = function (a, b) {
    var par = b.nextElementSibling;
    if (par) {
        this.insertBefore(a, par);
    } else {
        this.appendChild(a);
    }
}

// 取消事件冒泡 
function stopBubble(e) {
    var event = e || window.event;
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}

// 阻止默认事件  
function cancelHandler(e) {
    var event = e || window.event;
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}


// 查看数据类型
function type(target) {
    var typeStr = typeof (target),
        toStr = Object.prototype.toString,
        objStr = {
            "[object Object]": "object - Object",
            "[object Array]": "array - Object",
            "[object Number]": "number - Object",
            "[object Boolean]": "boolean - Object",
            "[object String]": "string - Object"
        }
    if (target === null) {
        return null;
    } else if (typeStr === "function") {
        return "function";
    }
    if (typeStr !== "object") {
        return typeStr;
    } else {
        return objStr[toStr.call(target)];
    }
}


// 拖东西 跟着鼠标移动
function drag(elem) {
    var disX,
        disY;
    addEvent(elem, 'mousedown', function (e) {
        var event = e || window.event;
        disX = event.clientX - parseInt(getStyle(elem, 'left'));
        disY = event.clientY - parseInt(getStyle(elem, 'top'));
        addEvent(document, 'mousemove', mouseMove);
        addEvent(document, 'mouseup', mouseUp);
        stopBubble(event);
        cancelHandler(event);
    });
    function mouseMove(e) {
        var event = e || window.event;
        elem.style.left = event.clientX - disX + "px";
        elem.style.top = event.clientY - disY + "px";
    }
    function mouseUp(e) {
        var event = e || window.event;
        removeEvent(document, 'mousemove', mouseMove);
        removeEvent(document, 'mouseup', mouseUp);
    }
}



//js异步加载
function asyncLoaded(url, callback) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    if (script.readyState) {//IE
        script.onreadystatechange = function () {
            if (script.readyState == "complete" || script.readyState == "loaded") {
                obj[callback]();
                script.onreadystatechange = null;
            }
        }
    } else {//chrome safari firefox
        script.onload = function () {
            obj[callback]();
        }
    }
    script.src = url;
    document.head.appendChild(script);
}


// 深度克隆
function deepClone(origin, target) {
    var str = Object.prototype.toString,
        arrstr = '[object Array]';
    for (var prop in origin) {
        if (origin.hasOwnProperty(prop)) {
            if (typeof (origin[prop]) == 'object') {
                if (str.call(origin[prop]) == arrstr) {
                    target[prop] = [];
                } else {
                    target[prop] = {};
                }
                deepClone(origin[prop], target[prop]);
            } else {
                target[prop] = origin[prop];
            }
        }
    }
    return target;
}


// 圣杯模式
function inherte(Origin, Target) {
    function X() { };
    X.prototype = Origin.prototype;
    Target.prototype = new X();
    Target.prototype.constructor = Target;
    Target.prototype.uper = Origin.prototype;
}


//document.getClass   是写在  Document.prototype上的
Document.prototype.getClassName = function(className){
    // 把类数组变为数组   改变slice的this指向  获取从0 到最后的所有的属性值
    var allClassArr = Array.prototype.slice.call(document.getElementsByTagName('*'),0);
    var filterArr = [];
    // 消除空格只剩下class中间名
    function  deepClass(dom){
        var reg = /\s+/g;
        //把className里面的好多空格替换为一个空格  并且把字符串两边空格清除   trim 清除字符串两边空格
        var arrClassName = dom.className.replace(reg,' ').trim();
        return arrClassName;
    }
    //先把类数组变为数组
    allClassArr.forEach(function (ele,index){
        // 把当前的className拆分为数组里面的有每个class名
        var arr = deepClass(ele).split(' '); 
        for(var i = 0 ; i < arr.length ; i++){
            if(arr[i] == className){
                filterArr.push(ele);
        //添加过当前的ele后就结束  不再往后判断当前的ele  节省效率 
                break;
            }
        }
    });
    return filterArr;
}



//缓冲多物体多值链式运动框架
function bufferMove(div , json , callback,time){
    clearInterval(div.timer);
    var iSpeed,
        iCur;
    div.timer = setInterval(function(){
        var oStop = true;
        for(var prop in json){
            if(prop == 'opacity'){
                iCur = parseFloat(getStyle(div,prop)) * 100;
            }else{
                iCur = parseInt(getStyle(div,prop));
            }
            iSpeed = (json[prop] - iCur) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if(prop == 'opacity'){
                div.style.opacity = (iCur + iSpeed) / 100;
            }else{
                div.style[prop] = iCur + iSpeed + 'px';
            }
            if(iCur != json[prop]){
                oStop = false;
            }
        }
        if(oStop){
            clearInterval(div.timer);
            typeof callback == 'function' ? callback() : '';
        }
    },time)
}

// 防抖功能
function debounce(handler,delay){
    var timer = null;
    return function(){
        var that = this,
            arg = arguments;
        clearTimeout(timer);
        timer = setTimeout(function(){
            handler.apply(that,arg);
        },delay)
    }
}


// 节流功能
function throttle(handler,delay){
    var lastTime = 0;
    return function(){
        var newTime = new Date().getTime();
        if(newTime - lastTime >= delay){
            handler.apply(this,arguments);
            lastTime = newTime;
        }
    }
}



//ajax 调用封装  参数 'GET' , 地址 , 地址问号后跟的 , 回调函数 获取到数据要干的事情 , true是否异步
function ajaxFun(method,url,date,callback,flag){
    var xhr ;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest(); 
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHttp');
    }
    method = method.toUpperCase();
    if(method == 'GET'){
        xhr.open(method , url + '?' + date, flag);
        xhr.send();
    }else if(method == 'POST'){
        xhr.open(method,url,flag);
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        xhr.send(date);
    }

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                callback(xhr.responseText);
            }
        }
    }
}

// cookie 的增删该查的方法
var manageCookie = {
    setCookie:function(name,value,time){
        if(typeof time == 'number'){
            document.cookie = name+'='+value+'; '+'max-age=' + time ;
        }else if(typeof time == 'object'){
            document.cookie = name+'='+value+'; '+'expires=' + time ;
        }
        return this;
    },
    getCookie:function(name,callback){
        var arr = document.cookie.split('; ');
        for(var i = 0 ; i < arr.length; i++){
            var itemArr = arr[i].split('=');
            if(itemArr[0] == name){
                callback(itemArr[1]);   
                break;
            }
        }
        return this;
    },
    removeCookie:function(name){
        this.setCookie(name,'',-1); 
        return this;
    },
}; 

window.requestAnimationFrame = (function(){
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame || function(callback){
                window.setTimeout(callback,1000/60);
            }
})()

window.cancelAnimationFrame = (function(){
    return window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame || function(id){
                window.clearTimeout(id);
            }
})()

//  函数组合  按照数组逐个执行
function compose(...arg){
    return function(x){
        return arg.reduceRight(function(prev,next,index){
            return next(prev);
        },x)
    }
}


//柯里化前奏函数
function FiexdParamCurry(fn){
    let arg = Array.prototype.slice.call(arguments,1);
    return function(){
        let _arg = Array.prototype.slice.call(arguments,0);
        return fn.apply(this,arg.concat(_arg));
    }
}
//  函数柯里化   实现把传入多个参数变为多次传参链式调用
//  fn(a,b,c);  --->  fn(a)(b)(c);

function curry(fn,length){
    var length = length || fn.length //  fn.length 取得是 函数传入多少形参
    return function(){
        if(arguments.length < length){ 
            var combined = [fn].concat([].slice.call(arguments,0));
            return curry(FiexdParamCurry.apply( this , combined), length-arguments.length);
        }else{
            return fn.apply(this,arguments);
        }
    }
}

// 数组扁平化 ---->   数组的降维操作  把多维数组变为一维数组
Array.prototype.flatten = function(){
    var result = [];
    this.forEach(function(item){
        Object.prototype.toString.call(item) === '[object Array]' ? result = result.concat(item.flatten()) : result.push(item);
    })
    return result;
}
//滚动条原生滚动
var scrollY;
//每次滚动完获取的下一次起始的滚动值
div.on('scroll',(e)=>{
    scrollY = e.target.scrollTop;
})
function scrollTran(div,to){
    clearInterval(div.timer);
     var iSpeed,
         iCur;
     div.timer = setInterval(() =>{
         var oStop = true;
         iCur = scrollY;  //  scrrollY 为起始的位置  在外面获取好的
         iSpeed = (to - iCur) / 8;
         iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
         div.scrollTo(0,iCur + iSpeed);
         if(iCur != to){
             oStop = false;
         }
         if(oStop){
             clearInterval(div.timer);
         }
     },30)
 }