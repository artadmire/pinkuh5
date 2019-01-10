<template>
  <div class="toast">
    <div>
      <header>确定要放弃付款吗？<img @click="close"  src="~@/assets/detail_order_delete_icon@3x.png" /></header>
      <p>商品库存有限，现在不购买可能会被抢光哦!</p>
      <div><p @click="goback">暂时放弃</p><p @click="goOnPay">继续支付</p></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Toast } from "mint-ui";

export default {
  name: "SubmitToast",
  data() {
    return {
     
    };
  },
  created() {
    
  },
  computed: {
    ...mapState(["commonStore"])
  },
  methods: {
    ...mapMutations(["newSubmitflag"]),
    close(){
      this.newSubmitflag(false)
    },
    goOnPay(){
      this.newSubmitflag(false)
    },
    goback(){
      this.newSubmitflag(false)
      window.history.go(-1)
    }
  },
  mounted() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.toast {
  width:100%;
  height:100%;
  position: fixed;
  top:0;
  left:0;
  background: rgba(0,0,0,0.5);
  z-index: 500;
  >div {
    width: 300px;
    height:160px;
    background: white;
    border-radius: 3px;
    position: absolute;
    left:50%;
    margin-left:-150px;
    top:50%;
    margin-top:-80px;
    z-index: 600;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px 20px 20px;
    box-sizing: border-box;
    header {
      width:100%;
      height:44px;
      line-height: 44px;
      text-align: center;
      font-size: 18px;
      position: relative;
      img {
        width:20px;
        height:20px;
        position: absolute;
        right:0;
        top:50%;
        margin-top:-10px;
      }
    }
    >p {
      height:40px;
      font-size: 14px;
      margin:10px 0 14px 0;
      line-height: 20px;
      width:200px;
      text-align: center;
    }
    div {
      width:100%;
      display: flex;
      justify-content: space-between;
      align-items: space-between;
      p{
        width:120px;
        height: 32px;
        color:#FFADAD;
        font-size: 14px;
        text-align: center;
        line-height: 32px;
        border:1px solid #FFADAD;/*no*/
        border-radius: 4px; 
        &:last-child {
          color:#FFFFFF;
          background: #FF3C3A;
        }
      }
      
  }
}
}
</style>
