<template>
  <div class="payment_success">
     <h2><i onclick="window.history.go(-1)"></i><span>支付结果</span><router-link to="./"></router-link></h2>
     <div class="payment_success_desc">
        <img src="~@/assets/on_order_icon.png" alt="">
        <p> 订单正在火速处理中<span ><em>...</em></span></p>
     </div>
     
  </div>
</template>

<script>
import api from "../api"
import { mapState, mapMutations } from "vuex"
export default {
  name: "InPayment",
  data() {
    return {
      count:3
    };
  },
  created() {
      
      this.getpayStatus(this.id)
  },
  computed:{
    ...mapState(["orderStore"]),
    id(){
      return localStorage.getItem("payId")
    }
  },
  mounted(){
    
  },
  methods: {
   
    ...mapMutations(["changeerrorMessage"]),
    async getpayStatus(payId) {
      
      let wipdata = await api.getpayStatus(payId);
        if(wipdata.succ){
          if(wipdata.value.payStatus){
            //console.log(11)
            this.$router.push("./payment_success")
          }else{
            //console.log(33)
              this.changeerrorMessage(wipdata.value.errorMessage)
              this.count--;
              if(this.count>0){
                  setTimeout(()=>{
                    this.getpayStatus(this.id)
                  },1000)
              }else {
               // console.log("3次请求依然失败")
                this.$router.push("./payment_fail")

              }
            }
        }else{
          //console.lg("请求状态500")
          this.$router.push("./payment_fail")
          this.changeerrorMessage("订单不存在")
        }
        
     
          console.log(this.count)
           
        
      
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
@import "~@/common/css/payment-success";
.payment_success{
  .payment_success_desc{
    background: white;
    margin-top:50px;
    img{
      width:110px;
    }
    >p:nth-of-type(1){
      color:#B2B2B2;
      font-size:14px;
      height:14px;
      span{
        display: inline-block;
        height:14px;
        width:10px;
        line-height: 14px;
        overflow: hidden;
       // position: relative;
      /* Safari 与 Chrome */
       position: relative;
       margin-left: 2px;
       
        em{
          position: absolute;
          left:-10px;
          top:0;
          z-index: 2;
          animation: myfirst 2s 30;
          -webkit-animation: myfirst 2s 30; //运动，名称，时间，次数
          
        }
      }
    }
    
}


}
//关键帧动画
@keyframes myfirst
{
    from {left: -10px;}
    to {left: 0px;}
}

</style>
