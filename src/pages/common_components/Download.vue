<template>
  <div class="download">
  	<div>
  		<img src="~@/assets/logo_white@3x.png" alt="">
  		<p>下载注册，得<span>8元</span>现金红包，可提现</p>
  	</div>
  	<a :href="assetsUrl">下载APP</a>
  </div>
</template>

<script>
export default {
  name: "Download",
  data() {
    return {
      msg: "suolun",
      assetsUrl:''
    };
  },
  created(){
    this.assetsUrl = global.appDownloadUrl;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.download {
  transform: translate3d(0, 0, 0);
  width: 100%;
  height: 44px;
  background: $fontColor;
  display: flex;
  color: white;
  padding: 5px 20px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  transform: translate3d(0, 0, 0);
  div {
    img {
      display: block;
      width: 48px;
    }
    p {
      font-family: PingFangSC-Thin;
      font-size: 12px;
      transform: scale(0.9);
      margin-left: -7px;
      span{
        color: #FF3C3A;
      }
    }
  }
  a {
    display: block;
    background: $pink;
    border-radius: 3px;
    width: 76px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    color: white;
    font-size: 12px;
  }
}
</style>
