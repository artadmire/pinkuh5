<template>
  <div class="submit_order">
    <SubmitToast v-if="commonStore.submitflag"></SubmitToast>
    <h2><span class="arrow_left" @click="changefalg"></span>提交订单</h2>
    <div class="order_address_choose">
        <!-- 有收获地址 -->
        <div class="order_address_yes" v-if="receiver.name" @click="toGetAddr">
          <img src="~@/assets/address_icon@3x.png" alt="">
          <div>
            <p><span>收货人：{{receiver.name}}</span><em>{{receiver.phone}}</em></p>
            <p>{{region}} {{receiver.address}}</p>
          </div>
          <img src="~@/assets/arrow_right_16_icon.png" alt="">
        </div>
        <!-- 无收获地址 -->
        <div class="order_address_not" @click="toGetAddr" v-else>
          <img src="~@/assets/order_setting_add_unclickale_icon@3x.png" alt="">
          <span>添加收货地址</span>
        </div>
         <img src="~@/assets/addr@3x.png" alt="" class="order_address_choose_bg">
    </div>
    <ul class="order_list">
      <li v-for="(item,index) in res_order_data_list.normalList" :key='index'>
        <p>{{item.groupName}}</p>
        <ul class="order_list_goodsList">
            <li v-for="(itit,v) in item.groupItemList" :key='v'>
              <img v-bind:src="itit.picUrl+'@!200'" alt="">
              <div>
                <p>{{itit.itemTitle}}</p>
                <p>{{itit.skuName}}</p>
                <p>
                  <span>¥{{itit.salePrice|capitalize00}}</span>
                  <em>X{{itit.buyNum}}</em>
                </p>
              </div>
            </li>
        </ul>
        <div class="remarks" v-if='item.itemSource==1'>
          <span>备注:</span><input @change="saveRemarks"  v-model="remarks[index]" type="text" placeholder="选填(请输入文字)">
        </div>
        <!-- 已优惠只有满减才能有 -->
        <div  class="orderList_goodsList_discount"><span v-if='item.groupPromotionDiscountCent'>已优惠:￥{{item.groupPromotionDiscountCent|capitalize00}}</span>小计:￥{{item.groupPromotionFeeCent|capitalize00}}</div>
      </li>
    </ul>
    <!-- 发票 -->
    <div class="invoice submit_order_simpleStyle">
       <i @click='chooseInvoice'>
          <img  v-if='invoice_data.type==2' src="~@/assets/correct_check_icon_20@3x.png" alt="">
          <img  v-else src="~@/assets/correct_uncheck_icon_20@3x.png" alt="">
       </i>
       
       <span>我要开发票</span>
       <div id="invoice_choose_btn" :data-id='invoice_data.type' >
            <span v-if='invoice_data.type==1' ></span>
            <span @click="invoice_choose" v-else-if='invoice_data.type==2&&!invoice_data.titleType'>选择发票</span>
            <span  @click="invoice_choose" v-else-if="invoice_data.type==2&&invoice_data.titleType==2">{{invoice_data.title}}</span>
            <span  @click="invoice_choose" v-else-if="invoice_data.type==2&&invoice_data.titleType==1">{{invoice_data.title}}</span>
       </div>
       <em  v-if='invoice_data.type==2' ></em>
    </div>
    <!-- 现金券 -->
    <div class="discount_choose submit_order_simpleStyle" v-if='orderType==1||orderType==4'>
      <span>现金券</span>
      <div id="discount_choose_btn" @click="cashCoupon" v-if="res_order_data_list.selectedCoupon">
       {{res_order_data_list.selectedCoupon.showText}}
      </div>
      <div class="discount_choose_btn" v-else @click="cashCoupon">
          不使用现金券
      </div>
       <em></em>
    </div>
    <!-- 总金额 -->
    <div class="order_discount_desc" v-if='orderType==1||orderType==4'>
      <p><span>总金额</span><span>￥{{res_order_data_list.sumPromotionFeeCent|capitalize00}}</span></p>
      <p v-if='orderType==1' ><span>现金券抵扣</span><span>￥{{res_order_data_list.sumCouponDiscountCent|capitalize00}}</span></p>
    </div>
    <div class="easyPayment_desc" v-else-if='orderType==3'> 
      <p><span>总金额</span><span>￥{{res_order_data_list.sumPromotionFeeCent|capitalize00}}</span></p>
      <p v-if='res_order_data_list.normalList'><span>分期购</span><span><i v-if='res_order_data_list.normalList[0].groupItemList[0].easyPaymentInfo.freeCharge'>0手续费</i>￥{{res_order_data_list.normalList[0].groupItemList[0].easyPaymentInfo.easyPaymentCent|capitalize00}}x{{res_order_data_list.normalList[0].groupItemList[0].easyPaymentInfo.easyPaymentNum}}期</span></p>
    </div>
    <div id="submit_order_footer" >
      <h5><p>{{preOrderNotice}}</p></h5>
      <div v-if='orderType==1||orderType==4'>
        <div class="real_payment">
          <em>共{{allCount}}件</em>
          <span>实付款: <b>¥{{res_order_data_list.sumPayFeeCent|capitalize00}}</b></span> 
        </div>
        <div id="submit_order_btn" @click="submit_order">{{submitOrderText}}</div>
      </div>
      <div v-else-if='orderType==3'>
        <div class="real_payment" v-if='res_order_data_list.normalList'>
          <em></em>
          <span class="real_payment_1" v-if='res_order_data_list.normalList[0].groupItemList[0].easyPaymentInfo.freeCharge'>每期: <b>¥{{res_order_data_list.normalList[0].groupItemList[0].easyPaymentInfo.easyPaymentCent|capitalize00}}</b></span>
          <span class="real_payment_2" v-else>
            <i>每期: <b>¥{{res_order_data_list.normalList[0].groupItemList[0].easyPaymentInfo.easyPaymentCent|capitalize00}}</b></i>
            <i>含手续费：¥{{res_order_data_list.normalList[0].groupItemList[0].easyPaymentInfo.chargeCent | capitalize00}}每期</i>
          </span>
        </div>
        <div id="submit_order_btn" @click="submit_order">提交分期订单</div>
      </div>
    </div>
    <!-- 优惠券 -->
    <transition name='fade'>
      <div class="mask discount_mask" v-if="isCashCouponBoxShow">
        <div class="discount_top" @click="cashCoupon_close"></div>
        <div class="discount_list">
          <h3>现金券</h3>
          <ul>
            <li>
              <span>不使用优惠券</span><em  :class="{active:cashCoupon_list_states[0],cash:1}" @click="cashCoupon_true($event)"></em>
            </li>
            <li v-for="(item,index) in res_order_data_list.couponList" v-bind:data-couponId="item.couponId" :key='index'>
              <span>{{item.showText}}</span><em  :class="{active:cashCoupon_list_states[index+1],cash:1}" @click="cashCoupon_true($event)"></em>
            </li>

          </ul>
          <div id="cashCoupon_close" @click="cashCoupon_close">关闭</div>
        </div>
      </div>
    </transition>
    <form id="alipayExtend"  name="punchout_form" method="post">
      <input type="hidden"  v-for="(item,index) in alipay" v-model="item.value" v-bind:name="item.name" :key='index'>
    </form>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import axios from "axios";
import { Toast,MessageBox } from "mint-ui";
import SubmitToast from "@/pages/OrderModule/components/SubmitToast"
export default {
  name: "Header",
  data() {
    return {
      hasAddr: true,
      order_data_list: [],
      res_order_data_list: [],
      imgUrl: "",
      invoice_data: {},
      isCashCouponBoxShow: false,
      cashCoupon_list_states: [false, true],
      cashCoupon_title: "",
      receiver: "",
      createOrderData: {
        payFeeCent: 0,
        groupList: [],
        invoice: {},
        receiver: {},
      },
      remarks: [],
      allCount: 0,
      preOrderNotice: "",
      orderType:1,
      alipay:[],
    };
  },
  computed: {
    ...mapState(['commonStore']),
    submitOrderText(){
      if(this.orderType==1){
        return '提交订单'
      }else if(this.orderType==4){
        return '提交拼团订单'
      }
    },
    region(){
      let wip = '';
      this.receiver.region.split(';').forEach((item,index)=>{
        wip += item + ' ';
      })
      return wip;
    }
  },
  created() {
    // console.log(this)
    //判断订单列表信息
    this.order_data_list =
      this.commonStore.submit_order_data.length
        ? this.commonStore.submit_order_data
        : JSON.parse(localStorage.submit_order_data);
     console.log(this.order_data_list)
     //判断订单类型
    this.$set(this,'orderType',this.order_data_list.orderType);
    //判断图片的链接地址
    this.imgUrl = this.commonStore.imgUrlPrefix
      ? this.commonStore.imgUrlPrefix
      : localStorage.imgUrlPrefix;
    this.preOrderNotice = global.preOrderNotice;
    //判断发票信息
    console.log(sessionStorage)
    if (sessionStorage.invoice_info) {
      console.log('guoyang')
      this.invoice_data = this.commonStore.invoice_info.title
        ? this.commonStore.invoice_info
        : JSON.parse(sessionStorage.invoice_info);
    }
    console.log(this.invoice_data)
    if (sessionStorage.receiver_data) {
      this.receiver = JSON.parse(sessionStorage.receiver_data);
    } else {
      this.getAddr();
    }
    //判断地址
    // console.log(this.order_data_list);
    this.get_pre_order(this.order_data_list);
    //备注
    // console.log(sessionStorage.remarks);
    let remarksArr = [];
    if (sessionStorage.remarks) {
      this.remarks = sessionStorage.remarks;
      sessionStorage.remarks.split(",").forEach(item => {
        remarksArr.push(item);
      });
      this.$set(this, "remarks", remarksArr);
    } else {
      this.remarks = [];
    }
  },
  methods: {
    ...mapMutations(['newInvoice_info','newCreate_order_info','newOrderParticpateTuanId',"newOrdersumPayFeeCent","newSubmitflag"]),
    //立即付款
    changefalg(){
      console.log(22)
      this.newSubmitflag(true)
    },
    submit_order() {
      
      // console.log(this.res_order_data_list);
      // console.log(this.remarks);
      // return false;
      console.log(this.invoice_data)
      this.newOrdersumPayFeeCent(this.res_order_data_list.sumPayFeeCent)
      //付款金额
      this.createOrderData.payFeeCent = this.res_order_data_list.sumPayFeeCent;
      this.createOrderData.orderType = this.orderType;
      this.res_order_data_list.normalList.forEach((item, index) => {
        let itemListArr = [];
        item.groupItemList.forEach(itit => {
          itemListArr.push({
            skuId: itit.skuId,
            buyNum: itit.buyNum
          });
        });
        this.createOrderData.groupList.push({
          merchantId: item.merchantId,
          memo: this.remarks[index],
          itemList: itemListArr
        });
      });

      this.createOrderData.invoice = {
        type: this.invoice_data.type?this.invoice_data.type:1,
        titleType: this.invoice_data.titleType,
        title: this.invoice_data.title,
        taxId: this.invoice_data.taxId,
        email: this.invoice_data.email
      };
      this.createOrderData.receiver = {
        receiverName: this.receiver.name,
        receiverPhone: this.receiver.phone,
        receiverAddress:
          this.receiver.region.split(";").join("") + this.receiver.address
      };

      this.createOrderData.couponId = this.res_order_data_list.selectedCoupon
        ? this.res_order_data_list.selectedCoupon.couponId
        : "";

      this.createOrderData.useCoupon = this.createOrderData.couponId?true:false;
      console.log(this.res_order_data_list.normalList)
      // console.log(this.createOrderData)
      // return;
      if(this.orderType==3){
          this.createOrderData.easyPayment = {
            'easyPaymentCent':this.res_order_data_list.normalList[0].groupItemList[0].easyPaymentInfo.easyPaymentCent,
            'freeCharge':this.res_order_data_list.normalList[0].groupItemList[0].easyPaymentInfo.freeCharge,
            'easyPaymentNum':this.res_order_data_list.normalList[0].groupItemList[0].easyPaymentInfo.easyPaymentNum
          }
          //确定订单类型
          this.createOrderData.orderType = 3;
      }
      if(this.commonStore.orderParticpateTuanId){
        this.createOrderData.tuanId = this.commonStore.orderParticpateTuanId;
      }
      console.log(this.createOrderData);
      //创建订单
      this.create_order_ajax(this.createOrderData);
    },
    //获取地址
    toGetAddr() {
      console.log(this.hasAddr);
      if (this.hasAddr) {
        this.$router.push({
          path: "/addrList"
        });
      } else {
        this.$router.push({
          path: "/newAddr"
        });
      }
    },
    chooseInvoice(){
      console.log(this.invoice_data)
        if(this.invoice_data.type==1||!this.invoice_data.type){
          if(!this.invoice_data.title){
            this.$router.push({
              path: "/invoice_list"
            });
          }
          this.$set(this.invoice_data,'type',2)
        }else{
          this.$set(this.invoice_data,'type',1)
        }
        
    },
    //发票选择
    invoice_choose() {
      this.$router.push({
        path: "/invoice_list"
      });
    },
    saveRemarks() {
      sessionStorage.remarks = this.remarks;
      console.log(sessionStorage.remarks);
    },
    cashCoupon() {
      this.isCashCouponBoxShow = true;
    },
    cashCoupon_close() {
      this.isCashCouponBoxShow = false;
    },
    cashCoupon_true(event) {
      // this.cashCoupon_list_states = this.res_order_data_list.selectedCoupon?[false]:[true];
      this.cashCoupon_list_states = [];
      let cashDom = document.getElementsByClassName("cash");
      // activeIndex = 0;
      for (let i = 0; i < cashDom.length; i++) {
        if (event.target == cashDom[i]) {
          // console.log(cashDom[i].parentNode.dataset.couponid);
          // activeIndex = i;
          this.cashCoupon_list_states.push(true);

          this.res_order_data_list.selectedCoupon = this.res_order_data_list
            .selectedCoupon
            ? this.res_order_data_list.couponList[i - 1]
            : false;
          // console.log(this.res_order_data_list.selectedCoupon)
          let obj = this.order_data_list;
          // console.log(cashDom[i].parentNode.dataset.couponid)
          let useCouponState = cashDom[i].parentNode.dataset.couponid
            ? true
            : false;
          console.log(obj)
          this.axiosFun({
            config: {
              method: "post",
              url: this.$api + "/h5/orders/pre_order",
              data: {
                itemList: obj.itemList,
                useCoupon: useCouponState,
                couponId: cashDom[i].parentNode.dataset.couponid,
                orderType:obj.orderType
              }
            },
            onSuccess: res => {
              if (res.data.value) {
                this.$set(this, "res_order_data_list", res.data.value);
                // console.log(this.res_order_data_list)
                let allCountNum = 0;
                res.data.value.normalList.forEach(item => {
                  item.groupItemList.forEach(itit => {
                    allCountNum += itit.buyNum;
                  });
                });
                this.$set(this, "allCount", allCountNum);
              }
            }
          });
        } else {
          this.cashCoupon_list_states.push(false);
        }
      }
      // console.log(this.cashCoupon_list_states);
      setTimeout(() => {
        this.isCashCouponBoxShow = false;
      }, 0);
    },
    get_pre_order(obj) {
      this.axiosFun({
        config: {
          method: "post",
          url: this.$api + "/h5/orders/pre_order",
          data: obj
        },
        onSuccess: res => {
          // console.log(res.data.value);
          //若是有无效商品提示并返回上一页
          if(res.data.value.abnormalList.length>0){
            MessageBox.alert(
              '存在失效商品'
            ).then(action => {
              window.history.go(-1);
            });
          }
          this.$set(this, "res_order_data_list", res.data.value);
          // console.log(this.res_order_data_list)
          let allCountNum = 0;
          res.data.value.normalList.forEach(item => {
            item.groupItemList.forEach(itit => {
              allCountNum += itit.buyNum;
            });
          });
          // this.$set(this,'cashCoupon_list_states',res.data.value.selectedCoupon?[false]:[true])
          this.$set(this, "allCount", allCountNum);
          // console.log(res.data.value);
          if (!res.data.value.selectedCoupon) {
            this.$set(this, "cashCoupon_list_states", [true]);
          }
        }
      });
    },
    create_order_ajax(obj) {
      this.axiosFun({
        config: {
          method: "post",
          url: this.$api + "/h5/orders/create",
          data: obj
        },
        onSuccess: res => {
          this.newCreate_order_info(res.data.value)
          window.localStorage.create_order_info = JSON.stringify(
            res.data.value
          );
          //清空参团Id
          this.newOrderParticpateTuanId(null)
          //清空发票信息
          this.newInvoice_info({})

          window.sessionStorage.invoice_info = JSON.stringify({});
          //清空备注
          sessionStorage.remarks = "";
          // 如果是分期购，只能直接呼起支付宝
          if(this.orderType==3){
            console.log(res.data.value);
            let obj = {
                payType: 4,
                payFeeCent: res.data.value.payFeeCent,
                orderIds: res.data.value.orderIds,
                creditTermNum:this.res_order_data_list.normalList[0].groupItemList[0].easyPaymentInfo.easyPaymentNum
            }
            this.easyPaymentAjax(obj);
          }else{
              //跳转到付款页
              this.$router.push({
                path: "/paynow"
              });
          }
        },
        onFailed:res=>{
          sessionStorage.remarks = "";
          window.history.go(-1);
        }
      });
    },
    easyPaymentAjax(obj){
      console.log(obj)
        this.axiosFun({
          config:{
              method: "post",
              url: this.$api + "/h5/orders/pay",
              data: obj
          },
          onSuccess:res=>{
            console.log(res);
            // 清空备注
             sessionStorage.remarks = "";
            if(res.data.value.alipayExtend){
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
            }
          },
          onFailed:res=>{
            sessionStorage.remarks = "";
            window.history.go(-1);
          }
        })
    },
    //获取默认地址
    getAddr() {
      this.axiosFun({
        config: {
          url: this.$api + "/h5/users/address/list"
        },
        onSuccess: res => {
          if (res.data.value.length) {
            res.data.value.forEach(item => {
              if (item.isDefault) {
                this.$set(this, "receiver", item);
              }
            });
          }
        }
      });
    }
  },
  mounted(){
    // console.log(this.res_order_data_list)
  },
  components: {
    SubmitToast
  },
  filters: {
    capitalize(value) {
      if (!value) return "0";
      return parseFloat(value / 100).toFixed(0);
    },
    capitalize00(value) {
      if (!value) return "0";
      return parseFloat(value / 100).toFixed(2);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
@import "~@/common/css/submit-order";
</style>
