<template>
  <div class="">
    <canvas id="canvas" width="1200" height="364" class="index-topbg"></canvas>
    <div class="app-container">
      <swiper :options="swiperOption">
        <swiper-slide>I'm Slide 1</swiper-slide>
        <swiper-slide>I'm Slide 2</swiper-slide>
        <swiper-slide>I'm Slide 3</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
  import "swiper/dist/css/swiper.css";
  import { swiper, swiperSlide } from "vue-awesome-swiper";
  export default {
    components: {
      swiper,
      swiperSlide,
    },
    data() {
      return {
        canvas: "",
        c: "",
        canvasWidth: 0,
        canvasHeight: 0,
        target: [{}],
        circleNum: 3,

        //轮播图
        swiperOption: {
          // 所有的参数同 swiper 官方 api 参数
          direction: "vertical",
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          autoplay: {
            delay: 1500,
            stopOnLastSlide: false,
            disableOnInteraction: true,
          }, // 可选选项，自动滑动
        },
      };
    },
    mounted() {
      window.addEventListener("resize", this.resizeCanvas(), false);

      this.resizeCanvas();

      setInterval(() => {
        //更新画布
        this.c.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.c.fillStyle = "#ffe032";
        this.c.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        //重新绘制圆
        for (let i = 0; i < this.circleNum; i++) {
          this.target[i].x = this.target[i].x + this.target[i].speedX;
          this.target[i].y = this.target[i].y + this.target[i].speedY;

          //保证圆的速度不为零
          if (this.target[i].speedX == 0) {
            this.target[i].speedX = 0.2;
          }
          if (this.target[i].speedY == 0) {
            this.target[i].speedY = 0.2;
          }
          if (this.target[i].x >= this.canvasWidth + this.target[i].r || this.target[i].y >= this.canvasHeight + this.target[i].r || this.target[i].y <= -this.target[i].r) {
            //运动到边界后重新生成一个圆
            this.drawNewCircle(i);
          } else {
            this.UpdateCircle(i);
          }
        }
      }, 0.7);
    },
    methods: {
      //初始化画布
      initCanvas() {
        this.canvas = document.getElementById("canvas");
        this.c = this.canvas.getContext("2d");
        this.canvasWidth = parseInt(document.getElementById("canvas").getAttribute("width"));
        this.canvasHeight = parseInt(document.getElementById("canvas").getAttribute("height"));
        this.c.fillStyle = "#ffe032";
        this.c.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        for (let i = 0; i < this.circleNum; i++) {
          this.drawNewCircle(i);
        }
      },

      //绘制随机大小的圆
      drawNewCircle(index) {
        index = index != null || index != undefined ? index : 0;
        let obj = {};
        obj.x = this.randomNum(-100, -50);
        obj.y = this.randomNum(0, this.canvasHeight);
        obj.speedX = this.randomNum(0.3, 0.5);
        obj.speedY = this.randomNum(-0.2, 0.2);
        obj.r = this.randomNum(50, 180);
        this.target[index] = obj;
        this.UpdateCircle(index);
      },
      //更新圆的位置
      UpdateCircle(index) {
        this.c.beginPath();
        this.c.arc(this.target[index].x, this.target[index].y, this.target[index].r, 0, 360, false);
        this.c.lineWidth = 2;
        if (this.target[index].x > this.canvasWidth - this.target[index].r && this.target[index].y >= 0 && this.target[index].y <= this.canvasHeight) {
          //x-右侧淡出
          let rate = (this.canvasWidth - this.target[index].x + this.target[index].r) / this.target[index].r;
          this.c.strokeStyle = "rgba(255,255,255," + (2 * rate - 1) + ")";
        } else if (this.target[index].x < this.target[index].r * 2) {
          //x-左侧淡入
          let rate = this.target[index].x / (this.target[index].r * 2);
          this.c.strokeStyle = "rgba(255,255,255," + (2 * rate - 1) + ")";
        } else if (this.target[index].y > this.canvasHeight) {
          //y-下方淡出
          let rate = (this.canvasHeight - this.target[index].y + this.target[index].r) / this.target[index].r;
          this.c.strokeStyle = "rgba(255,255,255," + (2 * rate - 1) + ")";
        } else if (this.target[index].y < 0) {
          //y-上方淡出
          let rate = (this.canvasHeight + this.target[index].y) / this.canvasHeight;
          this.c.strokeStyle = "rgba(255,255,255," + (2 * rate - 1.5) + ")";
        } else {
          this.c.strokeStyle = "rgba(255,255,255,1)";
        }
        this.c.stroke();
      },

      //取随机数
      randomNum(min, max) {
        return Math.random() * (max - min) + min;
      },

      resizeCanvas() {
        const canvasWidth = window.innerWidth < 1200 ? 1200 : window.innerWidth;
        document.getElementById("canvas").setAttribute("width", canvasWidth);

        this.initCanvas();
      },
    },
  };
</script>

<style lang="scss">
  .index-topbg {
    position: absolute;
    top: 35px;
    left: 0;
    z-index: -1;
  }
  .app-container {
    .swiper {
      width: 100%;

      & >>> .swiper-container {
        width: 100%;

        .swiper-slide {
          width: 100%;
          height: 0;
          padding-bottom: 28.1%;
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;

          /* Center slide text vertically */
          display: -webkit-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          -webkit-justify-content: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          -webkit-align-items: center;
          align-items: center;
        }

        .swiper-pagination {
          .swiper-pagination-bullet-active {
            background-color: #f29b76;
          }
        }
      }
    }
  }
</style>
