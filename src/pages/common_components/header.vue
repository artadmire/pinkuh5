<template>
  <div class="header">
    <img v-if="randomNum==1" src="~static@/img/homepage_top1@3x.png" alt="">
    <img v-else-if='randomNum==2' src="~static@/img/homepage_top2@3x.png" alt="">
    <img v-else-if='randomNum==3' src="~static@/img/homepage_top3@3x.png" alt="">
    <img v-else-if='randomNum==4' src="~static@/img/homepage_top4@3x.png" alt="">
    <img v-else-if='randomNum==5' src="~static@/img/homepage_top5@3x.png" alt="">
    <img v-else-if='randomNum==6' src="~static@/img/homepage_top6@3x.png" alt="">
    <img v-else-if='randomNum==7' src="~static@/img/homepage_top7@3x.png" alt="">
    <img v-else-if='randomNum==8' src="~static@/img/homepage_top8@3x.png" alt="">
    <img v-else-if='randomNum==9' src="~static@/img/homepage_top9@3x.png" alt="">
    <img v-else-if='randomNum==10' src="~static@/img/homepage_top10@3x.png" alt="">
    <img v-else-if='randomNum==11' src="~static@/img/homepage_top11@3x.png" alt="">
    <img v-else-if='randomNum==12' src="~static@/img/homepage_top12@3x.png" alt="">
  </div>
</template>
  
<script>
export default {
  name: "Header",
  data() {
    return {
      randomNum: 1
    };
  },
  created() {
    this.randomNum = Math.round(Math.random() * 11 + 1);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.header {
  transform: translate3d(0, 0, 0);
  background: $pink;
  width: 100%;
  height: 64px;
  display: flex;
  position: fixed;
  top: 44px;
  left: 0;
  z-index: 9999;
  // justify-content:center;
  // align-items:center;
  img {
    // width: 34px;
    width: 100%;
    position: absolute;
    top: 0;
  }
}
</style>
