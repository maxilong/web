<template>
    <div class="foods">
        <div class="icon-arrow_lift" @click="ret"></div>
        <div class="foods-icon">
            <img :src="foods.icon" alt="">
        </div>
        <div class="foods-title">
            <div class="title-name">{{foods.name}}</div>
            <div class="title-sell">
                <span class="title-sellCount">月售{{foods.sellCount}}份</span>
                <span class="title-rating">好评率{{foods.rating}}%</span>
            </div>
            <div class="price">
                <span class="newprice">¥{{foods.price}}</span>
                <span class="oldprice" v-show="foods.oldPrice">¥{{foods.oldPrice}}</span>
                <div class="cart">
                    <my-cartcontrol :foods="foods"></my-cartcontrol>   
                </div>
            </div>

        </div>
        <div class="foods-info">
            <div class="info-tit">商品介绍</div>
            <div class="info-text">{{foods.info}}</div>
        </div>
        <div class="ratings">
            <my-appraise :ratings="foods.ratings"></my-appraise>
        </div>
    </div>
</template>

<script>
import myCartcontrol from './cartcontrol.vue';
import myAppraise from './appraise.vue'
import Vue from 'vue';
export default {
    data () {
        return {
            foods:{},
        }
    },
    created () {
        Vue.nextTick(()=>{
            this.getParams();
        });
    },
    methods: {
       getParams(){
           this.foods = this.$route.params.foods;
           console.log(this.$route);
       },
       ret(){
           this.$router.push({
               path:'/goods',
           })
       }
   },
    components:{
        myCartcontrol,
        myAppraise
    },
    watch: {
        '$route'(){
            console.log('aa');
        }
    }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl';
@import '../../static/style.css';
.foods{
    position:absolute;
    height: 100vh;
    top:0;
    left:0; 
    right: 0;
    bottom:0; 
    background-color: #f3f5f7;  
    overflow: auto;
    .icon-arrow_lift{
        width: 24px;
        height: 24px;
        position:absolute;
        top: 18px;
        left: 16px;
        color: rgba(147,153,159,0.5);    
    }
    .foods-icon{
        width: 100%;
        height: 360px;  
        img{
            display:inline-block;
            width: 360px;
        }  
    }
    .foods-title{
        padding: 8px 18px 18px 18px; 
        color:rgb(7,17,27);
        background-color:#fff;
        .title-name{
            font-weight: 700;
            font-size: 14px;
            line-height: 14px;    
        }
        .title-sell{
            margin-top:8px;
            font-size: 10px;
            color: rgb(147,153,159);
            .title-rating{
                margin-left: 12px;    
            }
        }
        .price{
            position: relative;
            .newprice{
                font-size: 14px;
                font-weight: 700;
                color: rgb(240,20,20);
                line-height: 24px;
            }
            .oldprice{
                font-size: 10px;
                font-weight: 700;
                color: rgb(143,153,159);  
                line-height: 24px;
                text-decoration:line-through;
            }
        }
        .cart{
            position: relative;
            right:-20px;
            bottom:-12px;    
        }
    }
    .foods-info{
        margin: 16px 0px;
        padding: 18px;
        background-color: #fff;
        .info-tit{
            color:rgb(7,17,27);
            font-weight: 700;
            font-size: 14px;
            line-height: 14px;
        }
        .info-text{
            margin-top: 6px;
            font-size: 12px;
            font-weight: 200;
            color: rgb(77,85,93);
            line-height: 24px;    
        }
    }
    .ratings{
        position: relative;   
    }
}
</style>
