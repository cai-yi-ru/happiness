<template>
    <div>
        
       
        <!-- Portfolio -->
        <section class="content-section" id="portfolio">
            <div class="container">
            <div class="content-section-heading text-center">
                <h3 class="text-secondary mb-0">Happiness</h3>
                <h2 class="mb-5 text-brown">「小確幸」</h2>
                <p class="h5">從生活小事中感受到的幸福，《小確幸》代表微小而確切的幸福。</p>
            </div>
            <div class="row no-gutters mt-5">
                <div class="col-lg-6">
                <a class="portfolio-item" href="#!" @click.prevent="$router.push({ name: 'sproducts', params: { category: '冰品' }})">
                    <div class="caption">
                    <div class="caption-content">
                        <div class="h2">冰品</div>
                        <!-- <p class="mb-0">A yellow pencil with envelopes on a clean, blue backdrop!</p> -->
                    </div>
                    </div>
                    <img class="img-fluid"  src="https://images.unsplash.com/photo-1515037028865-0a2a82603f7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1021&q=80" alt="">
                </a>
                </div>
                <div class="col-lg-6">
                <a class="portfolio-item" href="#!" @click.prevent="$router.push({ name: 'sproducts', params: { category: '甜點' }})" >
                    <div class="caption">
                    <div class="caption-content">
                        <div class="h2">甜點</div>
                        <!-- <p class="mb-0">A dark blue background with a colored pencil, a clip, and a tiny ice cream cone!</p> -->
                    </div>
                    </div>
                    <img class="img-fluid" style="height:385px" src="https://images.unsplash.com/photo-1611101744813-3680659522d2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80" alt="">
                </a>
                </div>
                <div class="col-lg-6">
                <a class="portfolio-item" href="#!" @click.prevent="$router.push({ name: 'sproducts', params: { category: '特調飲品' }})">
                    <div class="caption">
                    <div class="caption-content">
                        <div class="h2">特調飲品</div>
                        <!-- <p class="mb-0">Strawberries are such a tasty snack, especially with a little sugar on top!</p> -->
                    </div>
                    </div>
                    <img class="img-fluid" src="https://images.unsplash.com/photo-1583228888343-41c44e6fccea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="">
                </a>
                </div>
                <div class="col-lg-6">
                <a class="portfolio-item" href="#!" @click.prevent="$router.push({ name: 'sproducts', params: { category: '咖啡' }})">
                    <div class="caption">
                    <div class="caption-content">
                        <div class="h2">咖啡</div>
                        <!-- <p class="mb-0">A yellow workspace with some scissors, pencils, and other objects.</p> -->
                    </div>
                    </div>
                    <img class="img-fluid" src="https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="">
                </a>
                </div>
            </div>
            </div>
        </section>

    <!-- <section class="container-fluid bg-white " style="height:100px;"></section> -->

  


    <!-- 為什麼選擇了開始閱讀 -->
    <section class="section my-md-9">
         <!-- (標語) 在 md 以上隱藏 -->
        <div class="row justify-content-center d-md-none no-gutters my-4">
            <div class="col-8 ">
                <h2 class="vertical-content-text text-center text-main-color verticla-title font-weight-bold ">
                    『咖啡』——
                    <br>
                    各種養生好處!
                </h2>
            </div>
        </div>
        <div class="bg-main-lighter">
            <div class="container">
                <div class="row">
                    <!--垂直文字區-->
                    <div class="col-md-6 section-over">
                        <div class="bg-cover h-100 section-why-img"
                            style="background-image: url(https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=956&q=80); ">

                        </div>
                    </div>
                    <div class="col-md-6 d-md-flex justify-content-end vertical-content text-main-color px-2">
                        <p class="vertical-content-text writing-md-vertical py-md-5 py-4 text-justify" style="font-size:130%;">
                            咖啡，在千年前被發現後，由於其特殊風味及提神效用，因而流行於全球，是世界上最具風味及養生效果的飲品，曾被賜名為『神的飲料』。<br>
                            <br>
                             一、提神醒腦強化記憶
                            <br />
                            二、強化筋骨提升運動效能
                            <br />
                            三、開胃助消化
                            <br />
                            四、放鬆情緒紓解壓力
                        </p>
                        <!-- (標語) 在 md 以上會顯示 -->
                        <h2 class="vertical-content-text section-over verticla-title d-none d-md-block">『神的飲料』——
                            <br>
                            <span class="mt-4 font-weight-bold ">  喝咖啡的好處？</span>
                        </h2>

                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 為什麼要喝罐裝飲料 -->
    <section class="section my-md-9">
        <!-- (標語) 在 md 以上隱藏 -->
        <div class="row justify-content-center d-md-none no-gutters my-4">
            <div class="col-8 ">
                <h2 class="vertical-content-text text-center verticla-title text-main-color font-weight-bold">
                    『神聖之果』--
                    <br>
                    低卡又排毒
                </h2>
            </div>
        </div>
        <div class="bg-main-lighter">
            <div class="container">
                <div class="row">
                    <!--垂直文字區-->
                    <div class="col-md-6 d-md-flex justify-content-end vertical-content text-main-color px-2">
                        <p class="vertical-content-text py-md-5 py-4"  style="font-size:130%;">
                            火龍果原產地是中美洲。火龍果對咳嗽、氣喘有療效，經研究發現也有預防便秘、防老年病變、抑制腫瘤等功效。<br>
                            <br>
                            
                        </p>
                        <!-- (標語) 在 md 以上會顯示 -->
                        <h2 class="vertical-content-text section-over verticla-title d-none d-md-block">『神聖之果』--
                            <br>
                            <span class="mt-4 font-weight-bold">低卡又排毒！</span>
                        </h2>
                    </div>
                    <div class="col-md-6 section-over">
                        <div class="bg-cover h-100 section-why-img"
                            style="background-image: url(https://images.unsplash.com/photo-1552267349-77e8b9af61c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80); ">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


   

    </div>
</template>


<style>




/* // write-mode */

@media (min-width: 768px) {
    .writing-md-vertical {
        writing-mode: vertical-rl;
        font-family:標楷體;
        
    }
}


/*  */
.bg-cover {
  background-size: cover;
  background-position: center center;
}
.section-why-img {
  min-height: 200px;
}

@media (max-width: 991.98px) {
  .section-why-img {
    margin: 5px 0px;
  }
}

@media (min-width: 768px) {
  .section-over {
    margin-top: -40px;
    margin-bottom: -30px;
  }
}

.vertical-content {
  max-height: 420px;
}

@media (min-width: 768px) {
  .vertical-content {
    line-height: 2.5;
  }
}

.vertical-content-text {
  line-height: 1.5;
}

@media (min-width: 768px) {
  .vertical-content-text {
    -webkit-writing-mode: vertical-rl;
        -ms-writing-mode: tb-rl;
            writing-mode: vertical-rl;
    line-height: 2;
    font-family:標楷體;
  }
}

.vertical-content-text.verticla-title {
  letter-spacing: 8px;
}
.my-md-9 {
    margin-bottom: 110px !important;
  }


.bg-main-color {
  background-color: #6d7993 !important;
}

a.bg-main-color:hover, a.bg-main-color:focus,
button.bg-main-color:hover,
button.bg-main-color:focus {
  background-color: #576176 !important;
}

.bg-main-lighter {
  background-color: #E0E0E0 !important;
}

a.bg-main-lighter:hover, a.bg-main-lighter:focus,
button.bg-main-lighter:hover,
button.bg-main-lighter:focus {
  background-color: #b0b1c4 !important;
}
.font-weight-bold {
  font-weight: 700 !important;
}
</style>

