<template>
  <div class="inputinvitioncode">
    <h2><i class="arrow_left"  onclick="window.history.go(-1)"></i>爆好货邀请码</h2>
    <div class='content'>
      <input type="tel" placeholder="请输入你的邀请码">
      <router-link to = "./" tag = 'p'> 立即加入</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Inputinvitioncode",
  data() {
    return {
      
    };
  },
  created() {
    
  },
  methods: {
    
   
  },
  
    
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
@import "~@/common/css/commontitle.scss";
.inputinvitioncode {
  width:100%;
  height:100%;
  .content {
    width:100%;
    padding:0 10%;
    input {
      height:50px;
      width:80%;
      border:1px solid $gray;/*no*/
      padding-left: 10px;
    }
    p {
      height:50px;
      width:80%;
      background: palegreen;
      line-height: 50px;
      text-align: center;
    }
  }
}
</style>
