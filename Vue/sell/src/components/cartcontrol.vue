<template>
    <div class="control">
        <span class="icon-remove_circle_outline decrease" @click="remove" v-show="this.foods.count > 0"></span>
        <span class="count" v-show="this.foods.count > 0">{{foods.count}}</span>
        <span class="icon-add_circle increase" @click="add"></span>
    </div>
</template>
<script>
import Vue from 'vue';
export default {
    props: ['foods'],
    data () {
        return {
            msg:'dasdsadas',
        }
    },
    methods: {
        add(e){
            if(e){
                if(!this.foods.count){
                    Vue.set(this.foods,'count');
                    this.foods.count = 1 ;
                }else{
                    this.foods.count ++;
                }
            }
        },
        remove(e){
            if(e){
                if(this.foods.count === 0){
                    return 
                }
                this.foods.count --;
            }
        }
    }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl';
    .control{
        position:absolute;
        right:36px;
        bottom:10px;
        font-size: 0;
        .icon-remove_circle_outline, .icon-add_circle{
            display:inline-block;
            width: 24px;
            height: 24px;
            line-height:24px;
            font-size: 24px;
            color: #00a0dc;
        }
        .decrease, .increase{
            padding: 6px;
            display:inline-block;
            width: 24px;
            height:24px;
            font-size: 24px;
            line-height:24px;
        }
        .count{
            display:inline-block;
            font-size: 10px;
            color:rgb(147,153,159);
            line-height: 24px;
            text-align:center;
            padding-top:6px;
            vertical-align:top;
        }
    }
</style>