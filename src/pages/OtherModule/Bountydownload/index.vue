<template>
  <div class="bountydownload">
     <div class="w-common">
       <h2>爆好货猎人邀请</h2>
    </div>
    <div class='bottom' ref="bottom">
      <span></span>
       <a href="" ref="download" >下载App&nbsp;即刻享有更多权益</a>
       <!-- @click='Vetify' :class="{active:flag}" -->
    </div>
  </div>
</template>

<script>
import { Godownload } from "@/util";
//import func from './vue-temp/vue-editor-bridge';
export default {
  name: "Bountydownload",
  data() {
    return {
      flag:false
    };
  },
  created() {
    
  },
  mounted () {
    var Aitem = this.$refs.download
    //var Fatheritem = this.$refs.bottom
    //console.log(obj)
    Godownload(Aitem)
    // let that = this
    // setInterval(()=>{
    //   console.log(1)
    //   that.flag = !that.flag
    // },500z)
  },
  methods: {
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
// @import "~@/common/css/commontitle.scss";
.bountydownload {
  display: flex;
  flex-direction: column;
  width:100%;
  height:100%;
  background:#0D0D0D;
   .w-common {
     margin:0 auto;
     width:375px;
     height:100%;
     background-image:  url("~@/assets/invitation_open_bg_vip_black_pic_h5.jpg" );
     background-repeat:no-repeat;
     background-position: center;
     background-size:cover;
   h2 {
     width: 100%;
     height: 44px;
     line-height: 44px;
     color:#FFFFFF;
     font-size: 18px;
     text-align: center;
     border-bottom: 0;
    
   }
  }
  .bottom {
    position: fixed;
    bottom: 0;
    z-index: 200;
    width: 100%;
    height:237px;
    background-image: url("../../../assets/invitation_bg_vip_bottom_pic_h5.png");
    background-repeat: no-repeat; 
    background-size:  cover;
    a {
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
      margin-top: 100px;
    }
    // .middle {
    //   width:72%;
    //   height:38px;
    //   line-height: 38px;
    // }
  }
}
</style>
