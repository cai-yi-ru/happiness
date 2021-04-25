<template>
  <div class="sticky-top">
    <loading :active.sync="isLoading"></loading>
    <nav class="navbar navbar-expand-lg bg-white ">
      <div class="container">
        <h2 class="home-navbar-brand text-brown"><i class="fas fa-hand-holding-heart "></i> 小確幸 Happiness</h2>  
        <button 
          class="navbar-toggler navbar-toggle-bar"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto mt-2">
            <li class="nav-item">
              <router-link class="nav-link header-navbtn text-center text-brown h5" to="/">Home</router-link>
            </li>            
            <li class="nav-item">
              <router-link class="nav-link header-navbtn text-center text-brown h5" to="/sproducts">全部商品</router-link>
            </li>            
            <li class="nav-item">
              <router-link class="nav-link header-navbtn text-center text-brown h5" to="/coupon">優惠券</router-link>
            </li>
            
          </ul>
        </div>
        <div class="dropdown ml-auto 	d-none d-lg-block " >
            <button class="btn btn-sm btn-cart" :class="{'d-none': hidden}" data-toggle="dropdown" data-flip="false">
                <i class="fas fa-shopping-cart text-color fa-2x"></i>
                <!-- <span class="badge badge-pill badge-danger">12</span> -->
                <span class="badge badge-pill badge-danger" v-if="cart.carts.length !== 0">{{cart.carts.length}}</span>
            </button>
            <div class="dropdown-menu dropdown-menu-right" style="min-width: 300px;">
                <div class="px-4 py-3">
                    <h6 v-if="cart.final_total!=0">已選擇商品</h6>
                    <table class="table table-sm" v-if="cart.final_total!=0 ">
                        <tbody  >
                          <tr v-for="item in cart.carts" :key="item.id">
                            <td class="align-middle text-center">
                               <button class="btn btn-outline-danger btn-sm" @click="delCartItem(item)">
                                <i class="far fa-trash-alt"></i>
                              </button>
                            </td>
                            <td class="align-middle">{{item.product.title}}</td>
                            <td class="align-middle">{{item.qty}}/{{item.product.unit}}</td>
                            <td
                              class="align-middle text-right"
                              v-if="item.product.price"
                            >{{item.total |currency}}元</td>
                          </tr>
                          <tr>
                            <td colspan="3" class="text-right">總計</td>
                            <td class="text-right">{{cart.total |currency}}元</td>
                          </tr>
                        </tbody>                        
                      </table>
                      <div v-else>
                          <p class="h1 text-center">購物車內無任何商品！</p>
                      </div>
                      <router-link to="/cart" class="btn btn-brown btn-block"
                      v-if="cart.final_total!=0">結帳去</router-link>
                      <router-link to="/sproducts" class="btn btn-brown btn-block"
                      v-else>立刻去逛逛吧！</router-link>
                      
                </div>
            </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
// import $ from "jquery";
import AlertMsg from '@/plugin/MsgAlert';

export default {
  data() {
    return {
      hidden: false,
      cart: {
        carts: {}
      },
      isLoading: false
    };
  },
  methods:{
    getCart(){      
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        vm.isLoading = true;
        this.$http.get(api).then((response) =>{
            
            vm.cart = response.data.data;
            vm.isLoading = false;                
            // console.log(vm.cart.carts)
        })
    },
    delCartItem(item){
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${item.id}`;
        vm.isLoading = true;
        this.$http.delete(api).then((response) =>{                
            if(response.data.success){
                vm.isLoading = false;
                AlertMsg.fire({
                  text: '商品已刪除',
                  icon: 'success',
                });
                // vm.$bus.$emit(
                //   "message:push",
                //   `已將 ${item.product.title} 從購物車中刪除`,
                //   "danger"
                // );                
                // console.log(response)
                // console.log('刪除成功' )
                vm.$bus.$emit("upDataCart");
                vm.getCart();
                
            }
                           
            
        })
    },
    hideenCart() {
      const vm = this;
      if (vm.$route.name === "order" || vm.$route.name === "ordercheckout") {
        vm.hidden = true;
      } else {
        vm.hidden = false;
      }
    },
    
  },
  created(){
      const vm = this;
      vm.getCart();
      vm.hideenCart();
      vm.$bus.$on("upDataCart", () => {
      vm.getCart();
      });
  },
  watch: {
    $route(route) {
      // console.log(route.name)
      const vm = this;
      if (route.name === "order" || route.name === "ordercheckout") {
        vm.hidden = true;
      } else {
        vm.hidden = false;
      }
    }
  }
}
</script>


<style  scoped>
 .home-navbar-brand {
    padding-top: .75rem;
    padding-bottom: .75rem;
    font-size: 2rem;
    
    
  }

 .navbar-brand {
    padding-top: .75rem;
    padding-bottom: .75rem;
    font-size: 1rem;
    background-color: rgba(0, 0, 0, .25);
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
  }
  
  .navbar .form-control {
    padding: .75rem 1rem;
    border-width: 0;
    border-radius: 0;
  }

  .text-color{
      color: #bc8858;
  }


  .btn-cart{
    background-color: transparent;
}
.btn-cart .badge{/* 購物車與標籤空間去掉 */
    position: absolute;
    top: -1px;
    right: -1px;
}
.dropdown-menu-right{/* 調整navbar 內dropdown-menu 顯示方向 */
    right: 0;
    left: auto;
}
</style>