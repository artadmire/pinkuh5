<template>
  <div class="payment_success">
     <h2><i onclick="window.history.go(-1)"></i><span>支付失败</span><router-link to="./"></router-link></h2>
     <div class="payment_success_desc">
        <img src="~@/assets/defeated_icon_defult@3x.png" alt="">
        <p>订单支付失败!</p>
        <p>{{ orderStore.errorMessage }}</p>
     </div>
     <div id="payment" @click="Repay">
       <p >重新支付</p>
     </div>
     <form id="alipayExtend"  name="punchout_form" method="post">
        <input type="hidden"  v-for="(item,index) in alipay" v-model="item.value" v-bind:name="item.name" :key='index'>
      </form>
      <form id="wechatExtend" method="post"></form>
      <form id="bestExtend" method="post"></form>
  </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
  name: "payment_fail",
  data() {
    return {
      assetsUrl: "",
      alipay:[]
    };
  },
  created() {},
  computed:{
    ...mapState(["orderStore"]),
    payInfo(){
      return JSON.parse(localStorage.getItem("payInfo"))
    }
  },
  mounted(){
    //alert(this.payInfo)
  },
  methods: {
    //重新支付
    Repay(){
      this.alipay_ajax(this.payInfo)
    },
     alipay_ajax(obj) {
      
      this.axiosFun({
        config: {
          method: "post",
          url: this.$api + "/h5/orders/pay",
          data: obj
        },
        onSuccess: res => {
          //console.log(res,333)
          //this.changepayId(res.data.value.payId)
          if (res.data.value.alipayExtend) {
            //支付宝
            let arr = [],
              formFields = res.data.value.alipayExtend.formFields;
            let alipayForm = document.getElementById("alipayExtend");
            alipayForm.setAttribute(
              "action",
              res.data.value.alipayExtend.actionUrl
            );

            for (var key in formFields) {
              arr.push({
                name: key,
                value: formFields[key]
              });
            }
            this.$set(this, "alipay", arr);
            this.$nextTick(() => {
              alipayForm.submit();
            });
          } else if (res.data.value.wechatExtend) {
            //微信
            let wechatForm = document.getElementById("wechatExtend");
            wechatForm.setAttribute(
              "action",
              res.data.value.wechatExtend.actionUrl
            );
            this.$nextTick(() => {
              wechatForm.submit();
            });
          } else if (res.data.value.bestPayExtend) {
            let bestForm = document.getElementById("bestExtend");
            bestForm.setAttribute(
              "action",
              res.data.value.bestPayExtend.actionUrl
            );
            this.$nextTick(() => {
              bestForm.submit();
            });
          }
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
@import "~@/common/css/payment-success";
.payment_success {
  .payment_success_desc {
    background: white;
    margin-top: 50px;
    img {
      width: 110px;
    }
    > p:nth-of-type(1) {
      color: #737373;
      font-size: 16px;
    }
    > p:nth-of-type(2) {
      color: #b2b2b2;
      font-size: 14px;
    }
  }
  #payment {
    p {
      display: block;
      width: 220px;
      height: 30px;
      background: #ff3c3a;
      line-height: 30px;
      border-radius: 4px;
      color: #ffffff;
      font-size: 14px;
      text-align: center;
      margin: 50px auto 0;
    }
  }
}
</style>
