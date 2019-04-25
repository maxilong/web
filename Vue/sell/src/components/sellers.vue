<template>
    <div class="sellers">
        <div class="sellers-cont">
            <div class="seller-tit">
                <div class="seller-name">{{seller.name}}</div>
                <div class="star">
                    <span v-for="(item,index) in scoreArr" :key="index">
                        <span class="star-icon" :class="item"></span>
                    </span>
                    <span class="star-ratingCount">({{seller.ratingCount}})</span>
                    <span class="star-sellCount">月售{{seller.sellCount}}单</span>
                </div>
                <div class="love">
                    <div class="love-icon">
                        <span class="icon icon-favorite" @click="chexd" :class="{red: flag}"></span>
                    </div>
                    <div class="love-text">
                        <span class="text">{{loveText}}</span>
                    </div>
                </div>
            </div>
            <div class="seller-time">
                <div class="time-minPrice">
                    <div class="minPrice-text">
                        <span>起送价</span>
                    </div>
                    <div class="minPrice-price">
                        <span class="minPrice-t">{{seller.minPrice}}</span>
                        <span class="rmb">元</span> 
                    </div>
                </div>
                <div class="time-deliveryPrice">
                    <div class="deliveryPrice-text">
                        <span>商家配送</span>
                    </div>
                    <div class="deliveryPrice-price">
                        <span class="deliveryPrice-t">{{seller.minPrice}}</span>
                        <span class="rmb">元</span> 
                    </div>
                </div>
                <div class="time-deliveryTime">
                    <div class="time-text">
                        <span>平均配送时间</span>
                    </div>
                    <div class="deliveryTime-time">
                        <span class="deliveryTime-t">{{seller.deliveryTime}}</span>
                        <span class="rmb">元</span> 
                    </div>
                </div>
            </div>
            <div class="seller-bulletin">
                <div class="notice-tit">公告与活动</div>
                <div class="notice-text">{{seller.bulletin}}</div>
            </div>
            <div class="supports">
                <div class="supports-cont" v-for="(item,index) in seller.supports" :key="index">
                    <span class="supports-icon" v-show="item.type >= 0" :class="classMap[item.type]"></span>
                    <span class="supports-text">{{item.description}}</span>
                </div>
            </div>
            <div class="image">
                <div class="image-tit">商家实景</div>
                <div class="image-cent">
                    <div class="image-cont" v-for="(item,index) in seller.pics" :key="index">
                        <img :src="item" alt="">
                    </div>
                </div>

            </div>
            <div class="seller-infos">
                <div class="infos-tit">商家信息</div>
                <div class="infos-text" v-for="(item,index) in seller.infos" :key="index">
                    <div class="text-infos">{{item}}</div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import Vue from "vue";
export default {
    props: ["seller"],
    data () {
        return {
            msg:'fdsads',
            scoreArr:[],
            loveText:'收藏',
            flag: false,
        }
    },
    created () {
        this.classMap = ['decrease','discount','special','invoice','guarantee'];
        Vue.nextTick(()=>{
            this.star(this.seller.score, this.scoreArr);
        })
    },
    methods: {
        star(score,Arr){
            let sco = Math.round(score);
            for(let i = 0 ; i <=score; i++){
                if(sco <= 5){
                    if(score - i >= 1 || score - i == 0){
                        Arr.push('on');
                    }else if(score - i >= 0.5 && score - i < 1){
                        Arr.push('half');
                    }else{
                        Arr.push(0);
                    }
                }
            }
        },
        chexd(){
            this.flag = !this.flag;
            if(this.flag){
                this.loveText = '';
            }else{
                this.loveText = '收藏';
            }
        }
    },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/index.styl';
@import '../../static/style.css';
.sellers{
    position: absolute;
    top: 174px;
    bottom: 58px;
    left: 0;
    right: 0;
    width: 100%;
    overflow: auto;
    .sellers-cont{
        width: 100%;
        height: 100%;
        .seller-tit{
            padding: 18px;
            position: relative;
            border-bottom: 1px solid rgba(7,17,27,0.1);
            .seller-name{
                font-size: 14px;
                color: rgb(7,17,27);
                line-height: 14px;
                font-weight: 700;   
            }
            .star{
                margin-top:8px;
                .star-icon{
                    display:inline-block;
                    width: 24px;
                    height: 24px; 
                    bg-image('star24_off');
                    vertical-align: top;
                }
                .on{ 
                    bg-image('star24_on');
                }
                .half{
                    bg-image('star24_half');    
                }
                .star-ratingCount, .star-sellCount{
                    margin-left: 6px;
                    font-size: 12px;
                    color: rgb(77,85,93);
                    line-height: 18px;
                    font-weight: 400;
                }
            }
            .love{
                position: absolute;
                right: 18px;
                top: 18px;
                .love-icon{
                    font-size: 24px;
                    color: rgba(77,85,93,0.3);
                    line-height: 24px;
                    text-align: center;  
                }
                .love-text{
                    font-size: 12px;
                    color: rgb(77,85,93);
                    line-height: 12px; 
                    font-weight: 400;   
                }
                .red{
                    color: rgb(240,20,20);    
                }
            }
        } 
        .seller-time{
            padding: 18px 0px;
            display: flex;
            text-align: center;
            .time-minPrice, .time-deliveryPrice, .time-deliveryTime{
                flex:1;
                border-right: 1px solid rgba(7,17,27,0.1);
                .minPrice-text, .deliveryPrice-text, .deliveryTime-text{
                    font-size: 12px;
                    color: rgb(147,152,159);
                    line-height: 12px;
                    font-weight: 400;  
                }
                .minPrice-price, .deliveryPrice-price, .deliveryTime-time{
                    margin-top: 8px;
                    .minPrice-t, .deliveryPrice-t, .deliveryTime-t{
                        font-size: 24px;
                        font-weight: 400;
                        color:rgb(7,17,27);
                        line-height: 24px;    
                    }
                    .rmb{
                        font-size: 12px;
                        color: rgb(147,152,159);
                        line-height: 12px;
                        font-weight: 400;    
                    }
                } 
            }
        }
        .seller-bulletin{
            padding: 16px;            
            .notice-tit{
                font-size: 14px;
                color: rgb(7,17,27);
                line-height: 14px;
                font-weight: 700;
            }
            .notice-text{
                margin: 8px 12px 0px 12px;
                font-size: 12px;
                font-weight: 200;
                color: rgb(240,20,20);
                line-height: 24px;
            }
        }
        .supports{
            margin: 16px;
            padding: 0px 12px;
            font-size:12px;
            color:rgb(77,85,93);
            font-weight: 300;
            .supports-cont{
                display: block;
                height: 48px;
                vertical-align: middle;
                line-height: 48px;
                border-top: 1px solid rgba(7,17,27,0.1);
                .supports-icon{
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
        }  
        .image{
            padding: 18px;
            height: 140px;
            position:relative;
            overflow:hidden;
            .image-tit{
                font-size: 14px;
                color: rgb(7,17,27);
                line-height: 14px;
                font-weight: 700;
                margin-bottom: 12px;
            }
            .image-cent{
                width: 148%;
                height: 120px;
                position:absolute;
                overflow-x: scroll;
                .image-cont{
                    display:inline-block;
                    height: 120px;
                    margin-left: 12px;
                    img{
                        display: inline-block;
                        height: 120px;
                    }
                }
            }
            .image-cent::after{
                content:"";
                clear: both;
                width: 148%;
                height: 1px;
                display: block;
            }
            .image-cent::-webkit-scrollbar {
                display: none;
            }
        }
        .seller-infos{
            margin: 16px;
            padding: 0px 12px;
            color:rgb(77,85,93);
            font-weight: 300;
            .infos-tit{
                font-size: 14px;
                color: rgb(7,17,27);
                line-height: 14px;
                font-weight: 700;
                margin-bottom: 12px; 
            }
            .infos-text{
                display: block;
                height: 48px;
                vertical-align: middle;
                font-size:10px;
                line-height: 48px;
                border-top: 1px solid rgba(7,17,27,0.1);    
            }
        }
    }
}
</style>
