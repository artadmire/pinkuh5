<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
import axios from "axios";
import pk from '@/util/pk.js'
import wechatPublicShare from '@/util/wechatPublicShare'
export default {
  name: "app",
  data() {
    return {};
  },
  mounted() {
      wechatPublicShare({
        url:location.href.split('#')[0],
        share:{
          link:location.href
        }
      })
      pk.addLisenter('logout',()=>{
          sessionStorage.clear();
      })
  },
//    errorCaptured (err, vm, info) {
//   this.error = `${err.stack}\n\nfound in ${info} of component`
//   return false
//  },
  
};
</script>

<style lang='scss'>
  @import "./common/css/reset.scss";
  #app{
    height: 100%;;
  }
</style>
