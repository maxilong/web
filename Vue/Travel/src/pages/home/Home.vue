<template>
    <div>
      <home-header ></home-header>
      <home-swiper :list="swiperList"></home-swiper>
      <home-icons :list="iconList"></home-icons>
      <home-recommend :list="recommendList"></home-recommend>
      <home-weekend :list="weekendList"></home-weekend>
    </div>
</template>
<script>
import HomeHeader from './components/Header'
import HomeSwiper from './components/Swiper'
import HomeIcons from './components/Icons'
import HomeRecommend from './components/Recommend'
import HomeWeekend from './components/Weekend'
import axios from 'axios'
import { mapState } from 'vuex'




export default {
  name:'Home',
  components:{
  HomeHeader,
  HomeSwiper,
  HomeIcons,
  HomeRecommend,
  HomeWeekend

  },
  data(){
    return{
      lastCity:'',
      swiperList:[],
      iconList:[],
      recommendList:[],
      weekendList:[]
    }
  },
  methods:{
    getHomeInfo(){
      axios.get('/api/index.json?city' + this.city) //在config index.js 中转换为/static/mock路径
      .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc(res){
      res = res.data
      if (res.ret && res.data) {//如果后端传值
        const data = res.data
        this.swiperList = data.swiperList
        this.iconList = data.iconList
        this.recommendList = data.recommendList
        this.weekendList = data.weekendList
      }
    }
  },
  computed:{
    ...mapState(['city'])
  },
  mounted(){
    this.lastCity = this.city
    this.getHomeInfo()
  },
  activated (){ //当页面重新显示时候activated 会重新执行
    if(this.lastCity !== this.city){
    this.lastCity = this.city
      this.getHomeInfo()
    }
  }
}
</script>

<style>

</style>


