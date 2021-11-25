<template>
  <swiper v-if="slideList.length" class="swiper" :options="swiperOption">
    <swiper-slide v-for="v in slideList" :key="v">
      {{ v }}
    </swiper-slide>
    <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
    <template v-if="slideList.length !== 1">
      <span class="arrow arrow-l" slot="button-prev"></span>
      <span class="arrow arrow-r" slot="button-next"></span>
    </template>
  </swiper>
</template>

<script>
  import "swiper/dist/css/swiper.css"; //在全局没引入，这里记得要！
  import { Swiper, SwiperSlide } from "vue-awesome-swiper";
  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    data() {
      return {
        swiperOption: {
          loop: true,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          autoplay: {
            delay: 5000,
            // 用户点击后不自动轮播 默认是true
            disableOnInteraction: false,
          },

          navigation: {
            nextEl: ".arrow-r",
            prevEl: ".arrow-l",
          },
        },
        slideList: [1, 2, 3, 4],
      };
    },
  };
</script>

<style></style>
