<template>
  <div class="invitedownload">
     <img class="invitefriends_bg" src="~@/assets/invitation_open_bg_red_pic_h5@3x.jpg" alt="">
    <div class="w-common">
      <!-- <h2>爆好货红包邀请</h2> -->
    </div>
    <div class='bottom' ref="bottom">
      <span></span>
       <a href="" ref="download">立即下载App</a>
       <!-- @click='Vetify' :class="{active:flag}" -->
    </div>
  </div>
</template>

<script>
import { Godownload } from "@/util";
export default {
  name: "Invitedownload",
  data() {
    return {
      
    };
  },
  created() {
    document.title = "边逛边赚就在爆好货"
  },
  mounted(){
    var Aitem = this.$refs.download
   // var Fatheritem = this.$refs.bottom
    //console.log(obj)
    Godownload(Aitem)
  },
  methods: {

  },  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
// @import "~@/common/css/commontitle.scss";
.invitedownload {
  display: flex;
  flex-direction: column;
  width:100%;
  height:100%;
   .invitefriends_bg {
    width: 600px;
    position: fixed;
    top: -64px;
    left: 50%;
    margin-left: -300px;
  }
  
  .bottom {
    position: fixed;
    top: 480px;
    z-index: 200;
    width: 100%;
    // height:237px;

    span {
      margin:0 auto;
      width:291px; 
      // height:89px;
      display: block;
      margin-bottom:26px; 
      margin-top:25px;
      
    }
    >a {
      display: block;
      margin:0 auto;
      height:36px;
      width:70%; 
      line-height: 36px;
      text-align: center;
      border-radius: 4px;
      box-sizing: border-box;
      font-size:18px;
      background: -webkit-linear-gradient(top, #FFD9B3 , #FFC456); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(top, #FFD9B3 , #FFC456); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(top, #FFD9B3 , #FFC456); /* Firefox 3.6 - 15 */
      background: linear-gradient(to bottom, #FFD9B3 , #FFC456); /* 标准的语法 */
      color:#98470C; 
      margin-top:20px;
    }
  }
}
</style>
