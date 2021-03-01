import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Profile from '@/components/Profile'
import QrCodeReader from '@/components/QrCodeReader'
import Start from '@/components/Start'
import Product from '@/components/Product'
import Products from '@/components/Products'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/reader/:state',
      name: 'reader',
      component: QrCodeReader
    },
    {
      path: '/start',
      name: 'start',
      component: Start
    },
    {
      path: '/product',
      name: 'product',
      component: Product
    },
    {
      path: '/products',
      name: 'products',
      component: Products
    }
  ]
})
