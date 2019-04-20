(function(){
    //初始的图片摆放位置 
    //点击开始 图片乱序
    //点击复原  图片回到原来排序
    //当为开始时不能拖拽  乱序才能拖拽  
    var main = document.getElementById('main'),
        btn = document.getElementById('btn');
    var obj = {
        //入口函数  创建函数
        init:function(main,btn){
            this.main = main;
            this.btn = btn;
            this.mainW = parseInt(window.getComputedStyle(this.main).width);
            this.mainH = parseInt(window.getComputedStyle(this.main).height);
            this.newArr = [];
            this.initArr = [];
            this.flag = true;
            for(var i = 0 ; i<3; i++){
                for(var j = 0 ; j<3; j++){
                    this.initArr.push(i*3+j);
                    var div = document.createElement('div');
                    div.className = 'item';
                    div.style.width = this.mainW/3+'px';
                    div.style.height = this.mainH/3+'px';
                    div.style.left = this.mainH/3 * j + 'px';
                    div.style.top = this.mainW/3 * i + 'px';
                    div.style.backgroundPosition = (this.mainW/3 * -j + 'px ')+ (this.mainH/3 * -i+'px');
                    this.main.appendChild(div);
                }
            }
            this.len = this.initArr.length;
            this.item = document.getElementsByClassName('item');
            this.bindEvent();
            
        },
        //渲染函数
        createEvents:function(arr){
            for(var i = 0 ; i < this.len ; i ++){
                this.item[i].style.left = this.mainW/3 * (arr[i]%3) + 'px';
                this.item[i].style.top = this.mainH/3 * Math.floor(arr[i]/3) +'px';
            }
        },
        //乱序函数
        arrRadom:function(arr){
            var arr = [];
            for(var i = 0 ; i < this.len;i++){
                arr.push(this.initArr[i]);
            }
            arr.sort(function(){
                return Math.random() - 0.5;
            });
            return arr;
        },
        //点击函数
        bindEvent:function(){
            var that = this;
            this.btn.addEventListener('click',function(){
                if(that.flag){
                    that.flag = false;
                    that.newArr = that.arrRadom();
                    that.createEvents(that.newArr);
                    for(var i = 0 ; i <that.len ; i ++){
                        that.drag(that.main.children[i],i);
                    }
                    that.btn.innerHTML = '复原';
                }else{
                    that.flag = true;
                    that.createEvents(that.initArr);
                    that.btn.innerHTML = '开始';
                }
            },false)

        },
        //拖拽函数
        drag:function(dom,index){
            var disX,
                disY,
                target,
                that = this;

            dom.addEventListener('mousedown',function(e){
                target = e.target;
                disX = e.clientX - target.offsetLeft;
                disY =  e.clientY - target.offsetTop;
                document.addEventListener('mousemove',move,false)
                document.addEventListener('mouseup',function(e){
                    target.style.zIndex = 1;
                    var top = e.clientY - that.main.offsetTop;
                    var left = e.clientX - that.main.offsetLeft;
                    console.log(top,left);
                    // console.log(index);
                    var index1 = that.changeIndex(left,top,index);
                    console.log(index1);
                    if(index == index1){
                        that.nochangeArr(index1);
                    }else{
                        that.changeArr(index,index1);
                    }
                    document.removeEventListener('mousemove',move);
                })
            },false)
            function move(e){
                target.style.left = e.clientX - disX + 'px';
                target.style.top = e.clientY - disY + 'px';
                target.style.zIndex = 99;
            }
        },

        changeIndex: function(x,y,index){
            if(x<0|| x>this.mainW || y<0 || y>this.mainH){
                return index;
            }
            var rowL = Math.floor(x/(this.mainW / 3));
            var rowT = Math.floor(y/(this.mainH / 3));
            var sum = rowT*3 + rowL;
            for(var i = 0 ; i <this.len ; i++){
                if(this.newArr[i] == sum){
                    return i;
                }
            }
        },
        //变换两个图片的唯一标识函数
        changeArr:function(index,index1){
            var row = Math.floor(this.newArr[index] / 3);
            var clo = this.newArr[index] % 3;

            var row1 = Math.floor(this.newArr[index1] / 3);
            var clo1 = this.newArr[index1] % 3;

            var timp = this.newArr[index];

            var zdiv = this.index;
            var zdiv1 = this.main.children[index1];

            zdiv.style.top = row1 * this.mainH / 3 + 'px';
            zdiv.style.left =  clo1 * this.mainW / 3 + 'px';
            
            zdiv1.style.top = row * this.mainH / 3 + 'px';
            zdiv1.style.left = clo * this.mainW / 3 + 'px';

            this.newArr[index] = this.newArr[index1];
            this.newArr[index1] = timp; 
            this.contrast(this.initArr,this.newArr);

        },
        nochangeArr:function(index){
            var row = Math.floor(this.newArr[index] / 3);
            var clo = this.newArr[index] % 3;
            var zdiv = this.main.children[index];
            zdiv.style.top = row * this.mainH / 3 + 'px';
            zdiv.style.left = clo * this.mainW / 3+ 'px';
        },
        //比较函数  用toString
        contrast:function(arr,arr1){
            if(arr.toString() == arr1.toString()){
                alert('right');
                this.btn.innerHTML = '开始';
            }
        },
    };

    obj.init(main,btn);
    
})()
