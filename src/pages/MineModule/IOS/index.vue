<template>
  <div class="IOS">
   <img src="../../../assets/IOSanzhuang_01.jpg" alt="">
   <img src="../../../assets/IOSanzhuang_02.jpg" alt="">
  </div>
</template>

<script>
import { commandCopy } from 'xe-command'
export default {
  name: "IOS",
  
  data() {
    return {
     
      
    };
  },
  created() {
    document.title = "常见问题"
  },
  mounted() {
    
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.IOS{
  width:100%;
  height:100%;
  img {
    width:100%
  }
}

</style>
