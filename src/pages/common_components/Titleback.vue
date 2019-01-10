<template>
  <h2><i v-show='arrowLeftStatus' class="arrow_left"  onclick="window.history.go(-1)"></i>{{ title }}</h2>
</template>
  
<script>
export default {
  name: "Titleback",
  data() {
    return {
    
    };
  },
  props: {
    title:{
      type:String,
      default:''
    },
    arrowLeftStatus:{
      type:Boolean,
      default:true
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
@import "~@/common/css/commontitle.scss";
h2{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}
</style>
