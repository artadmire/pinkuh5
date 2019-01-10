<template>
    <div class="voucher">
        <ul class="list" >
            <CashCouponItem v-for='(item,index) in dataInfo.coupons' :key='index' :itemInfo='item' :index="index"></CashCouponItem>  
        </ul>
    </div>
</template>

<script>
import api from "../api.js";
import CashCouponItem from './CashCouponItem'
import { mapState, mapMutations } from 'vuex';
export default {
  props: {},
  data() {
    return {
      dataInfo: {},
      
    };
  },
  created() {
    this.getCashCouponList();
    //console.log(this.hunterStore,999)
  },
  computed:{
    ...mapState(['hunterStore'])
  },
  components:{
    CashCouponItem
  },
  methods: {
    ...mapMutations(['changeJionHunterToastStatus']),
    async getCashCouponList() {
      let wip = await api.getCashCouponList()
      this.dataInfo = wip.value;
    //   this.dataInfo = {
    //     "coupons": [{
    //         "pic": "引导图的图片",
    //         "targetUrl": "引导图跳转地址",
    //         "status": 1,//1.已领取 2.未领取 
    //         "statusDesc":"未领取",
    //         "couponPackageId": 14,
    //         "name": "施华洛世奇专场",
    //         "discountCent": 200,
    //         "thresholdCent": 500,
    //         "usingScope": "指定商品可用",
    //         "type": 1, //1:平台券，2:品类券，3:商户券，4:商品券
    //         "beginTime": "2017-12-12 12:00:00",
    //         "endTime": "2017-12-12 12:00:00"
    //     },
    //     {
    //         "pic": "引导图的图片",
    //         "targetUrl": "引导图跳转地址",
    //         "status": 1,//1.未领取 1.已领取
    //         "statusDesc":"未领取",
    //         "couponPackageId": 12,
    //         "name": "施华洛世奇专场",
    //         "discountCent": 200,
    //         "thresholdCent": 500,
    //         "usingScope": "指定商品可用",
    //         "type": 1, //1:平台券，2:品类券，3:商户券，4:商品券
    //         "beginTime": "2017-12-12 12:00:00",
    //         "endTime": "2017-12-12 12:00:00"
    //             }]

    //   }
    //   console.log(this.dataInfo,"000")
    }
   
  },
  mounted() {
    //console.log(this.hunterStore.hunterInfo)
  },
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.voucher {
  .list {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 10px 20px 10px;
    
  }
}
</style>
