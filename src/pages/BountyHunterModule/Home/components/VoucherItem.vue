<template>
     <li>
        <div :class="{immediatelyUse:currentindex==index || itemInfo.status == 1}">
           <div class="list_li_left">
                <div><span>￥</span>{{itemInfo.discountCent |parseIntValue}}</div>
                <p>满{{ itemInfo.thresholdCent |parseIntValue}}元可用</p>
            </div>
            <div class="list_li_center">
                <div>
                    <span>购物券</span>
                    <span>{{ itemInfo.name }}</span>
                </div>
                <p>{{ itemInfo.rules }}</p>
                <aside>
                    <span>{{ itemInfo.beginTime |time}}-{{itemInfo.endTime |time}}</span>
                   <p v-if="currentindex==index || itemInfo.status == 1" style="background:#FFADAD">已领取</p>
                    <p  @click="changStatus(index,itemInfo.couponPackageId)" v-else-if=" itemInfo.status == 2">立即领取</p>  
                </aside>
            </div>
        </div>
        <p v-if="itemInfo.pic"> <img @click="schema" v-lazy="imgUrl+itemInfo.pic+'@!800'" alt=""></p>
    </li>
</template>

<script>
import pk from "@/util/pk.js";
import { mapState, mapMutations } from "vuex";
import api from "../api";
export default {
  props: {
    itemInfo: {
      type: Object,
      default: {}
    },
    index: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      currentindex: -1,
      imgUrl: ""
    };
  },
  created() {
    this.imgUrl = this.imgUrlPrefix
      ? this.imgUrlPrefix
      : localStorage.imgUrlPrefix;
  },
  computed: {
    ...mapState(["hunterStore"])
  },
  methods: {
    ...mapMutations(["changeJionHunterToastStatus"]),
    changStatus(index, id) {
      this.currentindex = index;
      console.log(223);
      this.fetchHunterPacakge(id);
    },
    schema() {
      pk.navigateTo({
        url: this.itemInfo.targetUrl
      });
    },
    async fetchHunterPacakge(id) {
      if (this.hunterStore.hunterInfo.type == 2) {
        this.changeJionHunterToastStatus(true);
      } else {
        console.log(444);
        let wipdata = await api.getFetchHunterPacakge(id);
        if (wipdata.succ) {
          console.log(wipdata);
        } else {
          if (wipdata.errorCode.code == 2701) {
            this.$router.push({
              path: "./payhunter"
            });
          }
        }
      }
    }
  },
  mounted() {},
  filters: {
    parseIntValue(value) {
      return parseInt(value / 100);
    },
    time(val) {
      return val.split(" ")[0].replace(/-/g, ".");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
li {
  width: 100%;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 10px;
  box-shadow: 0 8px 16px 0 #dee1e7;
  > p {
    // height:200px;
    box-sizing: border-box;
    border-radius: 6px;
    margin-top: 10px;
    overflow: hidden;
    width: 335px;
    > img {
      display: block;
      width: 335px;
      height: 200px;
      box-sizing: border-box;
      object-fit: cover;
    }
  }

  > div {
    height: 120px;
    display: flex;
    border-radius: 6px;
    box-shadow: 0 0 8px 0 #dee1e7;
    .list_li_left {
      //background: #ff3c3a;
      background: url("~@/assets/wallet_exchange_coupons_red_pic.png")
        center/93px 120px;
      border-radius: 6px 0 0 6px;

      width: 96px;
      display: flex;
      flex-direction: column;
      // justify-content: center;
      align-items: center;
      > div {
        color: #ffffff;
        font-size: 28px;
        font-weight: bold;
        margin-top: 33px;
        margin-bottom: 22px;
        span {
          font-size: 14px;
          margin-right: 5px;
        }
      }
      p {
        color: #ffffff;
        font-size: 12px;
      }
    }
    .list_li_center {
      //flex: 1;
      padding: 15px 10px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      box-sizing: border-box;
      > div {
        display: flex;
        flex-direction: row;
        height: 16px;
        span:first-child {
          display: inline-block;
          width: 45px;
          height: 16px;
          line-height: 16px;
          background: #ff3c3a;
          border-radius: 3px;
          text-align: center;
          font-size: 12px;
          color: white;
          transform: scale(0.9);
          margin-right: 5px;
        }
        span:last-child {
          display: inline-block;
          font-size: 14px;
          line-height: 16px;
          width: 168px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      p {
        font-size: 11px;
        line-height: 13px;
        color: #b2b2b2;
        height: 26px;
        width: 224px;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
      aside {
        width: 224px;
        display: flex;
        height: 24px;
        //align-items: space-between;
        justify-content: space-between;
        span {
          color: #99a1b2;
          font-size: 11px;
          margin-top: 13px;
          line-height: 12px;
        }
        p {
          width: 72px;
          height: 24px;
          color: #ffffff;
          font-size: 12px;
          line-height: 24px;
          text-align: center;
          background: #ff3c3a;
          border-radius: 4px;
        }
      }
    }
  }

  .immediatelyUse {
    background: url("~@/assets/h5_coupons_empty_pic.png") no-repeat 250px -30px /100px,
      100px;
  }
}
</style>
