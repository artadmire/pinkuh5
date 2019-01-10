<template>
  <div class="invitefriends">
    <img class="invitefriends_bg" src="~@/assets/invitation_bg_red_pic_h5@3x.jpg" alt="">
    <div class="m-invite">
      <!-- <h2 >爆好货红包邀请</h2> -->
      <form class="middle">
        <Invitationinfo :imgUrl="imgUrl" :nick="nick" cash="cash"></Invitationinfo>
        <!-- <em>邀请您领取8元现金红包 <img src="../../../assets/invitation_tag_pic_h5.png" alt=""></em>         -->
      </form> 
      <List :buyerIncomeList='buyerIncomeList'/>
    </div>
    <Telvetify text="立即领取" class="invitebottom" :source="source" :invitationCode="invitationCode" ></Telvetify>
  </div>
    
</template>

<script>
import Telvetify from "@/pages/TaskCenterModule/common-components/Telvetify";
import Invitationinfo from "./components/invitationinfo";
import List from './components/List'
import api from "../api.js";
import { mapObj } from "@/util";
export default {
  name: "Invitefriends",
  components: { Telvetify, Invitationinfo,List },
  data() {
    return {
      nick: "",
      imgUrl: require("@/assets/usercenter_avatar_default.png"), //设置一个默认值
      invitationCode: "",
      source: 1,
      cash:true,
      buyerIncomeList:[]
    };
  },
  created() {
    document.title = "爆好货红包邀请";
    console.log(window.location.href);
    let Url = window.location.href;
    
    //var Url = "https://daily.pinkumall.com/h5?from=groupmessage#/invitefriends?invitationCode=BJJJ3F"
    //  let arr = Url.split("?")
    //  var str= arr[arr.length-1]
    //  arr = str.split("=")
    //  var obj = {}
    //  obj[arr[0]] = arr[1]
    //  console.log(obj)
    //  console.log(arr)
    //search = "?invitationCode=7ZTJ3H"
    var obj = mapObj(Url);
    console.log(obj);
    this.invitationCode = obj.invitationCode;
    this.getInvitedinfo(this.invitationCode);
  },
  methods: {
    async getInvitedinfo(invitedcode) {
      let wipdata = await api.getInvitedinfo(invitedcode);
      this.nick = wipdata.value.nick;
      this.buyerIncomeList = wipdata.value.buyerIncomeList;
      if (wipdata.value.avatar != null || wipdata.value.avatar) {
        this.imgUrl = wipdata.value.avatar + "@!800";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
@import "~@/common/css/var.scss";
.invitefriends {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .invitefriends_bg {
    width: 600px;
    position: fixed;
    top: -64px;
    left: 50%;
    margin-left: -300px;
  }
  .m-invite {
    position: relative;
    z-index: 9;
    height: 100%;
    .middle {
      margin-top:190px;
      em {
        display: block;
        width: 100%;
        color: #fddca1;
        text-align: center;
        line-height: 24px;
        margin:0 auto;
        //overflow: auto;
        font-size: 20px;
        margin-top:10px;
        position: relative;
        img {
          position: absolute;
          top:-25px;
          left:280px;
          z-index: 2000;
          width:52px;
          height:25px;
        }
      }
    }
    h2 {
      width: 100%;
      height: 44px;
      line-height: 44px;
      color: #ffffff;
      //color: black;
      font-size: 18px;
      text-align: center;
      margin-bottom: 24px;
    }
  }
  .invitebottom {
      .bottom {
        height: 171px !important;
        >input {
          margin-top: 50px !important;
        }
      }
    }
}
</style>
