<template>
    <div class="voucher">
        <ul class="list" >
            <VoucherItem v-for='(item,index) in dataInfo.coupons' :key='index' :itemInfo='item' :index="index"></VoucherItem>
        </ul>
    </div>
</template>

<script>
import VoucherItem from './VoucherItem'
import api from "../api.js";

export default {
  props: {},
  data() {
    return {
      dataInfo: {},
      status:-1
    };
  },
  created() {
    this.getFareCouponList();
  },
  computed:{
    
  },
  components:{
    VoucherItem
  },
  methods: {
   
    async getFareCouponList() {
     let wip = await api.getFareCouponList();
     this.dataInfo = wip.value;
    },
    
  },
  mounted() {},
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.list{
    width: 100%;
    box-sizing: border-box;
    padding: 10px 10px 20px 10px;
}
    
</style>
