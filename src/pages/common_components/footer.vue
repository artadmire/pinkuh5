<template>
  <div id="footer">
      <router-link to='/'>
        <img v-if="footer.tab1" src="~@/assets/Bottom_label_icon_home_click@3x.png" alt="">
        <img v-else src="~@/assets/Bottom_label_icon_home_onclick@3x.png" alt="">
        <p :style='{color:footer.tab1?"#FF3C3A":"#737373"}'>首页</p>
      </router-link>
      <router-link to='/search' class='search'>
        <img  v-if="footer.tab2" src="~@/assets/bottom_label_icon_search_click.png" alt="">
        <img  v-else src="~@/assets/bottom_label_icon_search_unclick.png" alt="">
        <p :style='{color:footer.tab2?"#FF3C3A":"#737373"}'>搜索</p>
      </router-link>
      <router-link to='/categories' class='nianhuo'>
        <img  v-if="footer.tab3" src="~@/assets/bottom_label_icon_session_click.png" alt="">
        <img  v-else src="~@/assets/bottom_label_icon_session_unclick.png" alt="">
        <p :style='{color:footer.tab3?"#FF3C3A":"#737373"}'>专场</p>
      </router-link>
      <h3 @click="toCart">
        <img v-if="footer.tab4" src="~@/assets/Bottom_label_icon_shopping_cart_click@3x.png" alt="">
        <img v-else src="~@/assets/Bottom_label_icon_shopping_cart_onclick@3x.png" alt="">
        <p :style='{color:footer.tab4?"#FF3C3A":"#737373"}'>购物车</p>
      </h3>
  </div>
</template>
<script>
import { mapState,mapMutations} from 'vuex';
import { Toast } from "mint-ui";
export default {
  name: "Footer",
  data() {
    return {
      msg: "suolun",
      footer: {}
    };
  },
  computed: {
    ...mapState(['commonStore']),
  },
  created() {
    this.footer = this.commonStore.footerState
      ? this.commonStore.footerState
      : JSON.parse(localStorage.footerState);
  },
  methods: {
    ...mapMutations(['newRedirectUrl']),
    toCart() {
      this.axiosFun({
        config: {
          url: this.$api + "/h5/users/check_login"
        },
        deal: {
          backToLogin: true,
          backToLoginFun: () => {
            this.newRedirectUrl("/") 
            window.localStorage.redirectUrl = "/";
            this.$router.push({
              path: "./login"
            });
          }
        },
        onSuccess: res => {
          this.$router.push({
            path: "./cart"
          });
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "~@/common/css/var.scss";
#footer {
  position: fixed;
  bottom: 0;
  width: 375px;
  height: 48px;
  left: 0;
  background: white;
  display: flex;
  z-index: 99;
  width: 100%;
  border-top: 1px solid #efefef; /*no*/
  transform: translate3d(0, 0, 0);
  a,
  h3 {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding-top: 6px;
    position: relative;
    img {
      display: block;
      width: 24px;
      height: 24px;
      position: absolute;
      top: 5px;
      left: 50%;
      margin-left: -12px;
    }
    p {
      font-size: 12px;
      transform: scale(0.9);
      color: $gray;
      line-height: 20px;
      text-align: center;
      position: absolute;
      bottom: 0px;
      left: 50%;
      margin-left: -62.5px;
      width: 125px;
    }
  }
  // .nianhuo{
  //   img{
  //     width: 34px;
  //     height: 34px;
  //     top: -10px;
  //     margin-left: -17px;
  //   }
  // }
}
</style>
