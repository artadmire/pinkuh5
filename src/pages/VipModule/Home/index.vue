<template>
  <div>
    <!-- 不是黑卡会员 -->
    <div class="introduce" v-if='vipType == -1'>
      <div class="blackintroduce_bg">
        <JoinvipBtn class="joinvipBtn" :vipItems="userInfo"></JoinvipBtn>
      </div>
      <vipGoods></vipGoods>
    </div>
    <!-- 是黑卡会员 -->
    <div class="introduce" v-else-if='vipType == 1'>
      <div class="introduce_box_bg">
        <vipInfo :userInfo="userInfo" ></vipInfo>
        <CashBackGoodscategories></CashBackGoodscategories>
      </div>
    </div>
  </div>
</template>

<script>
  import JoinvipBtn from "./components/JoinVipBtn"
  import vipGoods from "./components/VipGoods"
  import vipInfo from "./components/VipInfo"
  import CashBackGoodscategories from "./components/CashBackGoodsCategories"
  import CashBackGoods from "./components/CashBackGoods"
  import { mapState, mapMutations } from "vuex";
  import { Loadmore } from 'mint-ui';
  import api from "./api.js";
  import pk from "@/util/pk.js";
  import loginByNative from '@/util/loginByNative.js'
  export default {
    props: {},
    data() {
      return {
        vipType: 0,
        userInfo: {},
        goodslist:[]
      };
    },
    created() {
      //this.getHome()
      pk.addLisenter('onShow', () => {
        if (this.vipStore.noticevipHomeRefresh) {
          this.changeNoticevipHomeRefresh(false)
          this.init();
        }
      })
      document.title = '黑卡会员';
      this.init();
    },
    computed: {
      ...mapState(["vipStore"])
    },
    methods: {
      ...mapMutations(["changevipInfo", 'changeNoticevipHomeRefresh', 'changevipRightsState','changeBountyRightsState']),
      async getHome() {
        //对gethome添加401错误处理
        var wipdata = await api.getHome();
        console.log(wipdata)
        if (wipdata.succ) {
          this.changevipInfo(wipdata.value);
          this.vipType = wipdata.value.type
          this.userInfo = wipdata.value;
        }
  
  
      },
      
      init() {
        loginByNative(
          this.getHome,
          () => {},
          () => {
            pk.navigateBack();
          }
        );
      },
      // ListenFromRightDesc(msg) {
      //   this.fixedStatus = msg;
      // },
      commitPerformanceEvent() {
        let nowTime = new Date().getTime();
        let duration = nowTime - global.firstLoadTime;
        pk.commitPerformanceEvent({
            eventName: 'h5_performance_event',
            params: {
              url: location.href
            },
            duration: duration
          },
  
        )
      },
    },
    components: {
      JoinvipBtn,
      vipInfo,
      vipGoods,
      CashBackGoodscategories,
      CashBackGoods
      
    },
    mounted() {
      // this.commitPerformanceEvent();
      pk.addLisenter('onHide', () => {
        this.changeBountyRightsState(false)
      })
      pk.addLisenter('logout', () => {
        sessionStorage.clear();
      })
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  @import "~@/common/css/var.scss";
  .introduce {
    width: 100%;
    background: #f7f8fa;
    .blackintroduce_bg {
      width: 100%;
      height: 562px;
      background: url(../../../assets/vip_home_bg_pic_h5.jpg) no-repeat left top/cover;
      overflow: hidden;
    }
    .introduce_box_bg {
      // background: $HunterBgColor;
      background: linear-gradient(right bottom, #202020, #313131);
    }
    .joinvipBtn{
      margin-top:500px;
    }
  }
  
</style>
