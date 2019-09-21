<template>
<div class="list" ref="wrapper">
  <div>
    <div class="area">
      <div class="title border-topBottom">当前城市</div>
      <div class="button-list">
        <div class="button-wrapper">
          <div class="button">{{this.currentCity}}</div>
        </div>
      </div>
    </div>
  <div class="area">
      <div class="title border-topBottom">热门城市</div>
      <div class="button-list">
        <div class="button-wrapper" v-for="item of hot" :key="item.id"
        @click="handleCityClick(item.name)">
          <div class="button">{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="area" v-for="(item,key) of cities" :key="key" :ref="key">
      <div class="title border-topBottom" >{{key}}</div>
      <div class="item-list">
        <div class="item border-bottom" v-for="innerItem of item" :key="innerItem.id"
        @click="handleCityClick(innerItem.name)">
          {{innerItem.name}}
        </div>

      </div>
    </div>
  </div>
</div>
</template>

<script>
import Bscroll from 'better-scroll'
import {  mapState, mapMutations } from 'vuex'
export default {
name:'CityList',
props:{
  hot:Array,
  cities:Object,
  letter:String //接受来自父组件的值
},
computed:{
  ...mapState({
    currentCity: 'city' //映射currentCity =$store.state.city
  })
},
methods:{
  handleCityClick(city){  //改变城市
    // this.$store.dispatch('changeCity',city) //派发changeCity
    this.changeCity(city)
    this.$router.push('/') //路由界面跳转
},
...mapMutations(['changeCity']) // this.changeCity(city) = this.$store.dispatch('changeCity',city) //派发changeCity
},
mounted(){
  this.scroll = new Bscroll(this.$refs.wrapper)
},
watch :{
  letter(){
    if(this.letter){
      const element = this.$refs[this.letter][0]
      this.scroll.scrollToElement(element)
    }
  }
}
}
</script>

<style lang="stylus" scoped>
.border-topBottom
  &:before
    border-color:#ccc
  &:after
    border-color:#ccc
.border-bottom
  &:before
    border-color:#ccc
.list
  overflow hidden
  position absolute
  top:1.58rem
  left:0
  right:0
  bottom:0
  .title
    overflow hidden
    line-height :.54rem
    background : #eee
    padding-left :.26rem
    color :#666
  .button-list
    overflow hidden
    padding: .1rem .6rem .1rem .1rem
    .button-wrapper
      float left
      width :33.33%
      .button
        text-align center
        margin :.1rem
        padding .1rem 0
        border-radius :.06rem
        border:.02rem solid #ccc
  .item-list
    .item
      line-height :.76rem
      padding-left :.2rem


</style>
