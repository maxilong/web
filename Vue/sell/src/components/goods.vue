<template>
    <div id="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <div v-for="(item,index) in goods" :key="index" class="menu-item" @click="selectIndex(index,$event)" :class="{current: currentIndex === index}">    
                <div class="text-wrapper border-1px">
                    <span class="menu-icon" v-show="item.type >= 0" :class="classMap[item.type]"></span>
                    <span class="menu-text">{{item.name}}</span>
                </div>
            </div>
        </div>
        <div class="foods-wrapper" ref="foodWrapper">
            <ul>
                <li v-for="(items,index) in goods" :key="index" class="foods-list">
                    <div class="foods-title">{{items.name}}</div>
                    <ul>
                        <li v-for="(item1, index) in items.foods" :key="index" class="foods-item border-1px">
                            <div class="foods-content">
                                <div class="clicked" @click="clicked(item1)">
                                    <div class="foods-icon">
                                        <img :src="item1.icon" alt="">
                                    </div>
                                </div>
                                <div class="foods-text">
                                    <div class="foods-name">{{item1.name}}</div>
                                    <div class="foods-description">{{item1.description}}</div>
                                    <div class="foods-show">
                                        <span class="foods-sellCount">月售{{item1.sellCount}}份</span>
                                        <span class="foods-rating">好评率{{item1.rating}}</span>
                                    </div>
                                    <div class="foods-price">
                                        <span class="foods-newprice">¥{{item1.price}}</span>
                                        <span class="foods-oldprice" v-if="item1.oldPrice">¥{{item1.oldPrice}}</span>
                                    </div>
                                    <div class="cart-content">
                                        <my-cartcontrol :foods="item1"></my-cartcontrol>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="cat"></div>
    </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import myCartcontrol from './cartcontrol.vue';
import foods from './foods.vue';
export default {
    props: ["seller","goods","ratings"],
    data () {
        return {
            foodsHeight:[], //每一个模块的头部高度
            scrollY:'',  //当前的高度
            direction:'', //方向
            food:{},
        }
    },
    created() {
        this.classMap = ['decrease','discount','special','invoice','guarantee'];
        Vue.nextTick(()=>{
            this.setScroll();
            this.setHeight();
        });
    },
    components: {
      myCartcontrol,
      foods  
    },
    computed:{
        //获取当前高度的模块的 侧栏的 index 值  
        currentIndex() {
            for (let i = 0; i < this.foodsHeight.length; i++) {
                let height1 = this.foodsHeight[i];
                let height2 = this.foodsHeight[i + 1];
                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    //  判断方向  来进行 index的加
                    if(this.direction === 'bottom'){
                        return i + 1;
                    }else{
                        return i;
                    }
                }
            }
            return 0;
        },
    },
    methods: {
        //向下滚动 向上滚动
        selectIndex($index,$event){
            if($event._constructed){
                return;
            }
            if(this.scrollY < this.foodsHeight[$index]){
                this.direction = 'bottom';
            }else{
                this.direction = 'top';
            }
            // 滚动
            this.scrollTran(this.$refs.foodWrapper,this.scrollY,this.foodsHeight[$index]);
        },
        //添加滚动函数
        setScroll(){
            this.$refs.foodWrapper.addEventListener('scroll', (pos) =>{
                this.scrollY = Math.abs(Math.round(pos.target.scrollTop)); 
                // console.log(this.$refs.foodWrapper.scrollTop);
            },false)
            // console.log(this.goods);
        },
        // 获取每一个模块的高度
        setHeight(){
            let foodList = document.getElementsByClassName('foods-list');
            let height = 0;
            this.foodsHeight.push(height);
            height += 6;
            for(let i = 0 ; i < foodList.length; i++){
                let item = foodList[i]
                height += item.clientHeight;
                this.foodsHeight.push(height);
            }
        },
        //滚动
        scrollTran(div,form,to){
           clearInterval(div.timer);
            var iSpeed,
                iCur;
            div.timer = setInterval(() =>{
                var oStop = true;
                iCur = this.scrollY;
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
        },
        clicked(foods){
            this.food = foods;
            // console.log(this.food);
            this.$router.push({
                name:'foods',
                params:{
                    foods: this.food,
                }
            })
        }
    },
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl';
@import '../../static/style.css';
#goods{
    display: flex;
    width: 100%;
    position: absolute;
    top: 174px;
    bottom: 48px;
    left: 0;
    right: 0;
    overflow: hidden;
    .menu-wrapper{
        flex: 0 0 80px;
        width:80px;
        background-color:#f3f5f7;
        overflow-y:auto;
        // overflow-x:hidden;
        .current {
            position: relative;
            margin-top: -1px;
            background-color: #ffffff;
        }
        .current::after {
          border-top: 1px solid #ffffff;
        }
        .menu-item{
            padding: 0px 12px;
            font-size:12px;
            color:rgb(77,85,93);
            font-weight: 300;
            .text-wrapper{
                display: table-cell;
                height: 54px;
                vertical-align: middle;
                line-height: 14px;
                border-1px(rgba(7,17,27,0.1));  
                .menu-icon{
                    display:inline-block;
                    width: 14px;
                    height:14px;
                    background-size: 14px 14px;
                    vertical-align: text-top;
                }
                .decrease{
                    bg-image('decrease_3')    
                }
                .discount{
                    bg-image('discount_3')    
                }
                .guarantee{
                    bg-image('guarantee_3')    
                }
                .invoice{
                    bg-image('invoice_3')    
                }
                .special{
                    bg-image('special_3')    
                }
            }
            .border-1px{
                width:56px;
                border-1px(rgba(7,17,27,0.1))    
            }  
        }
    }
    .foods-wrapper{
        flex: 1;
        background: #ffffff;
        overflow-y: auto;
        overflow-x:hidden;
        .foods-title{
            width:100%;
            height: 26px;
            background-color: #f3f3f7;
            border-left: 4px solid #d9dde1;
            font-size: 12px;
            color: rgb(147,153,159);
            line-height: 26px;
            padding-left: 14px;
        }
        .border-1px{
            border-1px(rgba(7,17,27,0.1))  
        }
        .foods-item{
            position:relative;
            width: 100%;
            margin: 20px 18px 0px 18px;
            padding-bottom: 20px;
            .foods-content{
                display:flex;  
                .foods-icon{
                    flex: 0 0 57px;
                    width: 57px;
                    height:57px;
                    img{
                        width:100%;
                        height:100%;
                    }    
                }
                .foods-text{
                    flex:1;
                    font-size:10px;
                    color: rgb(147,153,159);
                    line-height: 10px;
                    margin-left: 10px;
                    .foods-name{
                        font-size: 14px;
                        color:rgb(7,17,27);
                        font-weight: 400;
                    }
                    .foods-description{
                        margin-top: 8px;
                        margin-right: 36px;
                        font-size: 10px;  
                        line-height: 16px;  
                    }
                    .foods-show{
                        margin-top: 8px;
                    }
                }
                .foods-price{
                    font-size:20px;
                    line-height:24px;
                    font-weight:700;
                    margin-top: 8px;
                    color:#f01414;
                    .foods-oldprice{
                        font-size: 10px;
                        margin-left: 4px;
                        color:rgb(147,153,159);
                        vertical-align: top;
                        text-decoration:line-through;    
                    }
                }
            }  
        }
    }
    .cat{
        width: 100%;
        height: 48px;
        position: fixed;
        bottom:0;
        left: 0;
    }
}

</style>


