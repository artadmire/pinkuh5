<template>
  <router-link class="commodity" :to="{path:'./detail',query:{id:itemInfo.itemId}}">
      <img :src="itemInfo.pic+'@!800'" alt="">
      <img :src="itemInfo.brandLogo+'@!200'" alt="">
      <div class="commodity_title">
        {{itemInfo.title}}
      </div>
      <div class="salePrice">
          <em>￥{{itemInfo.salePriceCent | capitalize}}</em>
          <i>{{itemInfo.freeChargeDesc}}</i>
      </div>
      <div class="easyPaymentPrice">
        <i>每期￥{{itemInfo.minEasyPaymentCent | capitalize}}起</i>
      </div>
  </router-link>
</template>

<script>
export default {
  name: "commodity",
  props:{
      itemInfo:{
          type:Object,
          default:{}
      }
  },
  data() {
    return {
        
    };
  },
  created() {
  },
  computed: {
  },
  methods: {
  },
  components:{
  },
  filters: {
    capitalize(value) {
      if (!value) return "0";
      return parseFloat(value / 100)
        .toFixed(2)
        .toString()
    },
  },
  mounted() {
    console.log(this.itemInfo)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.commodity{
    width:162px;
    height:285px;
    box-sizing:border-box;
    background:white;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    font-family: 'PingFang SC';
    align-items: center;
    img:nth-child(1){
      width: 160px;
      height: 160px;
      object-fit: cover;
    }
    img:nth-child(2){
      width: 46px;
      height: 46px;
      box-sizing: border-box;
      border: 1px solid #DEE1E7;/*no*/
      border-radius: 50%;
      margin-top: -23px;
      object-fit: cover;
    }
    .commodity_title{
      padding: 0px 12px;
      margin: 8px auto;
      font-size: 12px;
      line-height: 16px;
      height: 32px;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .salePrice{
      width: 100%;
      box-sizing: border-box;
      padding: 0 0 0 12px;
      display: flex;
      line-height: 20px;
      justify-content: space-between;
      em{
        font-size: 14px;
      }
      i{
        background: #91B7F3;
        padding: 0 3px;
        width: 53px;
        height: 20px;
        text-align: right;
        line-height: 20px;
        color: white;
        font-size: 12px;
        transform: scale(0.9);
        position: relative;
        right: -2px;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      }
    }
    .easyPaymentPrice{
      box-sizing: border-box;
      margin-top: 5px;
      padding: 0 12px;
      width: 100%;
      height: 20px;
      display: flex;
      i{
        padding: 0 10px;
        line-height: 20px;
        border: 1px solid #FAE1E1; /*no*/
        font-size: 12px;
        text-align: center;
        background: #FFF4F6;
        color: $pink;
        border-radius: 3px;
      }
    }
}
</style>
