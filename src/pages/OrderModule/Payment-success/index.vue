<template>
  <div class="payment_success">
     <h2><i onclick="window.history.go(-1)"></i><span>支付完成</span><router-link to="./"></router-link></h2>
     <div class="payment_success_desc">
        <img src="~static@/img/payment_succeed_pic_110@3x.png" alt="">
        <p>支付完成!</p>
        <p>下载爆好货商城APP跟踪订单</p>
     </div>
     <div id="download_pinku">
       <a :href="assetsUrl">下载App,注册得8元现金红包</a>
       <i></i>
     </div>
  </div>
</template>

<script>
export default {
  name: "payment_success",
  data() {
    return {
      assetsUrl: ""
    };
  },
  created() {
    this.assetsUrl = global.appDownloadUrl;
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
@import "~@/common/css/payment-success";
</style>
