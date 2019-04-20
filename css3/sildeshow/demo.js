(function($){

    function Slider(ele,opt){
        var d = {
            curDisplay:0,
            autoPlay:false,
            interval: 2000,
        };
        this.opts = $.extend({},d,opt);
        this.wrap = ele;
        this.curDisplay = this.opts.curDisplay;
        this.autoPlay = this.opts.autoPlay;
        this.interval = this.opts.interval;
        this.imgs = this.wrap.find('img');
        this.imgLen = this.imgs.length;
        this.timer = null;
        this.init();
    }
    Slider.prototype.init = function(){
        this.initMove();
        this.bindEvent();
    }
    Slider.prototype.initMove = function(){
        var lNum,rNum;
        var mean = Math.floor(this.imgLen/2);
       for(var i = 0 ; i < mean; i++){
           lNum = this.curDisplay-i-1;
           this.imgs.eq(lNum).css({
               'transform':'translateX('+(-150*(i+1))+'px) translateZ('+(200-(i*100))+'px) rotateY(30deg)',
           })

           rNum = this.curDisplay+i+1;
           if(rNum > (this.imgLen - 1)){
                rNum -= this.imgLen;
           }

           this.imgs.eq(rNum).css({
               'transform':'translateX('+(150*(i+1))+'px) translateZ('+(200-(i*100))+'px) rotateY(-30deg)',
           })
       }
       this.imgs.eq(this.curDisplay).css({
           'transform':'translateZ(300px)'
       })
    }
    Slider.prototype.bindEvent = function(){
        var that = this;
        this.wrap.on('click','img',function(){
            that.curDisplay = $(this).index();
            that.initMove();
        }).hover(function(){
            clearInterval(that.timer);
        },function(){
            that.timer = setInterval(function(){
                that.plays();
                that.initMove();
            },that.interval);
        })
        this.timer = setInterval(function(){
            that.plays();
            that.initMove();
        },this.interval);
    }
    Slider.prototype.plays = function(){
        if(this.curDisplay == this.imgLen-1){
            this.curDisplay = 0;
        }else{
            this.curDisplay++;
        }
        
    }
    $.fn.extend({
        slider:function(opt){
            new Slider(this,opt);
        }
    })
})(jQuery)