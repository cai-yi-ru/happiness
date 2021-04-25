import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/pages/Login'
import Products from '@/components/pages/Products'
import Orders from '@/components/pages/Orders'
import Coupons from '@/components/pages/Coupons'
import CustomerOrders from '@/components/pages/CustomerOrders'
import CustomerCheckout from '@/components/pages/CustomerCheckout'


//前台
import Layout from '@/customerpages/Layout'
import Home from '@/customerpages/Home'
import IndexProducts from '@/customerpages/Products'
import IndexProduct from '@/customerpages/Product'
import Cart from '@/customerpages/Cart'
import IndexOrder from '@/customerpages/Order'
import OrderCheckout from '@/customerpages/OrderCheckout'
import Coupon from '@/customerpages/Coupon'
Vue.use(Router)

export default new Router({
  
  routes: [
    {//如果不是所定義的頁面那就會導入到login頁面，避免進入不存在的頁面
      path:'*',
      redirect:'/'
    },
    
    //後台路由
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, 
    {
      path: '/adminbg',
      name: 'Dashboard',
      component: Dashboard,
      meta:{requiresAuth:true},//需要被驗證
      children:[
        {
          path: 'products',
          name: 'products',
          component: Products,
          meta:{requiresAuth:true},//需要被驗證
        },
        {
          path: 'orders',
          name: 'orders',
          component: Orders,
          meta:{requiresAuth:true},//需要被驗證
        },
        {
          path: 'coupons',
          name: 'coupons',
          component: Coupons,
          meta:{requiresAuth:true},//需要被驗證
        },
        {
          path: 'customerorders',
          name: 'customerorders',
          component: CustomerOrders,
          meta:{requiresAuth:true},//需要被驗證
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'customercheckout',
          component: CustomerCheckout,
          meta:{requiresAuth:true},//需要被驗證
        },
      ]
    },
    
    //前台路由
    {
      path: '/',
      component: Layout,
      children:[
        {
          path: '/',
          name: 'Home',
          component: Home,          
        },
        {
          path: 'sproducts',
          name: 'sproducts',
          component: IndexProducts,          
        },
        {
          path: 'coupon',
          name: 'coupon',
          component: Coupon,          
        },
        {
          path: 'product/:id',
          name: 'product',
          component: IndexProduct,          
        },
        {
          path: 'cart',
          name: 'cart',
          component: Cart,          
        },
        {
          path: 'order',
          name: 'order',
          component: IndexOrder,          
        }, 
        {
          path: 'ordercheckout/:orderId',
          name: 'ordercheckout',
          component: OrderCheckout,          
        },       
        
      ]      
    },

    
    
    
  ]
})
