<template>
    <div class="sessionSec" v-if="goodsDetail.sessionInfo" >
        <img :src="goodsDetail.sessionInfo.icon+'@!400'" alt="">
        <div>
            <p>{{goodsDetail.sessionInfo.title}}</p>
            <p>
                <b>2.5</b><em>折起</em><span>每满{{goodsDetail.sessionInfo.discountThresholdCent |transMoney}}减{{goodsDetail.sessionInfo.discountCent |transMoney}}</span>
            </p>
        </div>
        <router-link :to='{path:"./special",query:{sessionId:goodsDetail.sessionInfo.id}}'>进入专场></router-link>
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
        }
    },
    created(){
       
    },
    methods: {
        
    },
    mounted () {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.sessionSec {
  display: flex;
  width: 335px;
  height: 80px;
  margin: 20px auto;
  box-shadow: 0 0 13px 0 rgba(57, 66, 109, 0.08);
  padding: 0 10px;
  box-sizing: border-box;
  align-items: center;
  img {
    width: 80px;
    height: 80px;
    border: 1px solid #f7f8fa; /*no*/
    margin-top: -10px;
  }
  >div {
    flex: 1;
    padding: 0 10px;
    line-height: 25px;
    p:nth-child(1) {
      font-size: 14px;
      width: 130px;
      color: $fontColor;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p:nth-child(2) {
      font-size: 12px;
      color: $gray;
      b {
        font-size: 15px;
        color: $pink;
        font-weight: bold;
      }
      em {
        color: $pink;
      }
      span {
        display: inline-block;
        transform: scale(0.9);
      }
    }
  }
  >a {
    width: 72px;
    font-size: 14px;
    color: $pink;
  }
}
</style>
