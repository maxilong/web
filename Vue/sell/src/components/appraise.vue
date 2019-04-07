<template>
    <div class="appraise">
        <div class="appraise-tab">
            <div class="appraise-tit">商品评价</div>
            <div class="appraise-fil">
                <div class="all" @click="changeArr" :class="{check: allflag}">
                    <span class="all-text">全部</span>
                    <span class="all-num">{{allLen}}</span>
                </div>
                <div class="well" @click="changeArr" :class="{check: wellflag}">
                    <span class="well-text">推荐</span>
                    <span class="well-num">{{wellLen}}</span>
                </div>
                <div class="yawp" @click="changeArr" :class="{check: yawpflag}">
                    <span class="yawp-text">吐槽</span>
                    <span class="yawp-num">{{yawpLen}}</span>
                </div>
            </div>
        </div>

        <div class="evaluate">
            <span class="evaluate-icon icon-check_circle" @click="changeArr" :class="{blue: textFlag}"></span>
            <span class="evaluate-text">只看有内容的评价</span>
        </div>
        <div class="ratings-wrapper" v-for="(item,index) in arr" :key="index">
            <div class="ratings-icon">
                <img :src="item.avatar" alt="">
            </div>
            <div class="ratings-content">
                <div class="ratings-name">{{item.username}}</div>
                <div class="ratings-star">
                    <span v-for="(item,index) in item.scoreArr" :key="index">
                        <span class="star-icon" :class="item"></span>
                    </span>
                    <span class="ratings-deliveryTime" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
                </div>
                <div class="ratings-time">{{item.strTime}}</div>
                <div class="ratings-text" v-show="item.text">{{item.text}}</div>
                <div class="praise">
                    <span class="praise-icon icon-thumb_down" v-show="item.rateType"></span>
                    <span class="praise-icon icon-thumb_up" :class="{praiseblue: item.rateType == 0}" v-show="item.rateType == 0"></span>
                    <div class="praise-content" v-for="(item1,index) in item.recommend" :key="index">
                        <span class="praise-recommend">{{item1}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
export default {
    props: ["ratings"],
    data () {
        return {
            msg:'aaa',
            allLen:0,
            wellLen:0,
            yawpLen:0,
            arr:this.ratings,
            allflag:true,
            wellflag:false,
            yawpflag:false,
            textFlag:false,
        }
    },
    created () {
        Vue.nextTick(() => {
            this.ratings.forEach((item,index) => {
                item.scoreArr = [];
                this.star(item.score,item.scoreArr);
            })
            this.filterArr();
            this.formatSeconds();
            this.allLen = this.ratings.length;
            this.wellLen = this.ratings.wellArr.length;
            this.yawpLen = this.ratings.yawpArr.length;
        })
            // console.log(this.ratings);

    },
    methods: {
        formatSeconds(){
            this.ratings.forEach((item,index)=>{
                let time = new Date(item.rateTime);
                let year = time.getFullYear();
                let day = time.getDay();
                let hour = time.getHours();
                let minute = time.getMinutes();
                let month = time.getMonth();
                item.strTime =  year + '-' + month + '-' + day + ' ' + hour + ':' + minute; 
            })
        },
        star(score,Arr){
            let sco = Math.round(score);
            for(let i = 1 ; i <= 5; i++){
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
        filterArr(){
            this.ratings.wellArr = [];
            this.ratings.yawpArr = [];
            this.ratings.textArr = [];
            this.ratings.forEach((item,index) => {
                if(!item.text == ""){
                    this.ratings.textArr.push(item);
                }
                if(item.rateType == 0){
                    this.ratings.wellArr.push(item);
                }else{
                    this.ratings.yawpArr.push(item);
                }
            })
        },
        changeArr(e){
            if(e.target.innerText == '全部'){
                this.changeFlag(e.target.innerText);
                this.arr = this.ratings;
            }else if(e.target.innerText == '推荐'){
                this.arr = this.ratings.wellArr;
                this.changeFlag(e.target.innerText);
            }else if(e.target.innerText == '吐槽'){
                this.arr = this.ratings.yawpArr;
                this.changeFlag(e.target.innerText);
            }else{
                this.changeFlag(e.target.innerText);
                this.arr = this.ratings.textArr;
            }
        },
        changeFlag(text){
            this.allflag = false;
            this.wellflag = false;
            this.yawpflag = false;
            this.textFlag = false;
            if(text == '全部'){
                this.allflag = true;
            }else if(text == '推荐'){
                this.wellflag = true;
            }else if(text == '吐槽'){
                this.yawpflag = true;
            }else{
                this.textFlag = true;
            }
        }
    }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl';
@import '../../static/style.css';
.appraise{
    width: 100%;
    height:100%;
    // position: relative;
    .appraise-tab{
        padding: 18px;
        .appraise-tit{
            font-size: 16px;
            font-weight: 500;
            color: #000;
            margin-bottom: 18px;    
        }
        .appraise-fil{
            font-size: 16px;
            padding-bottom: 18px;
            border-bottom: 1px solid rgba(7,17,27,0.1);
            div{
                text-align:center;
                padding: 8px 16px;
                background-color:rgba(77,85,93,0.2);
                border-radius: 2px;
                color:rgb(77,85,93);
                font-weight: 500;
            }
            .all{
                display:inline-block;
            }
            .well{
                display:inline-block;
            }
            .yawp{
                display:inline-block;            
            }
            .all-num, .well-num, .yawp-num{
                font-size: 10px;
                vertical-align: middle;
            }
            .check{
                background-color: rgb(0,160,220);  
                color: #fff;
            }
        }
    }
    .evaluate{
        padding: 0px 0px 18px 18px;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        .icon-check_circle{
            font-size: 24px;    
            vertical-align: middle;
            color: rgb(147,153,159);
        }
        .blue{
            color: rgb(0,160,220);
        }
        .evaluate-text{
            color: rgb(147,153,159);
            line-height: 24px;
        }
    }
    .ratings-wrapper{
        padding: 18px 0px;
        margin: 0px 18px;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        .ratings-icon{
            display:inline-block;
            img{
                width: 28px;
                height: 28px;
                display:inline-block;
                border-radius: 28px;
            }
        }
        .ratings-content{
            width: 278px;
            display:inline-block; 
            margin-left: 12px; 
            vertical-align: top;
            position:relative;
            .ratings-name{
                font-size: 12px;
                color: rgb(7,17,27);
                line-height: 12px; 
                font-weight : 500;  
            }
            .ratings-star{
                margin: 4px 6px 6px 0px
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
            }
            .ratings-deliveryTime, .ratings-time{
                font-size: 10px;
                font-weight: 200;
                color: rgb(147,153,159);
                line-height: 12px;
            }
            .ratings-time{
                position:absolute;
                display: inline-block;
                top: 0;
                right:0;  
            }
            .ratings-text{
                fonr-size: 12px;
                color: rgb(7,17,27);
                font-weight:400;
                line-height: 18px;
                margin-top: 12px;
            }
            .praise{
                margin-top: 26px;
                .praise-icon{
                    color:rgb(183,187,191); 
                    line-height:16px;
                    width: 12px;
                    height:12px;
                } 
                .icon-thumb_down{
                    font-size: 12px;                        
                } 
                .icon-thumb_up{
                    font-size: 12px;
                }
                .praiseblue{
                    color: rgb(0,160,220);
                }
                .praise-content{
                    margin: 8px 2px;
                    font-size: 8px;
                    display: inline-block;
                    border: 1px solid rgba(7,17,27,0.1);
                    padding: 2px;
                }  
            }
        }
    }
}
</style>
