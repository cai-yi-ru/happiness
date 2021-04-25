<template>
  <div>
    <div class="footer container-fluid bg-dark " >
      <div class="row justify-content-center text-light">
        <!-- <div class="col-md-4 d-flex flex-column text-center mt-5">
          <h6>關於我們</h6>
          <router-link to="/login"><i class="fas fa-wrench mr-1"></i>管理者登入</router-link>
          <router-link to="/bulletin#about">一般問題</router-link>
          <router-link to="/bulletin#about">人才招募</router-link>
        </div>
        <div class="col-md-4 d-flex flex-column text-center mt-5">
          <h6>顧客服務</h6>
          <router-link to="/bulletin#service">運送方式</router-link>
          <router-link to="/bulletin#service">付款方式</router-link>
          <router-link to="/bulletin#service">優惠訊息</router-link>
        </div> -->
        <div class="col-md-4 text-center mt-5">
          <h6>聯絡我們</h6>
          <span>服務專線 : 07-5201314</span>
          <p>聯絡時間：AM 10:00~PM 17:00</p>
          <a href="#"><i class="fab fa-facebook-square fa-2x mr-2"></i></a>
          <a href="#"><i class="fab fa-instagram fa-2x mr-2"></i></a>
          <a href="#"><i class="fab fa-line fa-2x"></i></a>
        </div>
        <p class="col-12 text-center mt-3">僅做為個人學習使用，非商業用途。</p>
        <p class="col-12 text-center">2021 © ｜小確幸 Happiness</p>
        <router-link to="/login"><i class="fas fa-wrench mr-1"></i>管理者登入</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .footer{
    height: 280px;
  }
  a{
    text-decoration: none;
    color: white;
    transition: .2s;
    &:hover{
      color: #bc8858;
    }
  }
  @media (max-width:768px) {
    .footer{
      height: auto;
    }
  }
</style>