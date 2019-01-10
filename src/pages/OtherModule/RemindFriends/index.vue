<template>
  <div class="invitefriends">
    <img class="invitefriends_bg" src="~@/assets/invitation_bg_red_pic_h5@3x.jpg" alt="">
    <div class="m-invite">
      <h2 >领红包</h2>
      <form class="middle">
        <Invitationinfo :imgUrl="imgUrl" :nick="nick" cash="cash"></Invitationinfo>
      </form> 
      <List :buyerIncomeList='buyerIncomeList'/>
      <a href="" class="downloads" ref="downloads">立即下载去赚钱</a>
    </div>
    
  </div> 
</template>

<script>

import Invitationinfo from "./components/invitationinfo";
import List from './components/List'
import api from "../api.js";
import { mapObj } from "@/util";
import { Godownload } from "@/util";
export default {
  name: "Invitefriends",
  components: { Invitationinfo,List },
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
    var obj = mapObj(Url);
    console.log(obj);
    this.invitationCode = obj.invitationCode;
    this.getReminderinfo(this.invitationCode);
  },
  mounted(){
    let Aitem = this.$refs.downloads
   
    Godownload(Aitem)
  },
  methods: {
    async getReminderinfo(invitedcode) {
      let wipdata = await api.getReminderinfo(invitedcode);
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
  .downloads{
     display: block;
      margin:0 auto;
      height:36px;
      width:260px; 
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
      position: absolute;
      bottom:50px;
      left:50%;
      margin-left: -130px;
      //margin-top:20px;
  }
  .invitefriends_bg {
    width: 600px;
    position: fixed;
    top: -40px;
    left: 50%;
    margin-left: -300px;
  }
  .m-invite {
    position: relative;
    z-index: 9;
    height: 100%;
    .middle {
      margin-top:180px;
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
      //margin-top:10px;
    }
  }
  
    
}
</style>
