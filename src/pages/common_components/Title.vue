<template>
  <div class="header">
    <img  src="~@/assets/logo_white@3x.png" alt="">
  </div>
</template>
  
<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.header {
  transform: translate3d(0, 0, 0);
  background: $pink;
  width: 100%;
  height: 40px;
  display: flex;
  position: fixed;
  top: 44px;
  left: 0;
  z-index: 9999;
  justify-content: center;
  align-items: center;
  img {
    width: 60px;
    height: 28px;
  }
}
</style>
