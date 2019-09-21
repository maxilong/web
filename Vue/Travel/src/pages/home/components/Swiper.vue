<template>
<div class="wrapper"> <!-- 骨架 -->
  <swiper :options="swiperOption" v-if="showSwiper">
    <!-- slides -->
    <swiper-slide v-for="item of list" :key="item.id">
      <img class="swiper-img" :src="item.imgUrl" alt="" >
    </swiper-slide>


    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>

  </swiper>
</div>

</template>

<script>
export default {
  name:'HomeSwiper',
  props:{
    list:Array
  },
  data(){
    return{
      swiperOption:{
        pagination:'.swiper-pagination',//增加滑动时索引
        loop:true //支持轮播
      }
    }
  },
  computed:{
    showSwiper(){//是第一张图片作为默认展示
      return this.list.length
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper >>> .swiper-pagination-bullet-active
  background :#fff
.wrapper
  overflow hidden
  width 100%
  height 0
  padding-bottom : 31.25%
  .swiper-img
    width : 100%
</style>

