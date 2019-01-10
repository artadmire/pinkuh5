<template>
  <div class="login">
  	<Download></Download>
  	<div class="login_content">
  		<img src="~static@/img/login_bg_pic@3x.png" alt="">
    <div class="tel">
      <p class="login_phoneNumber">
        <input ref='moblie' type="tel" placeholder="手机号" maxlength="11"  />
        <span id='send_verification' ref='send_verification_code' @click="send_verification_code">发送验证码</span>
      </p>
      <p class="login_verification">
        <input type="tel" placeholder="验证码" ref='login_verification' />
      </p>
    
      <div id="login_btn" @click="login">
        登录
      </div>
      <h3 class="login_desc">
        <span></span>
        若您输入的手机号未注册，将会进入注册流程。注册即视为同意 <a v-bind:href='agreeUrl'>《爆好货用户协议》。</a>
      </h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Toast } from "mint-ui";
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      msg: "suolun",
      initcount: 60,
      send_state: true,
      timer: null,
      agreeUrl: ""
    };
  },
  computed: {
    ...mapState(['commonStore']),
  },
  created() {
    this.agreeUrl = global.userAgreementUrl;
    // console.log(this.agreeUrl)
  },
  methods: {
    ...mapMutations(['newFlowPhonenum']),
    send_verification_code() {
      let phoneNumber = this.$refs.moblie.value;
      if (this.checkmobile() && this.send_state) {
        let params = new FormData();
        params.append("phone", phoneNumber);
        params.append("type", 0);

        this.axiosFun({
          config: {
            method: "post",
            url: this.$api + "/h5/users/send_confirm_code",
            data: params
          },
          onSuccess: res => {
            let instance = Toast("验证码发送成功");
            setTimeout(() => {
              instance.close();
            }, 2000);
            this.countDown();
          }
        });
      }
    },
    login() {
      let verificationCode = this.$refs.login_verification.value,
        phoneNumber = this.$refs.moblie.value;
      if (verificationCode == "") {
        let instance = Toast("请输入验证码");
        setTimeout(() => {
          instance.close();
        }, 2000);
        return;
      }

      if (this.checkmobile()) {
        console.log(this.commonStore.redirectUrl)
        let params = new FormData();
        params.append("phone", phoneNumber);
        params.append("confirmCode", verificationCode);

        this.axiosFun({
          config: {
            method: "post",
            url: this.$api + "/h5/users/login_by_code",
            data: params
          },
          onSuccess: res => {
            if(!window.sessionStorage.flowPhonenum){
              this.newFlowPhonenum(res.data.value.phone)
             window.sessionStorage.flowPhonenum = res.data.value.phone;
            }
            
            this.$router.push({
              path: this.commonStore.redirectUrl
            });
          }
        });
      }
    },
    checkmobile() {
      //检测手机号码
      let moblieValue = this.$refs.moblie.value;
      if (moblieValue == "") {
        let instance = Toast("手机号码不能为空");
        setTimeout(() => {
          instance.close();
        }, 2000);
        return false;
      }
      //检测手机号码是否正确
      let myreg = /^[1][0-9]{10}$/;
      if (!myreg.test(moblieValue)) {
        let instance = Toast("手机号码有误");
        setTimeout(() => {
          instance.close();
        }, 2000);
        return false;
      }
      return true;
    },
    countDown() {
      this.send_state = false;

      this.timer = setInterval(() => {
        this.initcount--;
        this.$refs.send_verification_code.innerHTML = this.initcount + "秒";
        this.$refs.send_verification_code.style.border = '0'
        this.$refs.send_verification_code.style.textAlign = 'right'
        if (this.initcount <= 0) {
          this.initcount = 60;
          this.$refs.send_verification_code.innerHTML = "发送验证码";
          this.$refs.send_verification_code.style.border = '1px solid #737373'
        this.$refs.send_verification_code.style.textAlign = 'center'
          this.send_state = true;
          clearInterval(this.timer);
        }
      }, 1000);
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
@import "~@/common/css/login.scss";
</style>
