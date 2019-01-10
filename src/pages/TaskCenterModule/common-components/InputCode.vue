<template>
        <div class='tabs' v-show='taskStore.tabs'>
      <div class="tab"> 
        <div>
          <span>输入验证码</span>
          <em @click='Closetab'></em>
        </div>
        <form>
          <div><input type="tel" @input="InputCode('two','one','one')" @keydown="goBack($event,'one','one')" ref="one" v-model="one" maxlength="1" autofocus v-focus="Autofocus" @click="Focus"></div>
          <div><input type="tel" @input="InputCode('three', 'two','one')" @keydown="goBack($event,'two','one')" ref="two" v-model="two" maxlength="1"></div>
          <div><input type="tel" @input="InputCode('four','three','two')"  @keydown="goBack($event,'three','two')" ref="three" v-model="three" maxlength="1"></div>
          <div><input type="tel" @input="InputCode('five','four','three')" @keydown="goBack($event,'four','three')" ref="four" v-model="four" maxlength="1"></div>
        </form>
        <p :style="{color:errCode ? '#737373' : 'red' }">{{ inputcode }}</p>
      </div>   
    </div>
</template>
<script>
import { Toast, MessageBox } from "mint-ui";
//import { checkMobile, Mobile } from "@/util";
import api from "../api.js";
import { mapState,mapMutations} from 'vuex';
export default {
  name: "Telvetify",
  data() {
    return {
      //disabled: true,
      //控制弹框的出现消失
      //弹框底部文字内容
      inputcode: "输入4位手机短信验证码",
      //控制弹框底部文字颜色
      errCode: true,
      currentindex: 0,
      one: "",
      two: "",
      three: "",
      four: "",
      vetifycode: "",
      //自定义指令的绑定值
      Autofocus: true
    };
  },
  props: {
    telephone:{
      type:String,
      default:""
    },
    invitationCode: {
      type: String,
      default: ""
    },
    source: {
      type: Number,
      default:0
    },
    code: {
      type: String,
      default: ""
    },
  },
  computed: {
    //获取验证码弹框控制值
    ...mapState(['taskStore'])
  },
  //自定义指令
  directives: {
    focus: {
      // 指令的定义
      update: function(el, binding) {
        //console.log(binding.value)
        if (binding.value == true) {
          el.focus();
        } else {
          el.blur();
        }
      }
    }
  },

  created() {},
  mountded() {},

  methods: {
    ...mapMutations(['changevetycodetabs',"isDisabled", "isShare"]),
    Focus() {
      this.Autofocus = true;
    },
    //开始输入验证码
    InputCode(str, num, preitem) {
      //限制只能输入数字
      this[num] = this[num].replace(/[^\d]/g, "");
      if (this[num] != "") {
        this.Autofocus = false;
        if (str == "five") {
          this.$refs.four.blur();
        } else {
          this.$refs[str].focus();
        }
      } else {
        if (str == "two") {
          this.Autofocus = true;
        }
      }

      //当4个输入框同时满足不为空的条件时，请求验证 验证码的正确性
      if (
        this.one != "" &&
        this.two != "" &&
        this.three != "" &&
        this.four != ""
      ) {
        //当4个输入框都不为空时，让所有的输入框都失去焦点
        if (str == "five") {
          this.$refs.four.blur();
        } else {
          this.$refs[str].blur();
        }
        //在这里开始请求，验证 验证码是否正确
        this.vetifycode = this.one + this.two + this.three + this.four;
        //console.log(this.vetifycode);
        //手机号码去掉空格
        var telephone = this.telephone.replace(/\s/g, "");
        if(this.source == 1 || this.source == 2){
          this.confirmCode(
          telephone,
          this.vetifycode,
          this.invitationCode,
          this.source
          );
        }else if (this.source == 3){
          //领取优惠券
          this.applyCoupon(
          telephone,
          this.vetifycode,
          this.invitationCode,
          this.code
          );
        }
      }

      // console.log(event.keyCode)
    },
    //点击删除键的时候，输入框删除内容，焦点后退
    goBack(event, correntitem, preitem) {
      //console.log(event.keyCode)
      if (event.keyCode == 8 && this[correntitem] == "") {
        //console.log(2222,this[ref])
        this[preitem] = "";
        this.$refs[preitem].focus();
      }
    },

    //点击关闭按钮，弹框消失
    Closetab() {
      //弹框消失
      this.changevetycodetabs(false)
      this.Autofocus = true;
      
     //this.isDisabled(false)
      this.errCode = true;
      this.inputcode = "请输入4位手机短信验证码";
      this.one = this.two = this.three = this.four = "";
    },
    //验证验证码
    async confirmCode(phone, confirmCode, invitationCode, source) {
      let params = new FormData();
      params.append("phone", phone);
      params.append("confirmCode", confirmCode);
      params.append("invitationCode", invitationCode);
      params.append("source", source);
      let wipdata = await api.confirmCode(params);
      //console.log(wipdata)
      if (wipdata.succ == false) {
        this.errCode = false;
        this.inputcode = "验证码错误，请重新输入";
        //清空输入框内容
        this.one = this.two = this.three = this.four = "";
      } else if (wipdata.succ == true) {
        this.errCode = true;
        this.inputcode = "验证成功，即将跳转"
        Toast({
          message: "验证成功，即将跳转"
        });
        if (this.source == 1) {
          setTimeout(() => {
            this.$router.push("/commonfriendsdownload");
            this.changevetycodetabs(false)
            //this.one = this.two = this.three = this.four = "";
          }, 2000);
        } else if (this.source == 2) {
          setTimeout(() => {
            this.$router.push("/bountydownload");
            this.changevetycodetabs(false)
            //this.one = this.two = this.three = this.four = "";
          }, 2000);
        }
      }
    },
    //领取优惠券
    async applyCoupon(phone, confirmCode, invitationCode, code) {
      let params = new FormData();
      params.append("phoneNum", phone);
      params.append("confirmCode", confirmCode);
      params.append("invitationCode", invitationCode);
      params.append("code", code);
      let wipdata = await api.applyCoupon(params);
      console.log(wipdata)
      if (wipdata.succ == false) {
        this.errCode = false;
        this.inputcode = "验证码错误，请重新输入";
        //清空输入框内容
        this.one = this.two = this.three = this.four = "";
      }else if (wipdata.succ == true) {
        this.errCode = true;
        this.isShare(false)
        this.inputcode = "验证成功，即将跳转"
        // Toast({
        //   message: "验证成功，即将跳转"
        // });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
  .tabs {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(39, 28, 28, 0.5);

  .tab {
    width: 300px;
    height: 164px;
    background: #ffffff;
    border-radius: 6px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -150px;
    margin-top: -82px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    z-index: 200;
    > div:nth-of-type(1) {
      width: 300px;
      height: 44px;
      text-align: center;
      position: relative;
      span {
        color: #141414;
        font-size: 18px;
        line-height: 44px;
      }
      em {
        display: block;
        width: 16px;
        height: 16px;
        position: absolute;
        top: 50%;
        right: 20px;
        margin-top: -8px;
        background-image: url("../../../assets/detail_order_delete_icon@3x.png");
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
    > form {
      display: block;
      width: 260px;
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      div {
        width: 50px;
        height: 58px;
        border: 1px solid #c4c9d3; /*no*/
        border-radius: 4px;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        input {
          // display: block;
          width: 47px;
          height: 52px;
          text-align: center;
          font-size: 25px;
          line-height: 25px;
          border-radius: 4px;
        }
      }
    }
    p {
      width: 260px;
      height: 44px;
      color: #737373;
      font-size: 12px;
      line-height: 44px;
      text-align: center;
    }
  }
}
</style>