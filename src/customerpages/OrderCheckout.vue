<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="container main-contant py-5">
            <div class="form-row text-center">
               <div class="col-12 col-md"><!-- 小裝置為1列 大裝置並排-->
                    <div class="alert alert-success alert-rounded" role="alert">
                        1.購物車內容
                    </div>
               </div>
               <div class="col-12 col-md">
                    <div class="alert alert-success alert-rounded " role="alert">
                        2.填寫資訊
                    </div>
                </div>
                <div class="col-12 col-md">
                    <div class="alert alert-warning alert-rounded" role="alert" v-if="!order.is_paid">
                        3.完成
                    </div>
                    <div class="alert alert-success alert-rounded" role="alert" v-else>
                        3.完成
                    </div>
                </div>                
           </div>
           <div class="row justify-content-center mt-5">
               <div class="col-md-8">
                   <form class="col-md-10" @submit.prevent="payOrder">
                        <table class="table">
                        <thead>
                            <th>品名</th>
                            <th>數量</th>
                            <th>單價</th>
                        </thead>
                        <tbody>
                            <tr v-for="item in order.products" :key="item.id">
                            <td class="align-middle">{{ item.product.title }}</td>
                            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                            <td class="align-middle text-right">{{ item.final_total }}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                            <td colspan="2" class="text-right">總計</td>
                            <td class="text-right"><strong>${{ order.total }}元</strong></td>
                            </tr>
                        </tfoot>
                        </table>

                        <table class="table">
                        <tbody>
                            <tr>
                            <th width="100">Email</th>
                            <td>{{ order.user.email }}</td>
                            </tr>
                            <tr>
                            <th>姓名</th>
                            <td>{{ order.user.name }}</td>
                            </tr>
                            <tr>
                            <th>收件人電話</th>
                            <td>{{ order.user.tel }}</td>
                            </tr>
                            <tr>
                            <th>收件人地址</th>
                            <td>{{ order.user.address }}</td>
                            </tr>
                            <tr>
                            <th>付款狀態</th>
                            <td>
                                <span v-if="!order.is_paid">尚未付款</span>
                                <span v-else class="text-success">付款完成</span>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                        <div class="text-right" v-if="order.is_paid === false">
                        <button class="btn btn-danger">確認付款去</button>
                        </div>
                    </form>
               </div>
           </div>
        </div>
    </div>
</template>
<style>
.alert-rounded{/*圓邊*/
    border-radius: 50px;
}
</style>
<script>
import AlertMsg from '@/plugin/MsgAlert';

export default {
    data() {
        return {
            order:{
                user:{},
            },
            orderId:'',
            isLoading:false,
        }
    },
    methods: {
        getOrder(){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
            vm.isLoading = true;
            this.$http.get(api).then((response) =>{
                // console.log(response.data)
                 vm.order = response.data.order;
                vm.isLoading = false;                
                // console.log(vm.cart.carts)
            })
        },
        payOrder(){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
            vm.isLoading = true;
            this.$http.post(api).then((response) =>{
                
                
                // console.log(response)
                //  vm.order = response.data.order;
                if(response.data.success){
                    console.log('付款成功' )
                    vm.getOrder();
                }
                vm.isLoading = false;                
                // console.log(vm.cart.carts)
            })
        }
    },
    created() {
        this.orderId = this.$route.params.orderId;
        
        console.log(this.orderId )
        this.getOrder();
    },
    
}
</script>