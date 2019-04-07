<template>
    <div class="shopcart">
        <div class="cart">
            <div class="cart-wrapper">
                <div class="cart-icon icon-shopping_cart" ref="cart" :class="{blue: totalCount > 0}"></div>
                <div class="total-count" v-show="totalCount > 0">{{totalCount}}</div>
            </div>
            <div class="delive-fee">
                <div class="price border-1px-right" :class="{okPrice: totalPrice > 0 }">¥{{totalPrice}}</div>
                <div class="delive-rice">另需配送费¥4元</div>
            </div>
            <div class="delive-base" :class="{ok: totalPrice >= 20 }">{{totalSettle}}</div>
        </div>
        <div class="shopCat">
            <div class="list-bg" v-show="flag" @click="setFlag"></div>
            <div class="cart-list" v-show="flag" ref="cartList">
                <div class="cart-list-hander">
                    <span class="cart-title">购物车</span>
                    <span class="clear" @click="clear">清空</span>
                </div>
                <div class="food-item"  v-for="(item,index) in selectFoods" :key="index">
                    <span class="food-title">{{item.name}}</span>
                    <span class="food-price">{{item.price}}</span>
                    <cartcontrol :foods="item" class="cartcontrol"></cartcontrol>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import cartcontrol from './cartcontrol';
export default {
    props: ['selectFoods','deliveryPrice','minPrice'],
    data () {
        return {
            mrd:'dasdasddsa',
            flag:false,
        }
    },
    components: { 
        cartcontrol,
    },
    computed: {
        totalCount(){
            let totalCount = 0;
            this.selectFoods.forEach( food => {
                totalCount += food.count;
            })
            return totalCount;
        },
        totalPrice(){
            let totalPrice = 0;
            this.selectFoods.forEach( food => {
                totalPrice += food.price * food.count;
            })
            return totalPrice;
        },
        totalSettle(){
            if(this.totalPrice == 0){
                return `${this.minPrice}`;
            }else if(this.totalPrice > 0 && this.totalPrice < 20 ){
                return `还差${20 - this.totalPrice}起送`
            }else{
                return '去结算'
            }
        }
    },
    methods: {  
        setFlag(){
            this.flag = !this.flag;
        },
        clear(){
            this.selectFoods.forEach(food => {
                food.count = 0;
            })
            this.flag = !this.flag;
        },
    },
    watch: {
        totalCount(){
            if(this.totalCount == 0){
                if(this.flag == true){  
                    this.flag = !this.flag;
                }
                this.$refs.cart.removeEventListener('click',this.setFlag,false);
            }else{
                this.$refs.cart.addEventListener('click',this.setFlag,false);
            }
        }
    }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl'
    .shopcart{
        width: 100%;
        height: 48px;
        position: fixed;
        bottom:0;
        left: 0;
        z-index: 88;
        background-color: #000000;
        .cart{
            display: flex;
            width: 100%;
            height: 100%;
            background-color: #141d27;
            .cart-wrapper{
                flex: 0 0 80px;
                position: relative;
                background-color: #141d27;
                .cart-icon{
                    position: relative;
                    border: 6px solid #141d27;
                    border-radius: 44px;
                    font-size:24px;
                    margin-left: 18px;
                    margin-top: -10px;
                }
                .icon-shopping_cart{
                    display: inline-block;
                    width: 44px;
                    height: 44px;
                    background-color: #2b333b;
                    text-align: center;
                    line-height: 44px;
                    color: rgba(255,255,255,0.4);
                }
                .blue{
                    background-color: #00a0dc;
                    color: #fff;
                }
                .total-count{
                    position: absolute;
                    top: -6px;
                    right: 0px;
                    font-size: 8px;
                    font-weight: 700;
                    width: 24px;
                    height: 16px;
                    color: #fff;
                    text-align: center;
                    line-height:16px;
                    background-color: red;
                    box-shadow: 0px 5px 8px #000000;
                    border-radius: 16px;
                    
                }
            }
            .delive-fee{
                flex: 1;
                padding: 12px 0px 12px 4px;
                height: 24px;
                .price{
                    display: inline-block;
                    padding-right: 12px;
                    font-size: 16px;
                    line-height: 24px;
                    color: rgba(255,255,255,0.2);
                    border-1px-right(rgba(255,255,255,0.4));
                }
                .okPrice{
                    color: #fff;    
                }
                .noZPrice{
                    color: #fff;
                }
                .delive-rice{
                    display: inline-block;
                    padding-left: 12px;
                    font-size: 12px;
                    font-weight: 700;
                    line-height: 24px;
                    color: rgba(255,255,255,0.4);
                }
            }
            .delive-base{
                flex: 0 0 105px;
                padding: 0px 8px;
                text-align: center;
                height: 48px;
                line-height: 48px;
                font-size: 12px;
                font-weight: 700;
                color:rgba(255,255,255,0.1);
                background-color: #2b333b;
            }
            .ok{
                background-color: #00a0dc;
                color: #fff;
            }
        }
        .shopCat{
            position:relative;
            width:100%;
            height: 100%;
            .list-bg{
                position: absolute;
                bottom:48px;
                left:0;
                height: 100vh;
                width: 100vw;
                background-color: rgba(0,0,0,0.4);
                z-index:-2;
            }
            .cart-list{
                position:absolute;
                bottom: 96px;
                left:0px;
                width: 100%;
                background-color: rgba(0,0,0,0.4);
                z-index:-1;
                overflow: auto;
                max-height: 217px;
                .cart-list-hander{
                    height:40px;
                    padding: 0px 18px;
                    position:relative;
                    background-color: #f3f5f7;
                    line-height: 40px;
                    .cart-title{
                        font-size: 14px;
                        font-weight: 700;
                        color:#07111b;
                    }
                    .clear{
                        position:absolute;
                        font-size: 12px;
                        color:#00a0dc;
                        right: 18px;
                    }
                }
            }
            .food-item{
                height: 48px;
                padding: 0 18px;
                position:relative;
                background-color: #fff;
                line-height: 48px;    
                .food-title{
                    font-size: 14px;
                    color:#07111b;    
                }
                .food-price{
                    position:absolute;
                    right: 120px;
                    font-size: 10px;    
                }
                .cartcontrol{
                    position:absolute;
                    right: 18px;
                    top: 6px;
                    display: inline-block;
                }
            }
        }
    }
</style>