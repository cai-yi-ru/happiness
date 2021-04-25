<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="container ec-container mt-3">
            <div class="row justify-content-center">
                <div class="col-md-10">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb bg-transparent pl-0">
                            <li class="breadcrumb-item h5"><router-link to="/" class="text-brown">Home</router-link ></li>
                            <li class="breadcrumb-item h5"><router-link to="/products" class="text-brown">全部商品</router-link></li>
                            <li class="breadcrumb-item active h5" aria-current="page" >{{ product.title }}</li>
                        </ol>
                    </nav>
                    <div class="row mb-5">
                        <div class="col-md-6">
                            <div >
                                <img :src="product.imageUrl"  alt="" style="
                                    height: 400px;
                                     width:100%;                                     
                                    background-size: cover;
                                    background-position: center center;
                                " class="img-fluid">                                
                            </div>
                        </div>
                        <div class="col-md-6">
                             <h2 class="font-weight-bold text-black">
                                {{ product.title }}
                            </h2>
                            <p>{{ product.content }}</p>
                            <div>
                               
                                <p class="mt-5">
                                【<i class="fas fa-truck"></i> 運送方式：】<br />
                                </p>
                                <div>
                                <ul>
                                    <li>超商物流配送約2-3個不含例假日的工作天<br />
                                        品抵達超商將以簡訊或是電子郵件通知</li>
                                    <li>宅配物流配送約1-2個不含每週日的工作天<br />
                                        宅配人員配送前會以電話與您聯繫</li>
                                    <li>加盟門市取貨付款 以宅配配送至門市<br />
                                        商品到店後門市人員將以電話聯繫</li>
                                </ul>
                                </div>                                
                            </div>
                                <div class="d-flex justify-content-between align-items-baseline">
                                <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
                                <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                                <div class="h4 text-danger" v-if="product.price">特價TWD {{ product.price }} 元</div>
                            </div>

                            <select name="" class="form-control mt-3" v-model="product.num">
                                <option :value="num" v-for="num in 10" :key="num">
                                    選購 {{num}} {{product.unit}}
                                </option>
                            </select>
                            <div class="input-group mt-3">
                                <div class="text-muted text-nowrap mr-3 mr-auto h3 mt-3">
                                小計 <strong>{{ product.num * product.price | currency }}</strong> 元
                                </div>
                                <button type="button" class="btn btn-brown "
                                @click="addCart(product.id, product.num)">
                                <i class="fas fa-spinner fa-spin " v-if="product.id === status.loadingItem"></i>
                                加到購物車
                                </button>
                            </div>
                        </div>
                        <div class="my-4 bg-light p-3" role="alert">
                            <h2 class="text-center h2">售後服務說明</h2>
                            <p>小店很重視您的託付，出貨前已確認蛋糕的完整性才貼上托運單及警告標語，若運送過程中，物流公司集貨或行駛路上顛簸，導致蛋糕位移(3~ 5cm)、變形或盒內四周沾奶油或裝飾品，如水果、巧克力裝飾片，脫落等不可抗拒之情況，皆恕不在換退貨及退款之範圍，只有商品翻覆/倒置180度之情況不在此限，若您無法承受運送中的風險，請改以門市取貨。

                                逢各大節日前（春節、母親節、端午、中秋、聖誕節等節慶）宅配貨量增加，到貨時間無法保證，容易有延遲、早到或增加商品受傷機率情況，若您有一定急需於某時段收到商品，請提前一至兩日到達或改為門市取貨。 <br>

                                <br>
                                貼心小提醒：
                                <br>
                                <br>
                                ．因商品為接單製作，不添加任何防腐劑，產品裝飾因季節水果生產的關係，實際裝飾以實際商品為主，建議您收到蛋糕後在蛋糕的最佳賞味限內食用完畢。
                                <br>
                                ．若有含新鮮水果的甜點，建議於當日食用完畢風味較佳。
                                <br>
                                ．未食用完畢的甜點，請存放在蛋糕盒內並將上蓋蓋好，避免因為冰箱冷藏空氣帶走蛋糕水分，影響蛋糕甜點的口感喔！
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import AlertMsg from '@/plugin/MsgAlert';
export default {
    data() {
        return {
            status: {
                loadingItem: '',
            },
            product: {
                num: 1,
                imageUrl: [],
            },
            isLoading: false,
        }
    },methods: {
        getProduct() {
            const vm = this;
            const { id } = this.$route.params;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
             vm.isLoading = true;
            this.$http.get(api).then((response) =>{
                // console.log(response)
                response.data.product.num = 1;
                vm.product = response.data.product;
                // vm.product.num =1;
                // console.log(response.data.product)
                vm.status.loadingItem = '';
                vm.isLoading = false;                
            })                
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
                 AlertMsg.fire({
                    title: '已加入購物車',
                    icon: 'success',
                });
                vm.$bus.$emit("upDataCart");
                // console.log(response.data)
                vm.status.loadingItem = ''; 
                // vm.getCart();
                //  $('#productModal').modal('hide');               
            })
        },
    },
    created() {
        this.getProduct();
    },
}
</script>