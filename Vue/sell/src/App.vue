<template>
  <div id="app">
    <div class="header">
      <my-header :seller="seller"></my-header>
    </div>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="{path:'/goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/ratings'}">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/sellers'}">商家</router-link>
      </div>
    </div>
    <div class="content">
      <transition :name="myFade">
        <keep-alive>
          <router-view :seller="seller" :goods="goods" :ratings="ratings"></router-view>                
        </keep-alive>
      </transition>
    </div>
    <div class="shopCart">
      <keep-alive>
        <my-shopcart  :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></my-shopcart>        
      </keep-alive>
    </div>
  </div>
</template>

<script>
import myHeader from './components/header';
import good from './components/goods';
import axios from 'axios';
import myShopcart from './components/shopcart';
import headerstore from './components/headerstore';
import HelloWorld from './components/HelloWorld.vue';
import Vue from 'vue';
export default {
  name: 'App',
  data() {
    return {
      seller:{},
      goods:[],
      ratings:[],
      index:[0,0,0],
      myFade:'',
    }
  },
  components: {
    myHeader,
    myShopcart,
    headerstore,
    good,
    HelloWorld,
  },
  created () {
    axios.get('good/seller').then(
      res => {
        if(res.data.code === 0){
          this.seller = res.data.data;
        }
      })
    axios.get('good/goods').then(
      res => {
        if(res.data.code === 0 ){
            this.goods = res.data.data;
            console.log(this.goods);
        }
    })
    axios.get('good/ratings').then(
      res => {
        if(res.data.code === 0){
            this.ratings = res.data.data;
        }
    })
  },
  computed: {
    selectFoods(){
      let foods = [];
      if(this.goods.length !== 0){
          this.goods.forEach(good => {
              good.foods.forEach(food => {
                  if(food.count){
                      foods.push(food);
                  }
              })
          });
      }
      return foods;
    }
  }, 
  watch:{
    $route(to,from){
      // console.log(to.meta.index,from.meta.index);
      if(to.meta.index > from.meta.index){
        this.myFade = 'slide-left';
      }else{
        this.myFade = 'slide-right';
      }
    }
  }
}
</script>


<style lang="stylus" rel="stylesheet/stylus">
@import '../static/style.css';
@import './assets/stylus/index.styl';
#app{
  width:100%;
  height:100%;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
  .tab{
      display: flex;
      height:36px;
      .tab-item{
        flex:1;
        font-size:14px;
        color:rgb(75,85,93);
        text-align:center;
        line-height:40px;
          .router-link-active{
            font-size: 14px;
            line-height: 14px;
            color: rgb(240,20,20);
            font-weight: bolder;
          } 
      }
      .tab-item .active{
        color:rgb(250,40,40);
      }
  }
  .content{
      .slide-right-enter-active,
      .slide-right-leave-active,
      .slide-left-enter-active,
      .slide-left-leave-active {
        will-change: transform;
        transition: all 500ms;
        position: absolute;
      }
      .slide-right-enter {
        opacity: 0;
        transform: translate3d(-100%,-0, 0);
      }
      .slide-right-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
      }
      .slide-left-enter {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
      }
      .slide-left-leave-active {
        opacity: 0;
        transform: translate3d(-100%,-0, 0);
      }  
  }
  .border-1px{
    border-1px(rgba(1,17,27,0.1))
  }
  .header-store{
    z-index: 200; 
    position:absolute;
    top:0;
    left:0; 
  }
}

</style>
