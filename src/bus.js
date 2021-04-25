import Vue from 'vue';
Vue.prototype.$bus = new Vue();

 // 自定義名稱 'messsage:push'
// message(String): 傳入參數 訊息內容
// status(String): 樣式，預設值為 warning
// this.$bus.$emit('message:push',response.data.message,'danger');