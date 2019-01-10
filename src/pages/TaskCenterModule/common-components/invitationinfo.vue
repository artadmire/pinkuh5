<template>
  <div>
    <p><img :src="imgUrl" alt=""></p>
    <img v-if="cash" src="../../../assets/invitation_money_pic_h5.png" alt="">
    <span>您的好友&nbsp;{{ nick }}</span>
  </div>  
</template>
<script>
import { Toast, MessageBox } from "mint-ui";
import { checkMobile, Mobile } from "@/util";
import api from "../api.js";
export default {
  name: "Invitationinfo",
  data() {
    return {};
  },
  props: {
    imgUrl: {
        type:String,
        default:""
    },
    cash:{
        type:Boolean,
        default:false
    },
    nick: {
        type:String,
        default:""
    }
  },

  created() {},
  mountded() {},

  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
div {
    overflow: hidden;
    width: 100%;
    >img {
      display: block;
      margin:0 auto;
      width:64px;
      height:55px;
    }
  p {
    margin:0 auto;
    width: 70px;
    height: 70px;
    border-radius: 35px;
    border: 1px solid #fddca1; /*no*/
    box-sizing: border-box;
    margin-bottom: 15px;
    >img {
      width: 100%;
      height: 100%;
      border-radius: 35px;
    }
  }
  span {
    margin:0 auto;
    display: block;
    width: 218px;
    color: #fddca1;
    text-align: center;
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    margin-top:10px;
  }
}
</style>