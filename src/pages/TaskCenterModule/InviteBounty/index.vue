<template>
  <div class="invitebounty">
    <div class="m-invite">
      <!-- <h2 >爆好货猎人邀请</h2> -->
      <div class="middle">
        <Invitationinfo :imgUrl="imgUrl" :nick="nick" ></Invitationinfo>
        <em>邀请您成为&nbsp;<i>爆好货</i>赏金猎人</em>      
      </div> 
    </div>
    <Telvetify text="立即加入 赚取赏金" class="invitebottom" :invitationCode="invitationCode" :source="source"></Telvetify>
  </div>
    
</template>
<script>
import Telvetify from "@/pages/TaskCenterModule/common-components/Telvetify";
import Invitationinfo from "@/pages/TaskCenterModule/common-components/Invitationinfo";
import api from "../api.js";
import { mapObj } from "@/util"
export default {
  name: "Invitebounty",
  components: { Telvetify, Invitationinfo },
  data() {
    return {
      nick: "",
      imgUrl: require("@/assets/usercenter_avatar_default.png"),//设置一个默认值
      invitationCode:'',
      source:2
    };
  },
  created() {
    document.title = "爆好货红包邀请"
    var Url = window.location.href
    //search = "?invitationCode=7ZTJ3H"
    var obj = mapObj(Url)
    //console.log(obj)
    this.invitationCode = obj.invitationCode
    this.getInvitedinfo(this.invitationCode);
  },
  mounted() {},
  methods: {
    async getInvitedinfo(invitedCode) {
      let wipdata = await api.getInvitedinfo(invitedCode);
      this.nick = wipdata.value.nick;
      console.log(wipdata);
      //  let wipdata = {
      //     "succ": true,
      //     "errorCode": null,
      //     "value": {
      //         "avatar": "https://img-daily.pinkumall.com/19323a6c_38e0_42af_ab82_55531033fe72.png",
      //         "nick": "Breezyee"
      //     }
      // }
      if (wipdata.value.avatar != null || wipdata.value.avatar) {
        this.imgUrl = wipdata.value.avatar+"@!800";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.invitebounty {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #0d0d0d;
  .m-invite {
    margin: 0 auto;
    width: 375px;
    height: 100%;
    background-image: url("../../../assets/invitation_bg_vip_pic_h5.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    padding-top: 64px;
    h2 {
      width: 100%;
      height: 44px;
      line-height: 44px;
      color: #ffffff;
      font-size: 18px;
      text-align: center;
      margin-bottom: 24px;
    }
    .middle {
      width: 300px;
      height: 400px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 auto;
      background-image: url("../../../assets/invitation_vip_packet_pic_h5.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      box-sizing: border-box;
      padding-top:28px;
      em {
        display: block;
        width: 203px;
        color: #fddca1;
        text-align: center;
        line-height: 24px;
        overflow: auto;
        font-size: 14px;
      }
      i {
        color: #ff3c3a;
        font-size: 14px;
        line-height: 24px;
      }
    }
  }
}
.invitebottom {
    .bottom {
      height: 171px !important;
    }
  }
</style>
