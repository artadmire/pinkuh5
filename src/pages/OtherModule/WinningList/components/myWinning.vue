<template>
  <li>
    <img v-lazy="imgUrl+myWinningResults.pic+'@!400'" alt="">
    <div class="right">
      <p><span>{{myWinningResults.title}}</span></p>
      <span>{{myWinningResults.describe}}</span>
    </div>
  </li>
</template>

<script>
import { Godownload } from "@/util";
//import func from './vue-temp/vue-editor-bridge';
export default {
  name: "myWinning",
  data() {
    return {
      imgUrl:""
    };
  },
  props:{
    myWinningResults:{
      type:Object,
      default:{}
    }
  },
  created() {
    this.imgUrl = this.imgUrlPrefix
      ? this.imgUrlPrefix
      : localStorage.imgUrlPrefix;
  },
  mounted () {
    
  },
  methods: {
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
// @import "~@/common/css/commontitle.scss";
li {
  border-radius: 8px;
  height:120px;
  width:100%;
  background: white;
  box-shadow: 0 3px 12px 0 #DEE1E7;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  img {
    
    height:110px;
    width:110px;
   // background: red;
    margin:0 10px 0 5px;
  }
  .right{
    height:100%;
    display: flex;
    flex-direction: column;
    
    padding: 10px 0 6px 0;
    box-sizing: border-box;
   justify-content: space-between;
    
    p {
      
      width:182px;
      height:40px;
      overflow: hidden;
      font-size: 14px;
      line-height: 20px;
      -webkit-line-clamp:2;
      word-break:break-all;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      text-overflow: ellipsis;
    }
    >span {
      display: block;
      width:182px;
      max-height:60px;
      line-height: 16px;
      font-size: 14px;
      color:#FF3C3A;
      overflow: hidden;
    }
  }
  
}
</style>