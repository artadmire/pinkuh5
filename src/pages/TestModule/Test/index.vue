<template>
  <div>
    <input type="tel"  ref="inp" id="inputFocus" autofocus  unselectable="on" v-myFocus="value" @click="autoFocus" >    
  </div>
</template>

<script>
// import $ from "jquery"
import { Source } from "@/untils"
export default {
  data() {
    return {
      value:true
    };
  },
  directives: {
    //自动获取焦点
    myFocus: {
      inserted:function(el) {
        console.log("自动绑定成功")
        el.focus();
        
      }
    }
    
  },
  created() {
    console.log(Source())
  },
  computed: {},

  methods: {
    autoFocus(){
      this.$refs.inp.focus()
    }
    
  },

  // ListenFromRightDesc(msg) {
  //   this.fixedStatus = msg;
  // },
 
  mounted() {
    this.value = false
    // this.commitPerformanceEvent();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
#inputFocus {
  width:300px;
  height:50px;
  // background: red;
  // margin:0 auto;
  margin:30px;
  border:1px solid #333333;
}
</style>
