<template>
  <div class="test">
    <div class="btn" @click="share">pk.share</div>
    <div class="btn" @click="getEnv">pk.getEnvironment</div>
    <div class="btn" @click="navigateTo">pk.navigateToHome</div>
    <div class="btn" @click="redirectTo">pk.redirectToItemDetail</div>
    <div class="btn" @click="navigateBack">pk.navigateBack</div>
    <div class="btn" @click="authorize">pk.authorize</div>
    <!-- <input type="text" placeholder="请输入您的手机号" v-model="telephone" @input='Inputtel()' autofocus  maxlength="13" > -->
    <div class="btn" @click="reportException">pk.reportException</div>
    <div class="btn" @click="commitCustomEvent">pk.commitCustomEvent</div>
    <div class="btn" @click="getAddressInfo">pk.getAddressInfo</div>
    <div class="btn" @click="enterPageEvent">pk.enterPageEvent</div>
    <div class="btn" @click="leavePageEvent">pk.leavePageEvent</div>
    <div class="btn" @click="commitPerformanceEvent">pk.commitPerformanceEvent</div>
    <div class="btn" @click="loginByNativeEvent">loginByNative</div>
    <div class="btn" @click="getWebContainerStatus">pk.getWebContainerStatus</div>
    <div class="btn" @click="reWriteAlert">reWriteAlert</div>
    <div class="btn" @click="getLogWrite(true)">getLogWriteTrue</div>
    <div class="btn" @click="getLogWrite(false)">getLogWriteFalse</div>
    <div class="btn" @click="goApp">浏览app器跳转</div>
  </div>
</template>

<script>
import pk from "@/util/pk.js";
import api from "./api.js";
import loginByNative from "@/util/loginByNative.js";
import wechatPublicShare from "@/util/wechatPublicShare";
import { Source, isapp } from "@/util";
export default {
  props: {},

  data() {
    return {
      telephone: "",
      content: "内容",
      selected: "1"
    };
  },
  created() {
    if (isapp() != "weixin" || isapp() != "QQ") {
      window.location.href = "pinkumall://default/item_detail?item_id=32";
    }
    // alert(Source())
    // console.log(navigator.userAgent,"userAgent")
    // console.log(navigator.appVersion,"appVersion")
    console.log(isapp());
    console.log(navigator.userAgent)
    // aaa
    //console.log(window.WVJBInterface ,"000")
    //console.log(window.WebViewJavascriptBridge||window.WKWebViewJavascriptBridge,"DDD")
  },
  computed: {},
  methods: {
    goApp() {
      window.location.href = "pinkumall://default/item_detail?item_id=32";
    },
    changeTab(id) {
      this.selectedId = id;
    },
    Inputtel() {
      var value = this.telephone.replace(/\s*/g, "");
      var result = [];
      for (var i = 0; i < value.length; i++) {
        if (i == 3 || i == 7) {
          result.push(" " + value.charAt(i));
        } else {
          result.push(value.charAt(i));
        }
      }
      value = result.join("");
      this.telephone = value;
    },
    share() {
      pk.share(
        {
          title: "title",
          content: "content",
          imgUrl:
            "https://qr.api.cli.im/qr?data=http%253A%252F%252F10.106.242.191%253A8083%252F%2523%252Fbountyhunter%252Ftest&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=905be89264c13468b789a0592c5efd2a",
          linkUrl: "https://www.pinkumall.com/h5#/",
          miniProgramPath: "/pages/home/detail?id=183&invitationCode=PJJJ39",
          displayTitle: "索伦",
          displayTitleColor: "#ff0000",
          targetType: 2,
          targetId: 383
        },
        function() {},
        function(error) {
          console.log(error);
        }
      );
    },
    getEnv() {
      pk.getEnvironment(response => {
        console.log(response);
      });
    },
    navigateTo() {
      console.log("去app");
      pk.navigateTo({
        url: "pinkumall://default/mall_home"
      });
    },
    redirectTo() {
      pk.redirectTo({
        url: "pinkumall://default/item_detail?item_id=1"
      });
    },
    navigateBack() {
      pk.navigateBack(() => {});
    },
    authorize() {
      pk.authorize(
        msg => {
          pk.getLogWrite({
            tag: "h5 authorize",
            errorlog: false,
            content: "h5 authorize method get code success"
          });
        },
        error => {
          pk.getLogWrite({
            tag: "h5 authorize",
            errorlog: true,
            content: "h5 authorize method get code failed"
          });
        }
      );
    },
    reportException() {},
    commitCustomEvent() {
      pk.commitCustomEvent(
        {
          eventName: "click",
          params: {}
        },
        response => {
          console.log(response);
        }
      );
    },
    getAddressInfo() {
      this.add_form();
    },
    async getAddress() {
      let wip = await api.getAddress();
    },
    async add_form() {
      let wip = await api.add_form();
      console.log(wip);
    },
    enterPageEvent() {
      pk.enterPageEvent({
        pageName: "test"
      });
    },
    leavePageEvent() {
      pk.leavePageEvent({
        pageName: "test"
      });
    },
    commitPerformanceEvent() {
      let nowTime = new Date().getTime();
      let duration = nowTime - global.firstLoadTime;
      console.log(duration);
      pk.commitPerformanceEvent({
        eventName: "commitPerformanceEvent",
        params: {
          url: location.href
        },
        duration: duration
      });
    },
    commitCustomEvent() {
      pk.commitCustomEvent({
        eventName: "enter_hunter_home_nonpurchased_page"
      });
    },
    loginByNativeEvent() {
      sessionStorage.clear();
      loginByNative();
    },
    getWebContainerStatus() {
      pk.getWebContainerStatus(response => {
        console.log(response);
      });
    },
    reWriteAlert() {
      window.alert = value => {
        let alertBox = document.createElement("div");
        let closeBtn = document.createElement("div");
      };
      alert("helo");
    },
    getLogWrite(status) {
      pk.getLogWrite(
        {
          tag: "hunter",
          errorLog: status,
          content: "error log"
        },
        response => {
          alert(response);
        },
        error => {}
      );
    }
  },
  mounted() {
    wechatPublicShare({
      url: location.href.split("#")[0],
      share: {
        title: "this is a test title",
        desc: "this is a test desc"
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
@import "~@/common/css/var.scss";
.test {
  padding-bottom: 20px;
  height: 100%;
  ul {
    li {
      height: 40px;
      text-align: center;
      line-height: 40px;
      border-bottom: 1px solid gray; /*no*/
    }
  }
}
.btn {
  width: 300px;
  margin: 10px auto;
  height: 35px;
  background: red;
  border-radius: 8px;
  line-height: 35px;
  text-align: center;
  color: white;
  font-size: 18px;
}
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
.swipe {
  padding-left: 20px;
  margin-bottom: 50px;
  height: 160px;
  width: 375px;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  ul {
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    width: 1200px;
    &:hover {
      -webkit-transform: translateX(-300px);
      transform: translateX(-300px);
    }
    li {
      width: 300px;
      margin-right: 15px;
      img {
        width: 300px;
      }
    }
  }
}
p {
  width: 200px;
  height: 200px;
  background: red;
  &:hover {
    transform: translateX(200px);
  }
}
</style>
