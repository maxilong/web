<template>
    <div class="ratings">
        <div class="ratings-content">
            <div class="ratings-score">
                <div class="service">
                    <div class="service-score">{{seller.score}}</div>
                    <div class="service-text">综合评分</div>
                    <div class="service-rankrate">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="conent-score">
                    <div class="conent-service">
                        <span class="service-tit">服务态度</span>
                        <div class="service-star">
                            <span v-for="(item,index) in serviceArr" :key="index">
                                <span class="star-icon" :class="item"></span>
                            </span>
                            <span class="star-text">{{seller.serviceScore}}</span>
                        </div>
                    </div>
                    <div class="food-score">
                        <span class="food-tit">食物质量</span>
                        <div class="food-star">
                            <span v-for="(item,index) in foodArr" :key="index">
                                <span class="star-icon" :class="item"></span>
                            </span>
                            <span class="star-text">{{seller.foodScore}}</span>
                        </div>
                    </div>
                    <div class="deliveryTime">
                        <span class="deliveryTime-text">送达时间</span>
                        <span class="deliveryTime-time">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <div class="rule"></div>
            <div class="ratings-text">
                <my-appraise :ratings="ratings"></my-appraise>
            </div>
        </div>
    </div>
</template>

<script>
import myAppraise from './appraise';
import Vue from 'vue';
export default {
    props: ["seller","goods","ratings"],
    data () {
        return {
            msg:'dsadsad',
            serviceArr:[],
            foodArr:[]
        }
    },
    components: {
        myAppraise,
    },
    created () {
        this.star(this.seller.serviceScore,this.serviceArr);
        this.star(this.seller.foodScore,this.foodArr);
    },
    methods:{
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
    }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl';
@import '../../static/style.css';
.ratings{
    position: absolute;
    top: 174px;
    bottom:48px;
    right:0px;
    left:0px;
    height: 368px;
    overflow: auto;
    .ratings-content{
        width: 100%;
        height: 100%;
        position:relative;
        .ratings-score{
            display: flex;
            width: 100%;
            border-bottom: 1px solid rgba(177,177,177,0.2);
            .star-icon{
                display:inline-block;
                width: 24px;
                height: 24px; 
                bg-image('star24_off');
                vertical-align: middle;
            }
            .on{ 
                bg-image('star24_on');
            }
            .half{
                bg-image('star24_half');    
            }
            .service{
                flex: 0 0 138px;
                text-align: center;
                font-weight: 700;
                .service-score{
                    font-size: 24px;
                    color: rgb(255,153,0);
                    line-height: 28px; 
                    margin: 18px 0 6px 0;   
                }
                .service-text{
                    font-size: 12px;
                    color: rgb(7,17,27);
                    line-height: 18px;    
                }
                .service-rankrate{
                    font-size: 10px;
                    color: rgba(7,17,27,0.5);
                    line-height: 10px;
                    margin: 8px 0 24px;    
                }
            }
            .conent-score{
                flex: 1;
                font-weight: 700;
                border-left: 1px solid rgba(177,177,177,0.2);
                padding: 0px 10px;    
                margin: 24px 0px; 
                font-size: 12px;           
                .conent-service, .food-score{
                    .service-tit, .food-tit{
                        display:inline-block;
                        margin-right: 4px;
                    }
                    .service-star, .food-star{
                        display:inline-block;
                        .star-text{
                            color:rgb(255,153,0);
                            margin-left: 2px;
                        }
                    }
                }
                .food-score{
                    margin: 8px 0px;
                }
                .deliveryTime{
                    .deliveryTime-text{
                        margin-right: 4px;
                    }
                    .deliveryTime-time{
                        font-size: 12px;
                        color: rgb(147,153,159);
                        line-height: 18px;
                    }
                }
            }
        }
        .rule{
            width: 100%;
            height: 16px;
            background-color: #f3f3f7;  
        }
        .ratings-text{
            width: 100%;
            position:absolute;
            // bottom: 0px;
            top:156px;
            left:0;
            // right: 0;
            // overflow:hidden;
        }
    }
}






</style>
