<template>
  <div class="makingmoneystrategy">
    <div class="banner" v-for='(item,index) in imgList' :key="index">
      <img v-lazy="item" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "Noviceguide",
  data() {
    return {
      imgList:[
        require("../../../assets/zqjc_01.jpg"),
        require("../../../assets/zqjc_02.jpg"),
        require("../../../assets/zqjc_03.jpg"),
        require("../../../assets/zqjc_04.jpg"),
        require("../../../assets/zqjc_05.jpg"),
        require("../../../assets/zqjc_06.jpg"),
        require("../../../assets/zqjc_07.jpg"),
        require("../../../assets/zqjc_08.jpg"),
      ]
    };
  },
  created() {
    document.title = "赚钱攻略"
  },
  methods: {
    
   
  },
  
    
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
@import "~@/common/css/commontitle.scss";
.makingmoneystrategy {
  width:100%;
  height:100%;
  background: #F7F8FA;
  .banner {
    width:100%;
    img {
      width:100%;
      display: block;
    }
  }
  
}
</style>
