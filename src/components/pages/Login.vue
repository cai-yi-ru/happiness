<template>
  <div class="login">
    <form class="form-signin" @submit.prevent="signin">
        <h1 class="h3 mb-3 font-weight-normal text-center">請先登入</h1>
        <label for="inputEmail" class="sr-only" >信箱</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="user.username" required autofocus>
        <label for="inputPassword" class="sr-only">密碼</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="user.password" required>
        
        <button class="btn btn-lg btn-brown btn-block" type="submit">登入</button>
         <router-link to="/" class="text-dark ">
         <div class="text-center mt-3">
           回到首頁
           <span class="ml-3">
            <i class="fas fa-arrow-alt-circle-right"></i>
          </span>
         </div>
          
    </router-link>
        <p class="mt-5 mb-3 text-muted text-center">&copy; 2021</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      user:{
          username:'',
          password:'',
      }
    }
  },
  methods: {
    signin(){
        const vm = this; 
        const api =`${process.env.APIPATH}/admin/signin`;    
        console.log(api)
        this.$http.post(api,vm.user).then((response) => {
            // console.log(response.data)
            if(response.data.success){
                const token = response.data.token;
                const expired = response.data.expired;
                // console.log(token, expired)
                document.cookie = `yiruToken=${token};expires=${new Date(expired)};`;
                 vm.$router.push('/adminbg/products')
            }
        })
    
    },
  }
}

</script>

<style scoped>
    html,
    body {
    height: 100%;
    }

    body {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
    }

    .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
    }
    .form-signin .checkbox {
    font-weight: 400;
    }
    .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
    }
    .form-signin .form-control:focus {
    z-index: 2;
    }
    .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    }
    .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    }
    .login {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
  /* background-color: $dark; */
}
</style>