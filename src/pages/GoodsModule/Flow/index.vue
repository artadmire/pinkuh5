<template>
  <div class="flow">
  	<h2><i onclick="window.history.go(-1)"></i>手机流量充值</h2>
  	<div class="phoneText">
  		<input type="tel" maxlength="11" v-model='phoneNum' placeholder="请输入手机号码" >
      <p>{{addr||''}}</p>
  	</div>
  	<ul class="listIsHavePhoneNum" v-if='isHavePhoneNum'>
  		<li  v-for='(item,index) in listDate' :key='index' :class="{active:index==num,isHavePhoneNum:isHavePhoneNum}" @click="tab(index)">
  			<p>{{item.name}}</p>
  			<p>{{item.priceCent|transMoney00}}元</p>
  			<i v-if='item.sendCoupon'></i>
  		</li>
  	</ul>	
  	<ul class="list" v-else>
  		<li  v-for='(item,index) in listDate' :key='index' :class="{active:index==num,isHavePhoneNum:isHavePhoneNum}" @click="tab(index)">
  			{{item}}
  		</li>
  	</ul>
  	<div class="detail">
  		<div  v-for='(item,index) in discountList' :key='index'>
  			<div class="detail_box">
  				<div class="detail_left">
	  				<p>{{item.priceCent|transMoney00}}元 <em>{{item.location}}</em></p>
	  				<p>{{item.rule}}</p>
	  			</div>
	  			<div class="detail_right">
	  				<span @click="buy($event)" :data-skuId='item.skuId' :data-payFeeCent='item.payFeeCent' :data-merchantid='item.merchantId' :data-couponid='item.couponId'>购买</span>
	  			</div>
  			</div>
  			<p>
  				<span v-for='(itit,v) in item.tags' :key='v'>{{itit}}</span>
  			</p>
  		</div>
  	</div>
  	
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Indicator } from "mint-ui";
export default {
  name: "flow",
  data() {
    return {
      msg: "flow",
      listDate: [],
      initData: [],
      num: -1,
      isHavePhoneNum: false,
      discountList: [],
      phoneNum: "",
      addr: ""
    };
  },
  computed: {
    ...mapState(['commonStore']),
    defaultFlux() {
      return this.$store.state.defaultFlux;
    },
  },
  created() {
    this.$set(
      this,
      "phoneNum",
      this.commonStore.flowPhonenum ? this.commonStore.flowPhonenum : sessionStorage.flowPhonenum
    );
    //若是登录了，会有默认号码，默认执行一个getData
    if (this.phoneNum) {
      this.getData(this.phoneNum);
    }
    console.log(this.phoneNum);
    this.$set(this, "initData", global.defaultFlux);
    this.$set(this, "listDate", this.initData);
  },
  watch:{
    phoneNum(newValue,oldValue){
      console.log(newValue);
      this.$set(this, "phoneNum", newValue);
      if (newValue &&newValue.length == 11) {
        this.getData(this.phoneNum);
        this.newFlowPhonenum(this.phoneNum)
        window.sessionStorage.flowPhonenum = this.phoneNum;
      } else {
        this.$set(this, "isHavePhoneNum", false);
        this.$set(this, "listDate", this.initData);
        this.$set(this, "discountList", []);
        this.$set(this, "addr", "");
      }
    }
  },
  methods: {
    ...mapMutations(['newRedirectUrl','newCreate_order_info','newFlowPhonenum']),
    getData(phoneNum) {
      this.axiosFun({
        config: {
          url: this.$api + "/h5/flux/list",
          params: {
            phone: phoneNum
          }
        },
        onSuccess: res => {
          console.log(res);
          this.$set(this, "isHavePhoneNum", true);
          this.$set(this, "addr", res.data.value.location);
          // console.log(res);
          this.$set(this, "listDate", res.data.value.packages);
          res.data.value.packages.forEach((item, index) => {
            if (item.recommend) {
              this.$set(this, "num", index);
            }
          });
          //判断此时是否已经点击了列表中的选项
          if (this.num != -1) {
            this.$set(
              this,
              "discountList",
              res.data.value.packages[this.num].items
            );
          }
        }
      });
    },
    tab(index) {
      this.$set(this, "num", index);
      this.listDate.forEach((item, v) => {
        if (index == v) {
          this.discountList = item.items;
        }
      });
    },
    topUp(obj) {
      this.axiosFun({
        config: {
          method: "post",
          url: this.$api + "/h5/flux/top_up",
          data: obj
        },
        deal: {
          backToLogin: true,
          backToLoginFun: () => {
            this.newRedirectUrl(location.href.split("#/")[1]);
            window.localStorage.redirectUrl = location.href.split("#/")[1];
            this.$router.push({
              path: "./login"
            });
          }
        },
        onSuccess: res => {
          console.log(res);

          res.data.value.orderIds = [res.data.value.orderId];
          delete res.data.value.orderId;
          this.newCreate_order_info(res.data.value)
          window.localStorage.create_order_info = JSON.stringify(
            res.data.value
          );
          //跳转到付款页
          this.$router.push({
            path: "/paynow"
          });
        }
      });
    },
    buy(event) {
      console.log({
        phone: this.phoneNum,
        payFeeCent: event.target.dataset.payfeecent,
        skuId: event.target.dataset.skuid,
        couponId: event.target.dataset.couponid,
        merchantId: event.target.dataset.merchantid
      });
      this.topUp({
        phone: this.phoneNum,
        payFeeCent: event.target.dataset.payfeecent,
        skuId: event.target.dataset.skuid,
        couponId: event.target.dataset.couponid,
        merchantId: event.target.dataset.merchantid
      });
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
@import "~@/common/css/flow.scss";
</style>