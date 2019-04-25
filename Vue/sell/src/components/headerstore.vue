<template>
    <div class="header-store">
        <div class="store-bg"></div>
        <div class="store-title">{{seller.name}}</div>
        <div class="store-score">
            <span v-for="(item,index) in scoreArr" :key="index">
                <span  class="score-icon" :class="item"></span>
            </span>
        </div>
        <div class="store-favorable">
            <div class="favorable-title">优惠信息</div>
            <div class="favorable-supports" v-for="(item , index) in seller.supports" :key="index">
                <span class="supports-icon"></span>
                <span class="supports-text">{{item.description}}</span>
            </div>
        </div>
        <div class="store-notice">
            <div class="notice-title">商家公告</div>
            <div class="notice-text">{{seller.bulletin}}</div>
        </div>
        <router-link :to="{path:'/goods'}">
            <div class="store-clear icon-close">
            </div>
        </router-link>
    </div>
</template>

<script>
import Vue from "vue";
export default {
    props: ["seller"],
    data () {
        return {
            msg:'ssssss',
            scoreArr:[],
        }
    },
    created () {
        Vue.nextTick(() => {
            this.star(this.seller.score,this.scoreArr);
        })
    },
    methods:{
        star(score,Arr){
            let sco = Math.round(score);
            for(let i = 0 ; i <= score; i++){
                if(sco <= 5){
                    if(score - i >= 1 || score - i == 0){
                        Arr.push('on');
                    }else if(score - i >= 0.5 && score - i < 1){
                        Arr.push('half');
                    }else{
                        Arr.push('');
                    }
                }
            }
        },
    }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl';
@import '../../static/style.css';
.header-store{
    height: 100vh;
    width: 100vw;
    position:relative;
    overflow: hidden;
    .store-bg{
        position: absolute;
        left:-6px;
        top:-6px;
        height: 102%;
        width: 102%;
        background-color: rgba(7,17,27,0.6);
        filter: blur(10px);
        z-index:-1;
    }
    .store-title{
        margin:64px 0px 28px 0px;
        text-align: center;
        font-size: 16px;
        font-weight : 700;
        color: #fff;
        line-height: 16px;
    }
    .store-score{
        text-align:center;
        margin: 11px 0px 28px 0px;
    }
    .score-icon{
        display:inline-block;
        width: 24px;
        height: 24px; 
        bg-image('star24_off');
    }
    .on{ 
        bg-image('star24_on');
    }
    .half{
        bg-image('star24_half');    
    }
    .favorable-title, .notice-title{
        font-size: 14px;
        font-weight: 200;
        color: #fff;
        line-height: 14px;
        text-align: center;  
        vertical-align: middle;  
    }
    .favorable-title::before, .favorable-title::after, .notice-title::before, .notice-title::after{
        content: "";
        display: inline-block;
        height: 1px;
        width: 112px;
        background-color: rgba(255,255,255,0.4);
        vertical-align:middle;
    }
    .favorable-title::before, .notice-title::before{
        margin-right: 12px;    
    }
    .favorable-title::after, .notice-title::after{
        margin-left: 12px;    
    }
    .store-favorable{
        margin-bottom:28px; 
        .favorable-supports{
            margin:6px 48px;
            .supports-text{
                font-size: 12px;
                font-weight 200;
                color:#fff;
                line-height:24px; 
            }       
        }
        .favorable-supports:first-child{
            margin-top: 12px;    
        }
        .favorable-supports:nth-of-type(2)>.supports-icon{
            display:inline-block;
            width: 24px;
            height: 24px;
            bg-image('discount_1');
        }
        .favorable-supports:nth-of-type(3)>.supports-icon{
            display:inline-block;
            width: 24px;
            height: 24px;
            bg-image('decrease_1');
        }
        .favorable-supports:nth-of-type(4)>.supports-icon{
            display:inline-block;
            width: 24px;
            height: 24px;
            bg-image('discount_1');
        }
        .favorable-supports:nth-of-type(5)>.supports-icon{
            display:inline-block;
            width: 24px;
            height: 24px;
            bg-image('invoice_1');
        }
        .favorable-supports:nth-of-type(6)>.supports-icon{
            display:inline-block;
            width: 24px;
            height: 24px;
            bg-image('guarantee_1');
        }
        .favorable-supports>.supports-icon{
            vertical-align: top;    
        }
    }
    .notice-text{
        margin: 24px 48px;
        font-size: 12px;
        font-weight: 200;
        color: rgba(255,255,255,0.8);
        line-height:24px;
    }
    .store-clear{
        position: absolute;
        bottom: 68px;
        left: 50%;
        margin-left: -16px;
        font-size: 32px;
        color:rgba(255,255,255,0.5);
        z-index: 99;   
    }
}
</style>

