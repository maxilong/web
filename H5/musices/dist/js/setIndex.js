(function($,root){
    function setIndex(len){
        this.index = 0;
        this.len = len;
    }
    setIndex.prototype = {
        prev:function(){
            return this.getIndex(-1);
        },
        next:function(){
            return this.getIndex(1);
        },
        getIndex:function(num){
            this.index = ( num + this.index + this.len )%this.len;
            return (this.index);
        }
    }
    root.setIndex = setIndex;
})(window.Zepto,window.player||(window.player = {}))