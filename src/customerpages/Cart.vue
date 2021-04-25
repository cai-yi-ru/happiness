<template>
    <div>
       <div class="container main-contant py-5">
           <div class="form-row text-center">
               <div class="col-12 col-md"><!-- 小裝置為1列 大裝置並排-->
                    <div class="alert alert-warning alert-rounded" role="alert">
                        1.購物車內容
                    </div>
               </div>
               <div class="col-12 col-md">
                    <div class="alert alert-dark alert-rounded " role="alert">
                        2.填寫資訊
                    </div>
                </div>
                <div class="col-12 col-md">
                    <div class="alert alert-dark alert-rounded" role="alert">
                        3.完成
                    </div>
                </div>                
           </div>
           <div class="row justify-content-center mt-5">
                <div class="col-md-8">
                    
                    <h2 class="mt-2 text-brown font-weight-bold">購物車</h2>
                        <table class="table table-sm">
                            <thead>
                                <tr>
                                    <th width="30"></th>
                                    <th width="150"></th>
                                    <th>品名</th>
                                    <th width="100">數量</th>
                                    <th width="80">單價</th>
                                </tr>
                            </thead>
                            <tbody>
                              <tr v-for="item in cart.carts" :key="item.id">
                                <td class="align-middle text-center">
                                    <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
                                        <!--  -->
                                        <i class="far fa-trash-alt"></i>
                                    </button>
                                </td>
                                <td class="py-1">
                                    <img :src="item.product.imageUrl"  alt="" style=" 
                                    height: 80px;
                                    width: 80px;                            
                                    background-size: cover;
                                    background-position: center center;
                                ">
                                </td>
                                <td class="align-middle">{{item.product.title}}
                                    <div class="text-success" v-if="item.coupon">
                                        已套用優惠券
                                    </div>
                                </td>
                                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                                <td class="align-middle text-right">${{ item.final_total }}元</td>
                              </tr>                              
                              <!-- <tr>
                                <td colspan="4" class="text-right">運費</td>
                                <td class="text-right">
                                    <strong>$60</strong>
                                </td>
                                </tr>
                                <tr>
                                    <td colspan="4" class="text-right">合計</td>
                                    <td class="text-right">
                                        <strong>$580</strong>
                                    </td>
                                </tr> -->
                            </tbody>
                            <tfoot>
                                <tr  class="h5">
                                <td colspan="4" class="text-right"><strong>總計</strong></td>
                                <td class="text-right"><strong>${{ cart.total }}元</strong></td>
                                </tr>
                                <tr v-if="cart.final_total !== cart.total " class="h5">
                                <td colspan="4" class="text-right text-success"><strong>折扣價</strong></td>
                                <td class="text-right text-success"><strong>${{ cart.final_total }}元</strong></td>
                                </tr>                                
                            </tfoot>
                            
                        </table>
                        <div class="input-group mb-3 input-group-sm">
                            <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button"  @click="addCouponCode">
                                    
                                套用優惠碼
                                </button>
                            </div>
                        </div>
                        <div class="d-flex mt-4 justify-content-between
                                align-items-md-center align-items-end w-100">
                            <router-link to="/products"
                                        class="text-dark mt-5 h5">
                            <i class="fas fa-chevron-left mr-1"></i>
                            繼續購物
                            </router-link>
                            <router-link to="/order"
                                        class="btn btn-brown mt-5 rounded-0">
                            確認訂單
                            </router-link>
                        </div>
                        
                    
                </div>
            </div>
       </div>
    </div>
</template>
<style scoped>
.alert-rounded{/*圓邊*/
    border-radius: 50px;
}
</style>
<script>
export default {
    data() {
        return { 
            cart:{
                carts:{},
            },            
            isLoading:false,
            coupon_code:'',            
        }
    },
    methods: {
        getCart(){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            vm.isLoading = true;
            this.$http.get(api).then((response) =>{
                // console.log(response.data.data.carts)
                vm.cart = response.data.data;
                vm.isLoading = false;                
                // console.log(vm.cart.carts)
            })
        },
        removeCartItem(id){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
            vm.isLoading = true;
            this.$http.delete(api).then((response) =>{                
                if(response.data.success){
                    vm.isLoading = false;                
                    // console.log(response)
                    // console.log('刪除成功' )
                    vm.getCart();
                }               
                
            })
        },
        addCouponCode(){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
            vm.isLoading = true;
            const coupon = {
                code: vm.coupon_code,
            }
            this.$http.post(api,{data:coupon}).then((response) =>{
                console.log(response)                
                vm.getCart();
                vm.isLoading = false;                
                
            })
        },
    },
    created() {        
        this.getCart();
    },
}
</script>