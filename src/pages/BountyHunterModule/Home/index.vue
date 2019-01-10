<template>
    <mt-loadmore :top-method="loadTop" :maxDistance="hunterStore.maxDistance" ref="loadmore" :style="{position:fixedStatus}" @top-status-change="handleTopChange">
          <!-- 没有赏金不是赏金猎人 -->
          <div class="introduce" v-if='hunterType==1' >
              <!-- 顶部title -->
              <!-- <IntroduceTitle></IntroduceTitle> -->
              <!-- banner -->
              <IntroduceBanner></IntroduceBanner>
              <!-- 猎人特权 -->
              <BountyRights></BountyRights>
              <!-- 加入猎人 ￥99 -->
              <JoinHunterBtn :hunterItem='userInfo.hunterItem'></JoinHunterBtn>
              <!-- 权益的标题 -->
              <RightDesc v-if='hunterStore.bountyRightsState'  @ListenFromRightDesc='ListenFromRightDesc'></RightDesc>
              <RightContrast></RightContrast>
              <!-- <Support></Support> -->
              <BurialPoint></BurialPoint>
          </div>
          <!-- 有赏金，不是猎人 -->
          <div class="introduce" v-else-if='hunterType==2'>
            <Bountyincom ></Bountyincom>
              <div class="introduce_box_bg">
                  <!-- 顶部title -->
                  <!-- <IntroduceTitle></IntroduceTitle> -->
                  <!-- 用户信息 -->
                  <HasBountyNotHunterInfo :userInfo='userInfo' :sumCent="sumCent"></HasBountyNotHunterInfo>
                  <!-- 权益tab -->
                  <RightsList></RightsList>
              </div>
              <!-- 权益内容 -->
              <RightsContext></RightsContext>
              <!-- 加入赏金猎人的提示框 -->
              <JoinHunterDialog v-if='false'></JoinHunterDialog>
              <!-- <Support></Support> -->
              <BurialPoint></BurialPoint>
              <JoinHunterToast v-if='hunterStore.jionHunterToastStatus' ></JoinHunterToast>
          </div>
          <!-- 猎人 -->
          <div class="introduce "   v-else-if='hunterType==3'>
              <Bountyincom :showInfo="showInfo"></Bountyincom>
              <div class="introduce_box_bg" >
                    <!-- 顶部title -->
                    <!-- <IntroduceTitle></IntroduceTitle> -->
                    <!-- 用户信息 -->
                    <HunterInfo :userInfo='userInfo' :sumCent="sumCent"></HunterInfo>
                    <!-- 权益tab -->
                    <RightsList ></RightsList>
              </div>
              <!-- 权益内容 -->
              <RightsContext></RightsContext>
              <!-- <Support></Support> -->
            
          </div>
          <div slot="top" class="mint-loadmore-top">
              <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓下拉刷新</span>
              <span v-show="topStatus === 'loading'">Loading...</span>
          </div>
    </mt-loadmore>
    
</template>

<script>
import IntroduceTitle from "./components/IntroduceTitle";
import IntroduceBanner from "./components/IntroduceBanner";
import BountyRights from "../BountyCommon/BountyRights";
import JoinHunterBtn from "../BountyCommon/JoinHunterBtn";
import RightDesc from "./components/RightDesc";
import HasBountyNotHunterInfo from "./components/HasBountyNotHunterInfo";
import HunterInfo from "./components/HunterInfo";
import RightsList from "./components/RightsList";
import JoinHunterDialog from "../BountyCommon/JoinHunterDialog";
import RightsContext from "./components/RightsContext";
import RightContrast from "./components/RightContrast";
import Support from "../BountyCommon/Support";
import BurialPoint from "../BountyCommon/BurialPoint";
import JoinHunterToast from "./components/JionHunterToast";
import Bountyincom from "./components/BountyIncom";
import { mapState, mapMutations } from "vuex";
import { Loadmore } from "mint-ui";
import api from "./api.js";
import pk from "@/util/pk.js";
import loginByNative from "@/util/loginByNative.js";
export default {
  props: {},
  data() {
    return {
      userInfo: {},
      fixedStatus: "static",
      hunterType: 0,
      topStatus: "",
      showInfo:[],
      sumCent:0
      //maxDistance:0
    };
  },
  created() {
    pk.addLisenter("onShow", () => {
      console.log('onShow')
      if (this.hunterStore.noticeHunterHomeRefresh) {
        this.changeNoticeHunterHomeRefresh(false);
        this.init();
      }
      if(!window.sessionStorage.accessToken){
        this.init()
      }
    });
    
    document.title = "赏金猎人";
    this.init();
    
  },
  computed: {
    ...mapState(["hunterStore"])
  },
  methods: {
    ...mapMutations([
      "changeHunterInfo",
      "changeNoticeHunterHomeRefresh",
      "changeBountyRightsState"
    ]),
    async getHome() {
      //对gethome添加401错误处理
      let wipdata = await api.getHome({
        error(status) {
          if (status == 401) {
            sessionStorage.clear();
            window.location.reload();
          }
        }
      });

      this.changeHunterInfo(wipdata.value);
      //不是猎人
      if (wipdata.value.type == 0) {
        if (wipdata.value.incomeCent > 0) {
          this.$set(this, "hunterType", 2);
        } else {
          this.$set(this, "hunterType", 1);
        }
        //是猎人
      } else if (wipdata.value.type == 1) {
        this.$set(this, "hunterType", 3);
        this.getHunterIncom()
      }
      this.userInfo = wipdata.value;
      
    },
    async getHunterIncom(){
           let wip = await api.getHunterIncom()
         this.showInfo = wip.value.showInfo
         this.sumCent = wip.value.sumCent
         //console.log(this.showInfo,"DD")
        },
    loadTop() {
      setTimeout(() => {
        // this.$refs.loadmore.onTopLoaded();
        // location.reload();
        this.onLoadTop();
      }, 1000);
    },
    onLoadTop(){
      var $loadmore = this.$refs.loadmore
      $loadmore.topStatus = 'pull'
      $loadmore.topDropped = false
      this.$nextTick(() => {
        $loadmore.translate = 0;
        location.reload();
      })
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    init() {
      loginByNative(this.getHome, () => {}, () => {});
    },
    ListenFromRightDesc(msg) {
      this.fixedStatus = msg;
    },
    commitPerformanceEvent() {
      let nowTime = new Date().getTime();
      let duration = nowTime - global.firstLoadTime;
      pk.commitPerformanceEvent({
        eventName: "h5_performance_event",
        params: {
          url: location.href
        },
        duration: duration
      });
    }
  },
  components: {
    IntroduceTitle,
    IntroduceBanner,
    BountyRights,
    JoinHunterBtn,
    RightDesc,
    HasBountyNotHunterInfo,
    RightsList,
    JoinHunterDialog,
    RightsContext,
    HunterInfo,
    RightContrast,
    Support,
    BurialPoint,
    JoinHunterToast,
    Bountyincom
  },
  mounted() {
    
    this.$refs.loadmore.onTopLoaded();
    this.commitPerformanceEvent();
    pk.addLisenter("onHide", () => {
      this.changeBountyRightsState(false);
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.introduce {
  width: 375px;
  background: #f7f8fa;
  .introduce_box_bg {
    // background: $HunterBgColor;
    background: linear-gradient(right bottom, #202020, #313131);
  }
}
</style>

