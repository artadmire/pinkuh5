<template>
	<ul class="hotGoods_list" v-if="GoodsData.length">
    <li class="goods_list" v-for="(item,index) in GoodsData" :key='index'>
        <router-link :to="{path:'./detail',query:{id:item.itemId}}">
          <img class="hotGoods_img" v-lazy="commonStore.imgUrlPrefix+item.pic+'@!400'" alt="">
          <div v-if="item.brandLogo"><img  v-bind:src="commonStore.imgUrlPrefix+item.brandLogo+'@!200'" alt="" class="hotGoods_logo"></div>
          <img v-else src="" alt="" style="display:none">
          <p>{{item.title}}</p>
          <p><span>￥{{item.salePriceCent | transMoney00}}</span></p>
          <p><span>¥{{item.originalPriceCent|transMoney00}} </span> <i v-if="(item.discountPercent!=0) && (item.discountPercent!=100)">{{item.discountPercent|capitalize}}.<em>{{item.discountPercent|capitalize2}}</em>折</i></p>
        </router-link>
		</li>
  </ul>
  
</template>

<script>
import { mapState,mapMutations} from 'vuex';
export default {
  name: "GoodsList",
  props: ["GoodsData"],
  data() {
    return {
      msg: "suolun"
    };
  },
  created() {
    console.log(this.GoodsData);
  },
  computed: {
    ...mapState(['commonStore'])
  },
  methods: {},
  filters: {
    capitalize: function(value) {
      if (!value) return "0";
      return parseFloat(value / 10)
        .toFixed(1)
        .toString()
        .split(".")[0];
    },
    capitalize2: function(value) {
      if (!value) return "0";
      return parseFloat(value / 10)
        .toFixed(1)
        .toString()
        .split(".")[1];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.hotGoods_list {
  display: flex;
  flex-wrap: wrap;
  width: 335px;
  margin: 0 auto;
  justify-content: space-between;
  li {
    background: white;
    border: 1px solid #dee1e7; /*no*/
    width: 162px;
    margin-bottom: 10px;
    .hotGoods_img {
      width: 162px;
      height: 162px;
      display: block;
      object-fit: cover;
    }
    div {
      border: 1px solid #dee1e7; /*no*/
      display: block;
      width: 46px;
      height: 46px;
      border-radius: 50%;
      margin: -23px auto 0;
      overflow: hidden;
      .hotGoods_logo {
        background: white;
      }
    }
    p {
      padding: 0 10px;
    }
    p:nth-child(3) {
      font-size: 12px;
      color: $fontColor;
      letter-spacing: 0;
      line-height: 16px;
      text-align: left;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      height: 32px;
      margin-top: 6px;
    }
    p:nth-child(4) {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 20px;
        color: #f12b55;
        letter-spacing: -1px;
        line-height: 20px;
        text-align: left;
      }
    }
    p:nth-child(5) {
      font-size: 12px;
      padding: 0 0 0 10px;
      color: #9b9b9b;
      letter-spacing: 0;
      line-height: 25px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        text-decoration: line-through;
        transform: scale(0.9);
      }
      i {
        padding: 0 3px;
        width: 38px;
        height: 14px;
        line-height: 14px;
        background: #ff9f5f;
        color: white;
        border-top-left-radius: 7px;
        border-bottom-left-radius: 7px;
        em {
          display: inline-block;
          font-size: 12px;
          transform: scale(0.9);
        }
      }
    }
  }
}
</style>
