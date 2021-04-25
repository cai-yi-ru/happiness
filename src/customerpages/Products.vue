<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <!-- 卡片式排版與Grid System整齊排版 -->
    <section>
        <div class="container mt-5">
            <div class="row">
                
                <!-- 使用ListGroup切換產品類別 -->
                <div class="col-lg-3 ">
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

          


                <div class="col-lg-9">
                    <div class="tab-content">
                        <div class="tab-pane active" id="pane-1">
                            <div class="row">
                                <div class="col-lg-4 mb-4" v-for="(item) in filterProducts" :key="item.id">
                                    <div class="card box-shadow text-center h-100 ">
                                        <div class="pic ">
                                            <div style="height: 250px; background-size: cover; background-position: center center"
                                            :style="{backgroundImage:`url(${item.imageUrl}`}" class="pic-enlarge img-fluid">
                                            </div>
                                        </div>
                                       
                                        <div class="card-body">
                                          <h5 class="card-title">{{item.title}}</h5>
                                          <!-- <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> -->
                                            <div class="d-flex justify-content-between align-items-baseline">
                                                
                                                <del class="h6">$ {{item.origin_price}} 元</del>
                                                <div class="h5 text-danger">NT$ {{item.price}} 元</div>
                                            </div>
                                        </div>
                                        <div class="card-footer  bg-white d-flex">
                                            <!-- <button type="button" class="btn btn-outline-secondary btn-sm" @click="getproduct(item.id)">
                                                <i class="fas fa-spinner fa-spin" v-if="status.loadingItem ===item.id"></i>
                                                查看更多
                                            </button> -->
                                            <router-link class="btn btn-outline-secondary btn-sm" :to="`/product/${ item.id }`">see more</router-link>
                                            <!-- <button type="button" class="btn btn-brown btn-sm ml-auto" @click="addCart(item.id)">
                                                <i class="fas fa-spinner fa-spin" v-if="status.loadingItem ===item.id"></i><i class="fas fa-shopping-cart"></i>
                                                加到購物車
                                            </button> -->
                                            <a class="btn text-danger ml-auto" @click="addCart(item.id)"><i class="fas fa-spinner fa-spin" v-if="status.loadingItem ===item.id"></i><i class="fas fa-shopping-cart fa-lg"></i></a>
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        </div>                        
                    </div>
                    
                </div>
            </div>
        </div>
    </section>
    </div>
</template>

<script>

import AlertMsg from '@/plugin/MsgAlert';

export default {
    data() {
        return {
            isLoading: false,
            products: [],
            category: "All",
            categoryItem: [],
            status:{
                loadingItem:false,
            },
        }
    },
    methods: {
        getProducts(){
            const vm = this;
            vm.isLoading = true;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
            vm.$http.get(api).then(response => {
                vm.products = response.data.products;
                // vm.products.forEach(function(item) {
                // vm.$set(item, "isLike", false);
                // });
                // vm.products.forEach(function(item) {
                //     vm.myFavorite.forEach(function(itemLove) {
                //         if (itemLove === item.id) {
                //         item.isLike = true;
                //         }
                //     });
                // });
                vm.isLoading = false;
                // console.log(vm.products )
            });
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
                // vm.$bus.$emit('update-total');
                AlertMsg.fire({
                    title: '已加入購物車',
                    icon: 'success',
                });
                vm.$bus.$emit("upDataCart");
                
                // console.log(response.data)
                vm.status.loadingItem = ''; 
                // vm.getCart();
                // $('#productModal').modal('hide');               
            })
        },


    },
    computed:{
        filterCategory() {
            const vm = this;
            vm.products.forEach(item => {
                vm.categoryItem.push(item.category);
            });
            return vm.categoryItem.filter(function(item, index, arr) {
                return arr.indexOf(item) === index;
            });
        },
        filterProducts() {
            const vm = this;
            if (vm.category === "All") {
                return vm.products;
            } else if (vm.category != "All") {
                return vm.products.filter(function(item) {
                return item.category === vm.category;
                });
            }
        },
    },
    created() {
        const vm = this;

        if (vm.$route.params.category) {
        vm.category = vm.$route.params.category;
        }

        vm.getProducts();
        
    },
}
</script>

<style scoped>
.list-group-item.active {
    background-color: #6b5139;

  }
  .category {
  border-radius: 15px;
}
.pic {
  overflow: hidden;
}

/* 滑鼠移到圖片時放大 */
.pic-enlarge {
  transform: scale(1, 1);
  transition: all 0.3s ease-out;
  position: relative;
  height: 150px; 
  background-size: cover; 
  background-position: center;  
}
.pic-enlarge:hover{
    transform: scale(1.2, 1.2);
}
.box-shadow{/*加上陰影*/
    box-shadow: 0 3px 5px rgba(0,0,0, 0.16);
    transition: box-shadow 0.3s;
}
.box-shadow:hover{/*加強擴散效果*/
    box-shadow: 0 4px 10px rgba(0,0,0, 0.36);
}

@media screen and (min-width: 769px) {
    .list-group {
      position: sticky;
      top: 100px;
    }
  }

</style>