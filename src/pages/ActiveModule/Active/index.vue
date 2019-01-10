<template>
  <div class="active">
    <Download></Download>
     <h2><i onclick="window.history.go(-1)"></i>{{data.title}}<router-link to="./"></router-link></h2>
    <div class="activebox">
      <Scheme :blocks='data.blocks'></Scheme>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "active",
  data() {
    return {
      msg: "suolun",
      data: {
        title: "",
        backgroudColor: "white",
        blocks: []
      }
    };
  },
  created() {
    this.watchRouter();
  },
  watch: {
    $route: "watchRouter"
  },
  methods: {
    watchRouter() {
      let id = this.$route.query.id;
      this.getActiveData(id);
    },
    getActiveData(id) {
      this.axiosFun({
        config: {
          url: this.$api + "/h5/ads/ad_detail",
          params: {
            id: id
          }
        },
        onSuccess: res => {
          let resData = JSON.parse(res.data.value.data);
          this.$set(
            this.data,
            "title",
            resData.title ? resData.title : "活动"
          );
          this.$set(
            this.data,
            "backgroudColor",
            resData.backgroudColor ? resData.backgroudColor : "white"
          );
          this.$set(this.data, "blocks", resData.blocks ? resData.blocks : []);
          this.$nextTick(() => {
            document.getElementsByClassName(
              "active"
            )[0].style.background = this.data.backgroudColor;
          });
        }
      });
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
@import "~@/common/css/active.scss";
</style>
