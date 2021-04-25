<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <section>
            <div class="container mt-5">
                <div class="row">

                    <!-- 使用ListGroup切換產品類別 -->
                    <div class="col-lg-2 ">
                        <div class="list-group text-center "  id="myList" role="tablist" >
                            <div>
                                <a  href="#" class="list-group-item list-group-item-action category h5" :class="{'active':category==='All'} " 
                                    @click.prevent="changeCategory('All')">
                                    全部商品
                                </a>
                            </div>
                            <div v-for="(item, index) in filterCategory" :key="index">
                                <a class="list-group-item list-group-item-action category h5" 
                                    href="#"
                                    :class="{'active':category===item}"
                                    @click.prevent="changeCategory(item)">
                                    {{ item }}
                                </a>
                            </div>
                            
                            
                            
                        </div>
                    </div>


                    <div class="col-lg-10">
                        <div class="row mt-4">
                            <div class="col-lg-4 mb-4" v-for="item in filterProducts" :key="item.id">
                                <div class="card border-0 shadow-sm">
                                    <div style="height: 250px; background-size: cover; background-position: center center"
                                    :style="{backgroundImage:`url(${item.imageUrl}`}"
                                    >
                                    </div>
                                    <div class="card-body">
                                    <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                                    <h5 class="card-title">
                                        <a href="#" class="text-dark">{{item.title}}</a>
                                    </h5>
                                    <p class="card-text">{{item.content}}</p>
                                    <div class="d-flex justify-content-between align-items-baseline">
                                        <!-- <div class="h5">2,800 元</div> -->
                                        <del class="h6">原價 {{item.origin_price}} 元</del>
                                        <div class="h5">現在只要 {{item.price}} 元</div>
                                    </div>
                                    </div>
                                    <div class="card-footer d-flex">
                                    <button type="button" class="btn btn-outline-secondary btn-sm" @click="getproduct(item.id)">
                                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem ===item.id"></i>
                                        查看更多
                                    </button>
                                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addCart(item.id)">
                                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem ===item.id"></i>
                                        加到購物車
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>


        

        <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <img :src="product.imageUrl" class="img-fluid" alt="">
                        <blockquote class="blockquote mt-3">
                        <p class="mb-0">{{ product.content }}</p>
                        <footer class="blockquote-footer text-right">{{ product.description }}</footer>
                        </blockquote>
                        <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
                        <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                        <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
                        </div>
                        <select name="" class="form-control mt-3" v-model="product.num">
                            <option :value="num" v-for="num in 10" :key="num">
                                選購 {{num}} {{product.unit}}
                            </option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <div class="text-muted text-nowrap mr-3">
                        小計 <strong>{{ product.num * product.price | currency }}</strong> 元
                        </div>
                        <button type="button" class="btn btn-primary"
                        @click="addCart(product.id, product.num)">
                        <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
                        加到購物車
                        </button>
                    </div>
                </div>
            </div>
        </div>



        <!-- 將pagination元件化 -->
        <div class="row justify-content-center">
            <pagination :pages="pagination" @emitPages="getProducts" v-if="category==='All'" class=""></pagination>
        </div>
        

        <br>
        <div class="container">
            <div class="my-5 row justify-content-center">
                <div class="my-5 row justify-content-center">
                    <table class="table">
                    <thead>
                        <th></th>
                        <th>品名</th>
                        <th>數量</th>
                        <th>單價</th>
                    </thead>
                    <tbody>
                        <tr v-for="item in cart.carts" :key="item.id">
                        <td class="align-middle">
                            <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
                            <i class="far fa-trash-alt"></i>
                            </button>
                        </td>
                        <td class="align-middle">
                            {{ item.product.title }}
                            <div class="text-success" v-if="item.coupon">
                            已套用優惠券
                            </div>
                        </td>
                        <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                        <td class="align-middle text-right">{{ item.final_total }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                        <td colspan="3" class="text-right">總計</td>
                        <td class="text-right">{{ cart.total }}</td>
                        </tr>
                        <tr v-if="cart.final_total !== cart.total ">
                        <td colspan="3" class="text-right text-success">折扣價</td>
                        <td class="text-right text-success">{{ cart.final_total }}</td>
                        </tr>
                    </tfoot>
                    </table>
                    <div class="input-group mb-3 input-group-sm">
                        <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                            套用優惠碼
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <br>
        <div class="container">
            <div class="my-5 row justify-content-center">
                <validation-observer class="col-md-6" v-slot="{ invalid }">
                    <form  @submit.prevent="createOrder">
                        
                        <validation-provider  rules="required|email" v-slot="{ errors,classes }">
                            <div class="form-group">
                                 <!-- 輸入框 -->
                                <label for="email">Email</label>
                                <input id="email" type="email" name="Email" v-model="form.user.email"
                                    class="form-control" :class="classes" placeholder="請輸入 Email">
                                <!-- 錯誤訊息 -->
                                <span class="invalid-feedback">{{ errors[0] }}</span>
                            </div>                           
                        </validation-provider>  
                                              
                        <validation-provider  rules="required" v-slot="{ errors,classes }">
                            <div class="form-group">
                                 <!-- 輸入框 -->
                                <label for="username">收件人姓名</label>
                                <input id="username" type="text" name="姓名" v-model="form.user.name"
                                    class="form-control" :class="classes" placeholder="請輸入姓名">
                                <!-- 錯誤訊息 -->
                                <span class="invalid-feedback">{{ errors[0] }}</span>
                            </div>                           
                        </validation-provider>
                        
                        <validation-provider  rules="required|integer" v-slot="{ errors,classes }">
                            <div class="form-group">
                                 <!-- 輸入框 -->
                                <label for="usertel">收件人電話</label>
                                <input id="usertel" type="tel" name="電話" v-model="form.user.tel"
                                    class="form-control" :class="classes" placeholder="請輸入電話">
                                <!-- 錯誤訊息 -->
                                <span class="invalid-feedback">{{ errors[0] }}</span>
                            </div>                           
                        </validation-provider>                       

                        <validation-provider  rules="required" v-slot="{ errors,classes }">
                            <div class="form-group">
                                 <!-- 輸入框 -->
                                <label for="useraddress">收件人地址</label>
                                <input id="useraddress" type="tel" name="地址" v-model="form.user.address"
                                    class="form-control" :class="classes" placeholder="請輸入地址">
                                <!-- 錯誤訊息 -->
                                <span class="invalid-feedback">{{ errors[0] }}</span>
                            </div>                           
                        </validation-provider>
                         <div class="form-group">
                        <label for="comment">留言</label>
                        <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                        </div>

                        
                        <div class="text-right mt-4" >
                        <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
                        </div> 
                    </form>
                </validation-observer>
            </div>
        </div>


    </div>
</template>


<script>
import $ from 'jquery';
import Pagination from '../Pagination';


export default {
    components: {
        Pagination
        
    },
    data() {
        return {
            products:[],
            productss:[],
            product:{},
            cart:{},
            pagination:{},
            isLoading:false,
            status:{
                loadingItem:false,
            },
            coupon_code:'',
            form:{
                user:{
                    name:'',
                    email:'',
                    tel:'',
                    address:'',                    
                },
                message:'',
            },
            category: "All",
            categoryItem: [],

        }
    },
    methods: {
        getProducts(page=1){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
            vm.isLoading = true;
            this.$http.get(api).then((response) =>{
                vm.products = response.data.products;
                vm.isLoading = false;
                vm.pagination = response.data.pagination;
                //  console.log(vm.products)
            })
        },
        getProductss(){
            const vm = this;
            vm.isLoading = true;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
            vm.$http.get(api).then(response => {
                vm.productss = response.data.products;
                
                vm.isLoading = false;
                
            });
        },
        getproduct(id){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
            vm.status.loadingItem = id;
            this.$http.get(api).then((response) =>{

                $('#productModal').modal('show');
                response.data.product.num = 1;
                vm.product = response.data.product;
                // vm.product.num =1;
                // console.log(response.data.product)
                vm.status.loadingItem = '';                
            })
        },
        changeCategory(item) {
            const vm = this;
            // vm.keyPoint = "";
            vm.category = item;
        },
        addCart(id ,qty=1){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            vm.status.loadingItem = id;
            const cart = {
                product_id : id,
                qty,
            };
            this.$http.post(api,{data :cart}).then((response) =>{

                // console.log(response.data)
                vm.status.loadingItem = ''; 
                vm.getCart();
                 $('#productModal').modal('hide');               
            })
        },
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
                // console.log(response)                
                vm.getCart();
                vm.isLoading = false;                
                
            })
        },
        createOrder(){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
            const order = vm.form;
            vm.isLoading = true;            
            this.$http.post(api,{data:order}).then((response) =>{
                console.log('訂單已建立',response)  
                if(response.data.success){                    
                    vm.$router.push(`/admin/customer_checkout/${response.data.orderId}`)
                    
                }
                
                vm.isLoading = false;                
                
            })
        }

    },
    computed:{
        filterCategory() {
            const vm = this;
            vm.productss.forEach(item => {
                vm.categoryItem.push(item.category);
            });
            // console.log(vm.products)
            return vm.categoryItem.filter(function(item, index, arr) {
                return arr.indexOf(item) === index;
            });
        },
        filterProducts() {
            const vm = this;
            if (vm.category === "All") {
                return vm.products;
            } else if (vm.category != "All") {
                return vm.productss.filter(function(item) {
                return item.category === vm.category;
                });
            }
        },
    },
    created() {
        this.getProducts();
        this.getProductss();
        this.getCart();
    },
}
</script>