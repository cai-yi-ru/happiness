// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//安裝axios
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap'
//導入
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules';


import App from './App'
import router from './router'
import './bus';






import currencyFilter from './filters/currency'
import dateFilter from './filters/date';

Vue.use(VueAxios, axios);

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

localize('zh_TW', TW);

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});



//用全域的方式來啟用元件
Vue.component('Loading',Loading)
Vue.filter('currency',currencyFilter)//金額前面加$符號
Vue.filter('date',dateFilter//時間格式轉換
)
axios.defaults.withCredentials = true;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

//路由守衛
router.beforeEach((to, from, next) => {
  // ...

  if(to.meta.requiresAuth){
    const api =`${process.env.APIPATH}/api/user/check`;    
    axios.post(api).then((response) => {
      console.log(response.data)
      console.log('這裡需要認證' )
      if(response.data.success){
        next();
      }else{
        next({
          path:'/login',
        })
      }
    })
    
  }else{
    next();
  }
})
