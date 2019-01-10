<template>
    	<div v-if="goodsDetail.vipCashbackInfo&&goodsDetail.vipCashbackInfo.isDisplay">
         <div   v-if="goodsDetail.vipCashbackInfo.isVip" class="detail_vip">
          <img src="~@/assets/goods_detals_vip_icon@3x.png" alt=""><span>黑卡会员，可返<em>{{ goodsDetail.vipCashbackInfo.cashbackCent |parse2piont}}</em>元</span>
        </div>
        <div v-else class="detail_vip">
          <img src="~@/assets/goods_detals_vip_icon@3x.png" alt=""><span>加入黑卡会员，可返<em>{{ goodsDetail.vipCashbackInfo.cashbackCent |parse2piont}}</em>元</span>
        </div>
      </div>
</template>

<script>
export default {
  name:"VipGoods",
    props:{
        goodsDetail:{
            type:Object,
            default:{}
        }
    },
    data(){
        return{
          
        }
    },
    created(){
       
    },
    methods: {
      
    },
    filters: {
        parse2piont(value){
            return parseFloat(value/100).toFixed(2)
        }
    },
    mounted () {
      
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.detail_vip {
    height:34px;
    width:100%;
    padding: 0px 20px 0;
    //margin-left:-20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    clear: both;
    //margin-top:10px;
    background: linear-gradient(left,#3E3433,#141414);
    img{
      width:24px;
      height:12px;
      margin: 0 5px 0 0;
    }
    span{
      color:#F2D8B5;
      font-size: 12px;
      em{
        color:#FF3C3A;
      }
    }
  }
</style>
