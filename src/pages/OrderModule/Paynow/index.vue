<template>
  <div class="paynow">
    <PaynowToast v-if="commonStore.payflag"></PaynowToast>
  	<h2><i @click="backURL"></i>选择支付方式</h2>
    <!-- <div class="paynow_top">
      <img src="~static@/img/payment_tips_icon@3x.png" alt="">
      <p>您的订单提交成功，为了不让到手的宝贝飞走，请在<em>30分钟</em>内完成订单支付哟</p>
    </div> -->
  
    <div class="payment_mode">
      <!-- <h3>支付方式</h3> -->
      <ul>
        <li v-for="(item,index) in payment_type" v-show='item.isShow' :key='index' v-bind:data-index="index" @click='payment_type_fun($event)'>
          <img v-if="index==0"  src="~static@/img/order_setting_payment_alipay@3x.png" alt="">
          <img v-else-if="index==1"  src="~static@/img/order_setting_payment_wechat_pay@3x.png" alt="">
          <img v-else-if="index==2"  src="~static@/img/yizhifu_icon@3x.png" alt="">
          <span>{{item.name}}</span>
          <em  :class="{active:item.isActive}" ></em>
        </li>
      </ul>
    </div>
      <div class="payment_info">
      <!-- <p>支付信息</p>
      <p>
        <span>待付金额</span>
        <span>¥{{create_order.payFeeCent|capitalize}}</span>
      </p> -->
      <p>{{ paydesc }} <span v-if="!isLose">{{expireTime|countDown}}</span></p>
      <em v-if="!isLose">请尽快支付哦，倒计时结束后订单将自动取消</em>
    </div>
    <div id="paynow_btn" @click="paynow">
       <em><i>待付金额：</i> ¥{{ commonStore.sumPayFeeCent |capitalize}}</em> <span :class="{unactive:isLose}">立即支付</span>  
    </div>

    <!-- 分期mask -->
    <div class="mask">
         <div class="stagesMask">
          <h3>请选择分期</h3>
          <ul>
            <li>
              <div>
                <p>500元 X 3期</p>
                <p>手续费9.9元 / 期</p>
              </div>
              <em class="active"></em>
            </li>
            <li>
              <div>
                <p>200元 X 6期</p>
                <p>手续费5.9元 / 期</p>
              </div>
              <em></em>
            </li>
            <li>
              <div>
                <p>100元 X 12期</p>
                <p>手续费3.9元 / 期，费率8.3%</p>
              </div>
              <em></em>
            </li>
          </ul>
          <div id="stages_sure" @click="stages_sure">确定</div>
        </div>
    </div>
    <form id="alipayExtend"  name="punchout_form" method="post">
      <input type="hidden"  v-for="(item,index) in alipay" v-model="item.value" v-bind:name="item.name" :key='index'>
    </form>
    <form id="wechatExtend" method="post">
    </form>
    <form id="bestExtend" method="post"></form>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Toast } from "mint-ui";
import axios from "axios";
import { getUrlParam } from "@/common/js/common";
import PaynowToast from "@/pages/OrderModule/components/PaynowToast"
export default {
  name: "Paynow",
  data() {
    return {
      create_order: {},
      expireTime: "",
      timer: null,
      payment_type: [],
      payInfo: {},
      alipay: [],
      flag:false,
      isLose:false,
      paydesc:"支付倒计时"
    };
  },
  components: {
    PaynowToast
  },
  created() {
    //判断创建订单信息
    this.create_order = this.commonStore.create_order_info.payFeeCent
      ? this.commonStore.create_order_info
      : JSON.parse(localStorage.create_order_info);
    //计算目前倒计时时间
    //兼容safari浏览器
    this.expireTime =
      new Date(this.create_order.payExpireTime.replace(/-/g, "/")) - new Date();
    this.payment_type = [
      {
        name: "支付宝",
        isActive: true,
        isShow: true
      },
      {
        name: "微信",
        isActive: false,
        isShow: true
      },
      {
        name: "翼支付",
        isActive: false,
        isShow: false
      }
    ];
    console.log(global.preOrderPreUrl);
    console.log(getUrlParam("from"));
    //dxhd 电信活动  电信活动进来的时候只留'翼支付'
    if (getUrlParam("pk_from") == "dxhd") {
      this.payment_type = [
        {
          name: "支付宝",
          isActive: false,
          isShow: false
        },
        {
          name: "微信",
          isActive: false,
          isShow: false
        },
        {
          name: "翼支付",
          isActive: true,
          isShow: false
        }
      ];
    }
  },
  computed: {
    ...mapState(['commonStore']),
  },
  methods: {
    ...mapMutations(["newPayflag"]),
    backURL(){
        this.newPayflag(true)
        
        //console.log(global)
        // this.$router.push({
        //     // path: global.preOrderPreUrl
        //     path:'/detail?id=8'
        //   });
    },
    paynow() {
      //this.$router.push("./in_payment")
      console.log(33)
      let obj = {
        payType: 1,
        payFeeCent: this.create_order.payFeeCent,
        orderIds: this.create_order.orderIds
      };
      this.payment_type.forEach((item, index) => {
        if (item.isActive) {
          // console.log(item.name,index+1);
          obj.payType = index + 1;
        }
      });
      // console.log(obj)
      this.$set(this, "payInfo", obj);
      let payinfo = JSON.stringify(this.payInfo)
      localStorage.setItem("payInfo",payinfo)
      //this.changepayInfo(this.payInfo)
      this.$nextTick(() => {
        console.log(332)
        this.alipay_ajax(this.payInfo);
      });

      // this.$router.push({
      //   path:'/payment_success'
      // })
    },
    stages_sure() {
      console.log("stages_sure");
    },
    payment_type_fun(event) {
      this.payment_type.forEach((item, index) => {
        if (event.currentTarget.dataset.index == index) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
      });
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
          localStorage.setItem("payId",res.data.value.payId)
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
  },
  filters: {
    capitalize(value) {
      if (!value) return "0";
      return parseFloat(value / 100).toFixed(2);
    },
    countDown(value) {
      let second = parseInt(value / 1000) % 60,
        min = ((parseInt(value / 1000) - second) / 60) % 60,
        hour = (((parseInt(value / 1000) - second) / 60 - min) / 60) % 24;
      return (
        (hour < 10 ? "0" + hour : hour) +
        ":" +
        (min < 10 ? "0" + min : min) +
        ":" +
        (second < 10 ? "0" + second : second)
      );
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      if (this.expireTime > 1000) {
        this.$set(this, "expireTime", this.expireTime - 1000);
      } else {
        this.$set(this, "expireTime", 0);
        clearInterval(this.timer);
        this.isLose = true
        this.paydesc = "支付超时，请返回"
      }
    }, 1000);
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
@import "~@/common/css/paynow";
</style>
