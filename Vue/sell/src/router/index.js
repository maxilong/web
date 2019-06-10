import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../components/goods'
import Sellers from '../components/sellers'
import Ratings from '../components/ratings'
import HelloWorld from '../components/HelloWorld.vue'
import Headerstore from '../components/headerstore.vue'
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
      meta:{
        index:0
      }
    },
    {
      path: '/sellers',
      component: Sellers,
      meta:{
        index:2
      }
    },
    {
      path: '/ratings',
      name:'ratings',
      component: Ratings,
      meta:{
        index:1
      }
    },
    {
      path:'/headerstore',
      component: Headerstore,
      meta:{
        index:3
      }
    },
    {
      path:'/helloworld',
      component:HelloWorld
    },
    {
      path:'/foods',
      name:'foods',
      component: Foods,
      meta:{
        index:4
      }    
    }
  ]
})
