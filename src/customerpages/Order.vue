<template>
    <div>
        <div class="container main-contant py-5">
            <div class="form-row text-center">
               <div class="col-12 col-md"><!-- 小裝置為1列 大裝置並排-->
                    <div class="alert alert-success alert-rounded" role="alert">
                        1.購物車內容
                    </div>
               </div>
               <div class="col-12 col-md">
                    <div class="alert alert-warning alert-rounded " role="alert">
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
                    <h2 class="mt-2 text-brown font-weight-bold">客戶資訊</h2>
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
    </div>
</template>
<style>
.alert-rounded{/*圓邊*/
    border-radius: 50px;
}
</style>

<script>
export default {
    data() {
        return {
            
            isLoading:false,            
            form:{
                user:{
                    name:'',
                    email:'',
                    tel:'',
                    address:'',                    
                },
                message:'',
            }
        }
    },
    methods: {
        createOrder(){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
            const order = vm.form;
            vm.isLoading = true;            
            this.$http.post(api,{data:order}).then((response) =>{
                console.log('訂單已建立',response.data.orderId)  
                if(response.data.success){ 
                    vm.$bus.$emit("upDataCart");
                    vm.$router.push(`/ordercheckout/${response.data.orderId}`) 
                                      
                    // vm.$router.push(`/ordercheckout/${response.data.orderId}`)
                    console.log('123' )
                }else{
                    console.log(response.data.message )
                }
                
                vm.isLoading = false;                
                
            })
        }
    },
}
</script>