<template>
  <div class="active">
    <!-- <h2><i onclick="window.history.go(-1)"></i>{{data.title}}</h2> -->
    <Download></Download>
  	<div class="yearGoodsBox">
  		<Scheme :blocks='data.blocks'></Scheme>
  	</div>
    <Footer></Footer>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { mapState,mapMutations} from 'vuex';
export default {
  name: "active",
  data() {
    return {
      msg: "suolun",
      data: {
        title: "",
        backgroudColor: "",
        blocks: []
      }
    };
  },
  created() {
    //修改footer组件底部的状态信息
    this.newFooterState({
      tab1: false,
      tab2:false,
      tab3: true,
      tab4: false
    });
    window.localStorage.footerState = JSON.stringify({
      tab1: false,
      tab2: false,
      tab3:true,
      tab4: false
    });
    this.getYearGoodsData();
  },
  methods: {
    ...mapMutations(['newFooterState']),
    getYearGoodsData() {
      this.axiosFun({
        config: {
          url: this.$api + "/h5/home/nianhuo_detail"
        },
        onSuccess: res => {
          if (res.data.succ) {
            let resData = JSON.parse(res.data.value.data);
            this.$set(
              this.data,
              "title",
              resData.title ? resData.title : "年货节"
            );
            this.$set(
              this.data,
              "backgroudColor",
              resData.backgroudColor ? resData.backgroudColor : "white"
            );
            this.$set(
              this.data,
              "blocks",
              resData.blocks ? resData.blocks : []
            );
          }
          this.$nextTick(() => {
            document.getElementsByClassName(
              "active"
            )[0].style.background = this.data.backgroudColor;
          });
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.yearGoodsBox{
  padding:44px 0 48px; 
}
</style>
