<template>
    <div>
        <loading :active.sync="isLoading"></loading>        
        <table class="table mt-4">
            <thead>
                <tr>
                    <th>購買時間</th>
                    <th>Email</th>
                    <th >購買款項</th>
                    <th >留言</th>
                    <th width="100">應付金額</th>
                    <th width="100">是否付款</th>                    
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in sortOrder" :key="item.id">
                    <td>{{item.create_at | date }}</td>                    
                    <td><span v-text="item.user.email" v-if="item.user"></span></td>
                    <td >
                        <ul class="list-unstyled">
                        <li v-for="(product, i) in item.products" :key="i">
                            {{ product.product.title }} 數量：{{ product.qty }}
                            {{ product.product.unit }}
                        </li>
                        </ul>
                    </td>
                     <td >{{item.content}}</td>                    
                    <td class="text-right">{{item.total | currency}} 元</td>
                    <td>
                        <span v-if="item.is_paid" class="text-success">付款完成</span>
                        <span v-else class="text-primary">未付款</span>
                    </td>
                   
                </tr>
            </tbody>
        </table>

        <Pagination :pages="pagination" @emitPages="getOrders"></Pagination>
    </div>
</template>

<script>
import Pagination from '../Pagination';




export default {
    components: {
        Pagination
        
    },
    data(){
        return{
            orders:[],
            pagination:{}, 
            isLoading:false,         
        };
    },
    

    methods:{
        getOrders(page=1){
            const vm = this;
             const api =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/orders?page=${page}`;  
             vm.isLoading = true;  
            this.$http.get(api).then((response) => {
                // console.log(response.data)
                vm.orders = response.data.orders;
                vm.isLoading = false;
                vm.pagination = response.data.pagination;
                // console.log(vm.products )
            })
        },
                
        
        
        
    },
    computed:{
        //排序
        sortOrder() {
        const vm = this;
        let newOrder = [];
        if (vm.orders.length) {
            newOrder = vm.orders.sort((a, b) => {
            const aIsPaid = a.is_paid ? 1 : 0;
            const bIsPaid = b.is_paid ? 1 : 0;
            return bIsPaid - aIsPaid;
            });
        }
        return newOrder;
        },
    },
    created(){
        this.getOrders();
        
    }
}
</script>
    

