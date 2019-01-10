<template>
    	<div class="detail_desc" v-if="goodsDetail.basicInfo">
        <p class="detail_name" >{{goodsDetail.basicInfo.title}}</p>
        <p class="detail_price">
          <span>
            ¥<em>{{goodsDetail.basicInfo.salePriceCent|capitalize}}</em>.{{goodsDetail.basicInfo.salePriceCent|capitalize2}}
          </span>
          <b v-if='goodsDetail.basicInfo.itemType!=3'>￥{{goodsDetail.basicInfo.originalPriceCent|transMoney00}}</b>
          <i v-if='goodsDetail.basicInfo.itemType==4'>{{goodsDetail.pintuanInfo.quota}}人团</i>
          <i v-else-if='goodsDetail.basicInfo.discountPercent!=0&&goodsDetail.basicInfo.discountPercent !=100'>{{goodsDetail.basicInfo.discountPercent|transMoney0}}折</i>
          
        </p>
        <ul class="detail_discount" v-if="goodsDetail.markList">
          <li v-for="(item,index) in goodsDetail.markList" :key="index"><img v-lazy="item.pic+'@!400'" alt=""><i>{{ item.desc }}</i></li>
          <!-- <li v-if='goodsDetail.basicInfo.bestPayPromotionTitle'><span class="detail_icon_yi">低</span><i>可使用领钱最高抵扣¥8.98</i></li>
          <li v-if='goodsDetail.easyPaymentInfo'><span class="detail_icon_mian">免</span><i class="detail_title_mian">该商品最高可享{{goodsDetail.easyPaymentInfo.highestFreeNum}}期分期免息</i></li>
          <li v-if='goodsDetail.basicInfo.bestPayPromotionTitle'><span class="detail_icon_yi">翼</span><i>{{goodsDetail.basicInfo.bestPayPromotionTitle}}</i></li>
          <li v-if='goodsDetail.basicInfo.onSession'><span class="detail_icon_jian">减</span><i>每满{{goodsDetail.sessionInfo.discountThresholdCent|transMoney}}减{{goodsDetail.sessionInfo.discountCent|transMoney}},上不封顶</i></li> -->
        </ul>
        
      </div>
</template>

<script>
export default {
    props:{
        goodsDetail:{
            type:Object,
            default:{}
        }
    },
    data(){
        return{
          isVip:false
        }
    },
    created(){
       
    },
    methods: {
        
    },
    filters: {
        capitalize(value) {
        if (!value) return "0";
        return parseFloat(value / 100)
            .toFixed(2)
            .toString()
            .split(".")[0];
        },
        capitalize2(value) {
        if (!value) return "0";
        return parseFloat(value / 100)
            .toFixed(2)
            .toString()
            .split(".")[1];
        }
    },
    mounted () {
        console.log(this.goodsDetail)
      
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.detail_desc {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px 0;
  max-width: 414px;
  margin: 0 auto;
  background: white;
  .detail_name {
    font-size: 18px;
    color: $fontColor;
    line-height: 28px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin-bottom: 10px;
  }
  .detail_price {
    position: relative;
    width: 100%;
    height: 34px;
    line-height: 34px;
    margin-bottom: 10px;
    span {
      font-weight: normal;
      font-size: 14px;
      color: $pink;
      line-height: 24px;
      em {
        font-size: 18px;
      }
    }
    b {
      margin-left: 10px;
      font-size: 12px;
      color: #9b9b9b;
      line-height: 12px;
      text-decoration: line-through;
    }
    i {
      position: absolute;
      background: $pink;
      border-radius: 12px 0 0 12px;
      width: 54px;
      height: 24px;
      text-align: center;
      line-height: 24px;
      color: white;
      right: -20px;
      top: 0;
    }
  }
  
  .detail_discount {
    li {
      display: flex;
      align-items: center;
      //justify-content: center;
      img {
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 4px;
        transform: scale(0.9);
        margin-right: 5px;
        //text-align: center;
       // line-height: 16px;
      }
      // .detail_icon_yi {
      //   color: $pink;
      //   border: 1px solid $pink;
      //   /*no*/
      // }
      // .detail_icon_mian {
      //   color: $pink;
      //   border: 1px solid $pink;/*no*/
      // }
      // .detail_title_mian{
      //   color: $pink;
      // }
      // .detail_icon_jian {
      //   color: #91b7f3;
      //   border: 1px solid #91b7f3;
      //   /*no*/
      // }
      width:335px;
      height: 24px;
      //line-height: 24px;
      font-size:12px;
      color:$gray;
    }
  }
}
</style>
