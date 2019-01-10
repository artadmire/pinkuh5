<template>
  <div class="scheme" >
    <div class="List" v-for="(item,index) in data" :key='index'>
      <div class="banner" v-if='item.type=="BANNER"'>
        <SchemeSimple :url='item.url' :img='item.img' :urlPrefix='imgurl' size='@!1200'></SchemeSimple>
      </div>
      <div class="itemList" v-else-if="item.type=='ITEM_LIST'" v-for='(itit,index) in item.items' :key='index'>
        <SchemeSimple :url='itit.url' :img="itit.img" :urlPrefix='imgurl' size='@!800'></SchemeSimple>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name: "scheme",
  props: ["blocks"],
  data() {
    return {
      msg: "scheme",
      imgurl: "",
      data: ""
    };
  },
  computed: {
    ...mapState(['commonStore'])

  },
  created() {
    this.imgurl = this.commonStore.imgUrlPrefix
      ? this.commonStore.imgUrlPrefix
      : localStorage.imgUrlPrefix;
    this.$watch("blocks", (newVal, oldval) => {
      this.data = newVal;
      console.log(this.data);
    });
  },
  methods: {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.scheme {
  .List {
    display: flex;
    flex-wrap: wrap;
    .banner {
      display: flex;
      width: 100%;
      a {
        flex: 1;
        img {
          width: 100%;
          display: block;
        }
      }
    }
    .itemList {
      width: 50%;
      img {
        width: 100%;
        display: block;
      }
    }
  }
}
</style>
