<template>
  <div class="swiper">
    <mt-swipe :auto="5000">
        <mt-swipe-item  v-for="(item,index) in bannerArr"  v-bind:key="index" >
          <SchemeSimple :url='item.link' :img="item.img" :urlPrefix='commonStore.imgUrlPrefix' size='@!1200'  />
        </mt-swipe-item>
      </mt-swipe>
      <!-- <div id="brand"><div></div></div> -->
  </div>
</template>

<script>
import Vue from "vue";
import { mapState,mapMutations} from 'vuex';
import { Toast } from "mint-ui";
export default {
  name: "Swiper",
  data() {
    return {
      bannerArr: []
    };
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapState(['commonStore'])
  },
  methods: {
    getData() {
      this.axiosFun({
        config: {
          url: this.$api + "/h5/ads/query?positionId=2&pageSize=6&currentPage=1"
        },
        onSuccess: res => {
          res.data.value.values.forEach((item, v) => {
            //判断scheme类型
            this.bannerArr.push(JSON.parse(item.data));
          });
          // console.log(res.data.value.values)
        }
      });
    }
  },
  mounted() {
    // console.log(this.bannerArr)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
@import "~@/common/css/var.scss";
.mint-swipe-items-wrap {
  height: 172px;
}
.mint-swipe-indicator.is-active {
  background: $pink;
}
.mint-swipe-indicators{
  bottom: 15px;
}
img {
  width: 100%;
}
// #brand{
//   position: relative;
//   top: -10px;
//   width: 100%;
//   height: 11px;
//   overflow: hidden;
//   div{
//     background: white;
//     border-radius:  100%/100% 100% 0 0;
//     width: 100%;
//     height: 11px;

//   }
// }
</style>





