<template>
  <div>
    <form class="bottom" v-on:submit.prevent >
      <input type="tel" placeholder="请输入您的手机号" v-model="telephone" :class="{isActive:taskStore.tabs}"   @input='Inputtel()' maxlength="13"   :disabled="taskStore.tabs">
      <div>
        <input type='submit' v-if='taskStore.isCheckout' @click='Vetify' :class="{active:flag}" :value="text" :disabled="taskStore.disabled">
        <input type='submit' v-else @click='Vetify' :class="{active:flag}" :value="Countdown" :disabled="taskStore.disabled"> 
      </div>
    </form>
    <InputCode  :telephone="telephone" :invitationCode="invitationCode" :source="source" :code="code"></InputCode>
  </div>   
</template>
<script>
import { Toast, MessageBox } from "mint-ui";
import { checkMobile, Mobile } from "@/util";
import InputCode from "./InputCode"
import api from "../api.js";
import { mapState,mapMutations} from 'vuex';
export default {
  name: "Telvetify",
  components: { InputCode },
  data() {
    return {
      //提交按钮是否是禁用状 
      telephone: "",
      //控制点击领取按钮的状态
      flag: false,
      //弹框底部文字内容
      currentindex: 0,
      vetifycode: "",
      true:true,
      Countdown: "已发送(60s)",
     
    };
  },
  props: {
    text: {
      type: String,
      default: ""
    },
    invitationCode: {
      type: String,
      default: ""
    },
    code: {
      type: String,
      default: ""
    },
    source: {
      type: Number,
      default:0
    }
  },
  created() {
     console.log(this.code,this.invitationCode)
  },
  computed: {
    ...mapState(['taskStore'])
  },
  mountded() {},

  methods: {
    
    ...mapMutations(['changevetycodetabs',"isDisabled","isCheckout","isShare","changePhoneNum"]),
    //输入手机号，激活按钮
    Inputtel() {
      this.telephone = this.telephone.replace(/[^\d]/g,'')
      //手机号自动加空格 123 4567 8900
      this.telephone = Mobile(this.telephone);

    let telephone = this.telephone.replace(/\s/g,"");
      if(checkMobile(telephone)){
        if(!this.taskStore.isCheckout){
          if(this.Countdown == "重新发送"){
            this.flag = true;
            this.isDisabled(false)
          }else{
            this.flag = false;
            this.isDisabled(true)
          }
        }else{
          this.flag = true;
          this.isDisabled(false)
        }
        
      }else{
        this.flag = false;
        this.isDisabled(true)
      }
    },

    //点击立即领取 验证手机号是否正确，同时验证是否已经注册
    Vetify() {
      var telephone = this.telephone.replace(/\s/g,"");
      if (checkMobile(telephone)) {
        // 请求数据验证手机号是不是正确，是否存在
        //console.log(telephone)
        this.flag = false
        this.isDisabled(false)
        if(this.source == 2) {
          let obj = {
          telephone,
          invitationCode:this.invitationCode,
        }
          this.postTelphone(obj);
        }else if(this.source == 1){
          let obj = {
             telephone
          }
          this.postTelphone(obj);
        }else if(this.source == 3) {
          console.log(this.code,this.invitationCode,telephone)
          this.applyCoupon(telephone,this.invitationCode,this.code)
        }
        
        //console.log(4)
      } else {
        
        Toast({
          message: "请输入正确的手机号",
          position: "bottom"
        });
      }
    },
    //用户不存在
    
    //发送手机号
    async postTelphone(obj) {
     
      //console.log(tel)
      let wipdata = await api.postTelphone(obj);
      console.log(wipdata);
      if(wipdata.succ == false && wipdata.errorCode.code == "1113") {
          //手机号已经存在，直接跳转
          //console.log(1111)
          console.log(this.source)
          console.log(2233)
          if (this.source == 1) {
            //console.log("com")
              this.$router.push("/commonfriendsdownload");
          } else if (this.source == 2) {
              this.$router.push("/bountydownload");
          }
          
        }else if(wipdata.succ == false && wipdata.errorCode.code == "1104"){
          Toast({
          message: "手机号不正确"
        });
        }else if(wipdata.succ) {//手机号不存在
        this.changevetycodetabs(true)
        this.isDisabled(true)
        //提交按钮是否出现
        this.isCheckout(false)
        //console.log(this.$refs.one)
        //this.autoFocus()
        Toast({
          message: "验证码已发送"
        });
        
        //清空验证码输入框
        //this.one = this.two = this.three = this.four = "";
        //立即领取按钮消失，发送按钮出现
       // this.ok = false;
        let num = 60;
        //倒计时
        //this.disabled = true;
        var timer = setInterval(() => {
          num--;
          //console.log(num)
          if (num <= 0) {
            num = 0;
            clearInterval(timer);
            this.Countdown = "重新发送";
            var telephone = this.telephone.replace(/\s/g,"");
           if (checkMobile(telephone)) {
             this.flag = true;
             this.isDisabled(false)
            }
            //提交按钮不禁用
            //this.isDisabled(false);
          } else {
            this.Countdown = "已发送(" + num + "s)";
            //提交按钮禁用
            this.isDisabled(true);
          }
          //弹框消失时，清楚定时器
          // if (this.taskStore.tabs == false) {
          //   clearInterval(timer);
          //   this.Countdown = "已发送(60s)";
          // }
        }, 1000);
      }
    },
    
    //领取优惠券
   async applyCoupon(phone, invitationCode, code) {
      let params = new FormData();
      params.append("phoneNum", phone);
      params.append("invitationCode", invitationCode);
      params.append("code", code);
      // params.append("confirmCode", confirmCode);
      let wipdata = await api.applyCoupon(params);
      console.log(wipdata)
     if(wipdata.succ){
       this.isShare(false)//直接到下载页
     }else if(wipdata.succ == false && wipdata.errorCode.code == "2100") {

       this.changevetycodetabs(true)
        this.isDisabled(true)
        //提交按钮是否出现
        this.isCheckout(false)
        //console.log(this.$refs.one)
        //this.autoFocus()
        Toast({
          message: "验证码已发送"
        });
        //清空验证码输入框
        //this.one = this.two = this.three = this.four = "";
        //立即领取按钮消失，发送按钮出现
       // this.ok = false;
        let num = 60;
        //倒计时
        //this.disabled = true;
        var timer = setInterval(() => {
          num--;
          //console.log(num)
          if (num <= 0) {
            num = 0;
            clearInterval(timer);
            this.Countdown = "重新发送";
            //提交按钮不禁用
            if (checkMobile(telephone)) {
             this.flag = true;
             this.isDisabled(false)
            }
            //this.isDisabled(false);
          } else {
            this.Countdown = "已发送(" + num + "s)";
            //提交按钮禁用
            this.isDisabled(true);
          }
          //弹框消失时，清楚定时器
          // if (this.taskStore.tabs == false) {
          //   clearInterval(timer);
          //   this.Countdown = "已发送(60s)";
          // }
        }, 1000);
     }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";

.bottom {
  display: block;
  position: fixed;
  bottom: 0;
  z-index: 200;
  width: 100%;
  height: 200px;
  background-image: url("../../../assets/invitation_bg_vip_bottom_pic_h5.png");
  background-repeat: no-repeat;
  background-size: cover;

  input {
    margin: 0 auto;
    margin-top: 60px;
    display: block;
    height: 36px;
    width: 70%;
    border: 1px solid $gray; /*no*/
    border-radius: 4px;
    box-sizing: border-box;
    background: #2c2c2c;
    text-align: center;
    margin-bottom: 20px;
    color: #dedede;
    font-size: 14px;
    &::-webkit-input-placeholder {
      color: $gray;
      font-size: 14px;
    }
  }
  div {
    input {
      display: block;
      margin: 0 auto;
      height: 36px;
      width: 70%;
      background: $gray;
      line-height: 36px;
      text-align: center;
      border-radius: 4px;
      border:0;
      // border:1px solid #979797;/*no*/
      box-sizing: border-box;
      color: $lightGray;
      font-size: 16px;
    }
    input.active {
      background: -webkit-linear-gradient(
        top,
        #ffd9b3,
        #ffc456
      ); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(
        top,
        #ffd9b3,
        #ffc456
      ); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(
        top,
        #ffd9b3,
        #ffc456
      ); /* Firefox 3.6 - 15 */
      background: linear-gradient(to bottom, #ffd9b3, #ffc456); /* 标准的语法 */
      color: #98470c;
    }
  }
}
.isActive {
  background: rgba(104, 103, 103, 0.1) !important;
}
</style>