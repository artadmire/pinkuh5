<template>
  <div class="winning">
    <p><img src="~@/assets/the_list_of_winner_top_pic.jpg" alt=""><span>第{{ winningInfo.field }}期</span></p>
    <span>本期开奖时间：{{ winningInfo.openingTime }}</span>
    <div class="recoder" v-if="winningInfo.myWinningResults">
      <h3><p></p>我的中奖记录</h3>
      <ul>
        <Mywinning v-if="winningInfo.myWinningResults" class="recoderItem" :myWinningResults = "winningInfo.myWinningResults"></Mywinning>
      </ul>
    </div>
    <div class="result" v-if="winningInfo.winningResults.length>0">
      <h3><p></p>一等奖中奖结果</h3>
      <ul>
        <Win v-for="(item,index) in winningInfo.winningResults" :key="index" :iteminfo="item" ></Win>
      </ul>
    </div>
    <div class="back">
      <p @click="goBack">返回本期一份抽</p>
    </div>
  </div>
</template>

<script>
import { Godownload } from "@/util";
import Mywinning from "./components/myWinning"
import Win from "./components/win"
import api from "../api.js";
import pk from "@/util/pk.js";
import loginByNative from '@/util/loginByNative.js'

export default {
  
  name: "Winningpage",
  data() {
    
    return {
      centDrawId:-1,
     urlObj:{},
     winningInfo:{
       "openingTime": "",
        "field":"",
        "myWinningResults": null,
        "winningResults": []
     }
    };
  },
  created() {
  
   let  search = window.location.search
   if(search!="") {
     let arr = search.substr(1).split("=")
     for(let i=0;i<arr.length;i++){
       this.urlObj[arr[i]] = arr[i+1]
     }
   }
   if(this.urlObj.centDrawId) {
     this.centDrawId = this.urlObj.centDrawId
   }
   this.init(this.centDrawId)
  },
  mounted () {
    
  },
  methods: {
     init(id) {
        loginByNative(
          this.getWinninginfo.bind(this,id),
          () => {},
          () => {
            pk.navigateBack();
          },
          id
        )
      },
      goBack(){
        if(this.urlObj.back){
          pk.navigateBack()
        }else {
         
          pk.navigateTo(
              {
                url:"pinkumall://default/onecent_lottery"
              }
          )
        }
      },
    async getWinninginfo(id) {
      let wipdata = await api.getWinninginfo(id);
      if(wipdata.succ) {
        this.winningInfo = wipdata.value
        console.log(this.winningInfo )
      }
    }
  },
  components:{
    Mywinning,Win
  }
 
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
@import "~@/common/css/var.scss";
// @import "~@/common/css/commontitle.scss";
.winning {
  width:100%;
  height:100%;
  background: #F7F8FA;
  >p {
    width:100%;
    height:333px;
    background: #DEE1E7;
    position: relative;
    img {
      width:100%;
      height:100%;
    }
    span {
      width:97px;
      height:19px;
      color: #FFFFFF;
      font-family: FZY4K--GBK1;
      display: block;
      background: #FFC456;
      line-height: 19px;
      text-align: center;
      border-top-right-radius:20px;
      border-bottom-right-radius:20px;
      position: absolute;
      left:0;
      top:10px;
    }
  }
  >span {
    display: inline-block;
    text-align: center;
    width:100%;
    margin:5px 0 10px 0;
  }
  h3 {
    height:44px;
    line-height: 44px;
    padding:0 20px;
    display: flex;
    align-items: center;
   // text-align: center;
    font-size:16px;
    p {
      width: 4px;
      height:14px;
      background: black;
      margin-right: 6px;
    }
  }
  .result {
    background: #F7F8FA;
  }
  ul {
    padding: 0 16px;
  }
  // .recoder {
  //   // h3 {
  //   //   color: #FF3C3A;
  //   // }
  //   ul{
  //   .recoderItem {
  //       div{
  //         &>span{
  //           color:#FF3C3A;
  //         }
  //       }
  //     }
  //   }
    
  // }
  .back {
    width:100%;
    height: 154px;
    
    background: url("~@/assets/the_list_of_winner_bottom_pic.jpg") no-repeat center/cover;
      //@debugmargin-top:99px;;
      // position: fixed;
      // bottom: 0;
      // left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    // span {
    //   display: block;
    //   height:44px;
    //   line-height: 20px;
    //   font-size: 16px;
    //   color: #FFFFFF;
    //   text-align: center;
    //   margin:30px 0 24px 0;
    // }
    p{
      width:220px;
      height:32px;
      line-height: 32px;
      border-radius: 4px;
      font-size: 14px;
      color: #98470C;
      text-align: center;
      background: linear-gradient(top, #FFD9B3, #FFC456);
      margin-top:99px;
    }
  }
}
</style>