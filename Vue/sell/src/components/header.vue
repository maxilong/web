<template>
    <div id="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img :src="seller.avatar" alt="">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">{{seller.description}}/{{seller.deliveryTime}}分送达</div>
                <div v-if="seller.supports" class="supports">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="supports-type1">{{seller.supports[0].description}}</span>
                </div>
                <router-link :to="{path:'/headerstore'}">
                    <div class="num-wrapper">
                        <span class="num">{{seller.supports.length}}个</span>
                        <span class="icon-keyboard_arrow_right more"></span>
                    </div>
                </router-link>
            </div>
        </div>
        <router-link :to="{path:'/headerstore'}">
            <div class="bulletin-wrapper">
                <span class="bulletin-icon"></span>
                <span class="bulletin-font">{{seller.bulletin}}</span>
                <span class="icon-keyboard_arrow_right bulletin"></span>
            </div>
        </router-link>
        <div class="background">
            <img :src="seller.avatar" alt="">
        </div>
    </div>
</template>

<script>
export default {
    props:['seller'],
    data () {
        return {
            msg:'fdsafdsfdsa'
        }
    },
    created () {
        this.classMap = ['decrease','discount','guarantee','invoice','special'];
    },
}
</script>
<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl';
@import '../../static/style.css';
#header{
    position:relative;
    overflow: hidden;
    .content-wrapper{
        position: relative;
        padding: 24px 24px 18px 24px;
        background: rgba(7,17,27,0.5);
        .avatar{
            float:left;
        }
        img{
            width:64px;
            height:64px;
            border-radius: 2px;
        }
    }
    .content{
        margin-left:64px;
        padding-left:16px;
        color:#fff;
        .title{
            .brand{
                display: inline-block;
                bg-image('brand');
                width:30px;
                height:18px;
                background-size:30px 18px;
                vertical-align: top;
            }
            .name{
                font-size:16px;
                font-weight:bold;
            }
        }
        .description{
            font-size:12px;
            color:#fff;
            font-weight:200;
            line-height:12px;
            margin-top:8px;
            position:relative;
        }
        .supports{
            display:inline-block;
            margin-top: 12px;
            .icon{
                display:inline-block;
                width:16px;
                height:16px;
                background-size: 16px 16px;
            }
            .decrease{
                bg-image('decrease_1')    
            }
            .discount{
                bg-image('discount_1')    
            }
            .guarantee{
                bg-image('guarantee_1')    
            }
            .invoice{
                bg-image('invoice_1')    
            }
            .special{
                bg-image('special_1')    
            }
            .supports-type1{
                font-size:12px;
                vertical-align:top;    
            }
        }
        .num-wrapper{
            box-sizing:border-box;
            width:44px;
            height:24px;
            background-color:rgba(0,0,0,0.2);
            border-radius:14px;
            font-size:10px;
            line-height:24px;
            position:absolute;
            right:12px;
            bottom:20px;
            padding: 0px 6px;
            color: #fff;
            .num,.more{
                width:2px;
                vertical-align: middle;
            }
        }
    }
    .bulletin-wrapper{
        height:28px;
        width:100%;
        background-color:rgba(7,17,27,0.2);
        font-size:10px;
        color:#fff;
        text-overflow: ellipsis; //超出用点代替
        white-space nowrap;  //不换行
        overflow: hidden;  //  超出隐藏
        .bulletin-icon{
            display:inline-block;
            bg-image('bulletin');
            width: 22px;
            height: 12px;
            // background-color: #000;
            background-size: 22px 12px;
            vertical-align:text-top;
            margin:0 6px 0 10px;
        }
        .bulletin-font{
            font-weight:200;
            line-height:28px;
        }
        .bulletin{
            position:absolute;
            right:2px;
            bottom:9px;
        }
    }
    .background{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        filter: blur(10px);
        img{
            width: 100%;
            background-size: 100% 100%;
        }
    }
}
</style>
