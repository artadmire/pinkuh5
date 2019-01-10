<template>
  	<router-link v-if='class_type=="index"&&ishave_url'  to='./'>
  		<img v-lazy="urlPrefix+img+size" alt="" >
      <p v-if='title'>{{title}}</p>
  	</router-link>
  	<router-link v-else-if='class_type=="yearGoods"&&ishave_url' to='./yearGoods'>
  		<img v-lazy="urlPrefix+img+size" alt="" >
      <p v-if='title'>{{title}}</p>
  	</router-link>
    <router-link v-else-if='class_type=="flow"&&ishave_url' to='./flow'>
      <img v-lazy="urlPrefix+img+size" alt="" >
      <p v-if='title'>{{title}}</p>
    </router-link>
  	<router-link v-else-if='class_type=="item"&&ishave_url' :to='{path:"./detail",query:{id:id}}'>
  		<img v-lazy="urlPrefix+img+size" alt="" >
      <p v-if='title'>{{title}}</p>
  	</router-link>
  	<router-link v-else-if='class_type=="session"&&ishave_url' :to='{path:"./special",query:{sessionId:id}}'>
  		<img v-lazy="urlPrefix+img+size" alt="" >
      <p v-if='title'>{{title}}</p>
  	</router-link>
  	<router-link v-else-if='class_type=="huodong"&&ishave_url' :to='{path:"./active",query:{id:id}}'>
  		<img v-lazy="urlPrefix+img+size" alt="" >
      <p v-if='title'>{{title}}</p>
  	</router-link>
    <router-link v-else-if='class_type=="easy_payment"&&ishave_url' to='./easy-paymentList'>
      <img v-lazy="urlPrefix+img+size" alt="" >
      <p v-if='title'>{{title}}</p>
    </router-link>
     <router-link v-else-if='class_type=="collage_shopping"&&ishave_url' to='./pintuan'>
      <img v-lazy="urlPrefix+img+size" alt="" >
      <p v-if='title'>{{title}}</p>
    </router-link>
    <router-link v-else-if='class_type=="huodongV2"&&ishave_url' :to='{path:"./newActive",query:{id:id}}'>
  		<img v-lazy="urlPrefix+img+size" alt="" >
      <p v-if='title'>{{title}}</p>
  	</router-link>
    <router-link v-else-if='class_type=="categories"&&ishave_url' :to='{path:"./categories",query:{id:id?id:null}}'>
  		<img v-lazy="urlPrefix+img+size" alt="" >
      <p v-if='title'>{{title}}</p>
  	</router-link>
    <a v-else-if="class_type=='notSupport'&&ishave_url" href='https://static.pinkumall.com/app/download.html'>
  		<img v-lazy="urlPrefix+img+size" alt="" >
      <p v-if='title'>{{title}}</p>
  	</a>
  	<a v-else-if="class_type=='other'&&ishave_url" v-bind:href='id'>
  		<img v-lazy="urlPrefix+img+size" alt="" >
      <p v-if='title'>{{title}}</p>
  	</a>
    <a v-else href="javascript:;">
      <img v-lazy="urlPrefix+img+size" alt=""  >
      <p v-if='title'>{{title}}</p>
    </a>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "Download",
  data() {
    return {
      class_type: "",
      id: "",
      ishave_url: true,
    };
  },
  props: ["url", "urlPrefix", "img", "size",'title'],
  watch:{
     url(newValue, oldValue){
        this.updata();
     }
  },
  created() {
    this.updata();
  },
  methods:{
    updata(){
      this.$nextTick(()=>{
        if (this.url) {
          if (this.url.indexOf("pinkumall://default/mall_home") != -1) {
            //首页
            this.class_type = "index";
          } else if (this.url.indexOf("pinkumall://default/huodong_home") != -1) {
            //活动首页
            this.class_type = "yearGoods";
          } else if (this.url.indexOf("pinkumall://default/flux_recharge") != -1) {
            //活动首页
            this.class_type = "flow";
          } else if (this.url.indexOf("pinkumall://default/item_detail") != -1) {
            //商品详情页
            this.id = this.url.split("?item_id=")[1];
            this.class_type = "item";
          } else if (this.url.indexOf("pinkumall://default/session_detail") != -1) {
            //专场详情页
            this.id = this.url.split("?session_id=")[1];
            this.class_type = "session";
          } else if (this.url.indexOf("pinkumall://default/huodong_detail") != -1 && this.url.indexOf("pinkumall://default/huodong_detail_v2") == -1 ) {
            //活动详情页
            this.id = this.url.split("?huodong_id=")[1];
            this.class_type = "huodong";
          } else if (this.url.indexOf("pinkumall://default/easy_payment") != -1) {
            //分期购商品列表页
            this.class_type = "easy_payment";
          } else if (this.url.indexOf("pinkumall://default/huodong_detail_v2") != -1) {
            //V2活动详情页
            this.id = this.url.split("?huodong_id=")[1];
            this.class_type = "huodongV2";
          } else if(this.url.indexOf("pinkumall://default/collage_shopping") != -1){
              //拼团商品列表页
              this.class_type = 'collage_shopping'
          } else if (this.url.indexOf("pinkumall://default/categories") != -1 ) {
            //分类页面，默认分类
            this.id = this.url.split("?category_id=")[1];
            this.class_type = "categories";
          }else if (this.url.indexOf("pinkumall://default/") != -1 || this.url.indexOf('vip') != -1) {
            //不支持的 scheme
            this.class_type = 'notSupport';
          } else {
            //其他
            this.id = this.url;
            this.class_type = "other";
          }
        } else {
          this.ishave_url = false;
        }
      })
        
    },
    // notSupport(){
      // let instance = Toast("下载APP,享受更多优惠");
      //   setTimeout(() => {
      //     instance.close();
      //   }, 2000);
      //   return;

    // }
  },
  mounted () {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
img {
  display: block;
  width: 100%;
  object-fit: cover;
}
</style>
