<template>
  <div class="makingmoneystrategy">
    <div class="banner" v-for='(item,index) in imgList' :key="index">
      <img v-lazy="item" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "Makingmoneystrategy",
  data() {
    return {
      imgList:[
        require("../../../assets/aa.jpg"),
        require("../../../assets/bb.jpg"),
        require("../../../assets/cc.jpg"),
        require("../../../assets/dd.jpg"),
        require("../../../assets/ee.jpg"),
        require("../../../assets/ff.jpg"),
        require("../../../assets/hh.jpg"),
        require("../../../assets/lADPBbCc1snjHCzNBhTNBLA_1200_1556.jpg"),
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
