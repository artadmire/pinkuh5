<template>
    <dl class="brand_list_detail" >
        <router-link :to='{path:"./special",query:{sessionId:item.sessionId}}'>
        <img v-if="item.banner" v-lazy='imgUrl+item.banner+"@!800"' alt="">
        <dt>
            <img v-lazy="imgUrl+item.brandLogo+'@!400'" alt="">
            <div>
            <p>{{item.title}}</p>
            <p><span><em>{{item.minDiscountPercent | transMoney0}}</em>折起</span> <i>每满{{item.discountThresholdCent| transMoney}}减{{item.discountCent|transMoney}}上不封顶</i></p>
            </div>
            <p>{{(new Date((item.endTime.replace(/-/g,'/')))-new Date())|timer}}</p>
        </dt>
        <dd>
            <div v-for="(itit,v) in item.items" :key='v'>
            <img v-lazy="imgUrl+itit.pic+'@!400'" alt="">
            <p>￥{{itit.priceCent | transMoney00}}</p>
            </div>
        </dd>
        </router-link>
    </dl>
</template>

<script>
import { mapState } from 'vuex';
export default {
    props:{
        item:{
            type:Object,
            default:{}
        }
    },
    data(){
        return{
            imgUrl:''
        }
    },
    computed:{
        ...mapState(['commonStore'])
    },
    created(){
       this.imgUrl = this.commonStore.imgUrlPrefix
      ? this.commonStore.imgUrlPrefix
      : localStorage.imgUrlPrefix;
    },
    methods: {
        
    },
    filters: {
        timer: function(time) {
        let second = parseInt(time / 1000) % 60,
            min = ((parseInt(time / 1000) - second) / 60) % 60,
            hour = (((parseInt(time / 1000) - second) / 60 - min) / 60) % 24,
            day = (((parseInt(time / 1000) - second) / 60 - min) / 60 - hour) / 24;
        if (day < 1) {
            return "不足1天";
        } else {
            return "还剩" + day + "天";
        }
        }
    },
    mounted () {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.brand_list_detail {
      background: white;
      margin-bottom: 15px;
      padding-bottom: 8px;
      box-shadow: 0px 5px 15px rgba(204, 205, 203, 0.15);
      a {
        >img {
          width: 335px;
          height: 201px;
          display: block;
          object-fit: cover;
        }
        width: 335px;
        background: white;
        margin-bottom: 15px;
        dt {
          display: flex;
          justify-content: space-between;
          margin-bottom: 11px;
          img {
            width: 80px;
            height: 80px;
            margin-left: 9px;
          }
          div {
            padding-left: 10px;
            p:nth-child(1) {
              width: 174px;
              height: 18px;
              font-family: $fontFamily;
              font-size: 14px;
              color: $fontColor;
              line-height: 18px;
              text-align: left;
              padding-top: 22px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            p:nth-child(2) {
              display: flex; // justify-content:space-between;
              font-family: $fontFamily;
              font-size: 12px;
              color: $gray;
              line-height: 12px;
              text-align: right;
              padding-top: 9px;
              span {
                color: $pink;
                padding-right: 5px;
                em {
                  font-size: 14px;
                }
              }
              i {
                font-family: initial;
              }
            }
          }
          >p {
            background: #f4f4f4;
            border-radius: 12px 0 0 12px;
            width: 54px;
            height: 24px;
            font-size: 10px;
            color: $gray;
            text-align: right;
            padding-right: 5px;
            line-height: 24px;
            box-sizing: border-box;
            margin-top: 17px;
          }
        }
        dd {
          display: flex;
          flex-wrap: wrap;
          padding: 0 7px;
          width: 321px;
          div {
            width: 107px;
            box-sizing: border-box;
            border: 1px solid #f4f4f4;
            /*no*/
            background: white;
            img {
              display: block;
              width: 105px;
              height: 105px;
              object-fit: cover;
            }
            p {
              height: 32px;
              line-height: 32px;
              text-align: center;
              color: $fontColor;
            }
          }
        }
      }
    }
</style>
