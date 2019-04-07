import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../components/goods'
import Sellers from '../components/sellers'
import Ratings from '../components/ratings'
import Headerstore from '../components/headerstore'
import HelloWorld from '../components/HelloWorld.vue'
import Foods from '../components/foods.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods',
      component: Goods
    },
    {
      path: '/goods',
      component: Goods,
    },
    {
      path: '/sellers',
      component: Sellers
    },
    {
      path: '/ratings',
      component: Ratings
    },
    {
      path:'/headerstore',
      component: Headerstore
    },
    {
      path:'/helloworld',
      component:HelloWorld
    },
    {
      path:'/foods',
      name:'foods',
      component: Foods      
    }
  ]
})
