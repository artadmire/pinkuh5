<template>
  <div class="commonproblem">
   <h2>新手问题</h2>
   <div @click="changeState(1)"> 
     <span>1) 爆好货是什么？</span><img src="../../../assets/arrow_right_16_icon1.png" alt="" v-if="!(currentIndex==1)"><img src="../../../assets/arrow_right_16_icon2.png" alt="" v-else-if="currentIndex==1">
   </div>
   <p v-if="currentIndex==1">爆好货以移动应用为载体，致力于建设成一个好玩好逛，品质有保障，更高性价比的购物平台。</p>
   <div @click="changeState(2)"> 
     <span>2) 爆好货为什么奖励您？</span><img src="../../../assets/arrow_right_16_icon1.png" alt="" v-if="!(currentIndex==2)"><img src="../../../assets/arrow_right_16_icon2.png" alt="" v-else-if="currentIndex==2">
   </div>
   <p v-if="currentIndex==2">我们希望我们的奖励能够帮您更深入的了解网上购物，提升您的生活品质。在您逛的过程中，我们会给予一定的奖励，金币将于次日自动结算至您的零钱账户，以方便您提现。</p>
   <div @click="changeState(3)"> 
     <span>3) 邀请好友有什么好处？<img src="../../../assets/a_page_hot_tab_iocn.png" alt=""> </span><img src="../../../assets/arrow_right_16_icon1.png" alt="" v-if="!(currentIndex==3)"><img src="../../../assets/arrow_right_16_icon2.png" alt="" v-else-if="currentIndex==3">
     
   </div>
   <p v-if="currentIndex==3">邀请好友将帮助您赚到更多的钱，现在每邀请一位好友可获得10元现金奖励，可提现。（奖励将根据好友在平台的行为分步发放）</p>
  <h2>金币问题</h2>
   <div @click="changeState(4)">
     <span>1) 金币是什么？</span><img src="../../../assets/arrow_right_16_icon1.png" alt="" v-if="!(currentIndex==4)"><img src="../../../assets/arrow_right_16_icon2.png" alt="" v-else-if="currentIndex==4">
   </div>
   <p v-if="currentIndex==4">金币是爆好货平台的货币单位，当天所赚取的金币将在次日凌晨自动转换为零钱（人民币），计入您的爆好货账户。</p>
   <div @click="changeState(5)"> 
     <span>2) 1金币等于多少人民币</span><img src="../../../assets/arrow_right_16_icon1.png" alt="" v-if="!(currentIndex==5)"><img src="../../../assets/arrow_right_16_icon2.png" alt="" v-else-if="currentIndex==5">
   </div>
   <p v-if="currentIndex==5">1金币等于多少人民币并不固定，通常情况爆好货的收益越高，金币价值越高，具体以次日转换为准！</p>
   <div @click="changeState(6)"> 
     <span>3) 金币如何换算成零钱？<img src="../../../assets/a_page_hot_tab_iocn.png" alt=""></span><img src="../../../assets/arrow_right_16_icon1.png" alt="" v-if="!(currentIndex==6)"><img src="../../../assets/arrow_right_16_icon2.png" alt="" v-else-if="currentIndex==6">
   </div>
   <p v-if="currentIndex==6">零钱=昨日金币*昨日汇率。昨日汇率与昨日平台收益有关，因每天金币总数和平台收益都不一样，汇率也会上下浮动。</p>
   <h2>邀请好友</h2>
   <div @click="changeState(7)"> 
     <span>1) 如何邀请好友？<img src="../../../assets/a_page_hot_tab_iocn.png" alt=""></span><img src="../../../assets/arrow_right_16_icon1.png" alt="" v-if="!(currentIndex==7)"><img src="../../../assets/arrow_right_16_icon2.png" alt="" v-else-if="currentIndex==7">
   </div>
   <aside v-if="currentIndex==7">
     <img src="../../../assets/invitefriends__01.jpg" alt="">
     <img src="../../../assets/invitefriends__02.jpg" alt="">
     <img src="../../../assets/invitefriends__03.jpg" alt="">
   </aside>
   <div @click="changeState(8)"> 
     <span>2) 如何安装爆好货？<img src="../../../assets/a_page_hot_tab_iocn.png" alt=""></span><img src="../../../assets/arrow_right_16_icon1.png" alt="" v-if="!(currentIndex==8)"><img src="../../../assets/arrow_right_16_icon2.png" alt="" v-else-if="currentIndex==8">
   </div>
   <!-- <p  class="anzhuang" v-if="currentIndex==8"> -->
     <!-- <em>
       <router-link  to="/IOS"   ref="IOS" tag="a">苹果如何安装爆好货? </router-link>
      <img src="../../../assets/a_page_link_icon.png" alt="" @click="copy('IOS')">
     </em>

     <em>
      <router-link to="/android" tag="a" ref="android">安卓如何安装爆好货?</router-link>
      <img src="../../../assets/a_page_link_icon.png" alt="" @click="copy('android')">
     </em> -->
   <!-- </p> -->
   <aside v-if="currentIndex==8">
     <img src="../../../assets/anzhuang_01.jpg" alt="">
     <img src="../../../assets/anzhuang_02.jpg" alt="">
     
   
   </aside>
    <div @click="changeState(9)"> 
     <span>3) 如何注册爆好货？<img src="../../../assets/a_page_hot_tab_iocn.png" alt=""></span><img src="../../../assets/arrow_right_16_icon1.png" alt="" v-if="!(currentIndex==9)"><img src="../../../assets/arrow_right_16_icon2.png" alt="" v-else-if="currentIndex==9">
   </div>
    <aside v-if="currentIndex==9">
     <img src="../../../assets/zhuce_01.jpg" alt="">
     <img src="../../../assets/zhuce_02.jpg" alt="">
     <img src="../../../assets/zhuce_03.jpg" alt="">
   </aside>
   <div @click="changeState(10)">
     <span>4) 邀请码是什么？怎么用？<img src="../../../assets/a_page_hot_tab_iocn.png" alt=""></span><img src="../../../assets/arrow_right_16_icon1.png" alt="" v-if="!(currentIndex==10)"><img src="../../../assets/arrow_right_16_icon2.png" alt="" v-else-if="currentIndex==10">
   </div>
   <aside v-if="currentIndex==10">
     <img src="../../../assets/invitecode_01.jpg" alt="">
     <img src="../../../assets/invitecode_02.jpg" alt="">
     <img src="../../../assets/invitecode_03.jpg" alt="">
   </aside>
   <h2>提现问题</h2>
   <div @click="changeState(11)"> 
     <span>1) 如何提现？<img src="../../../assets/a_page_hot_tab_iocn.png" alt=""></span><img src="../../../assets/arrow_right_16_icon1.png" alt="" v-if="!(currentIndex==11)"><img src="../../../assets/arrow_right_16_icon2.png" alt="" v-else-if="currentIndex==11">
   </div>
   <p v-if="currentIndex==11">零钱满1.00元即可提现，每次最高可以提现100.00元。</p>
   <div @click="changeState(12)"> 
     <span>2) 如何微信，支付宝提现？</span><img src="../../../assets/arrow_right_16_icon1.png" alt="" v-if="!(currentIndex==12)"><img src="../../../assets/arrow_right_16_icon2.png" alt="" v-else-if="currentIndex==12">
   </div>
   <p v-if="currentIndex==12">在绑定完微信、支付宝账号后即可使用微信、支付宝提现。</p>
   <div @click="changeState(13)"> 
     <span>3) 提现多久到账？</span><img src="../../../assets/arrow_right_16_icon1.png" alt="" v-if="!(currentIndex==13)"><img src="../../../assets/arrow_right_16_icon2.png" alt="" v-else-if="currentIndex==13">
   </div>
   <p v-if="currentIndex==13">一般在1-10分钟到账，如遇网络延迟，请稍后。</p>
   <div @click="changeState(14)"> 
     <span>4) 如何实名认证？</span><img src="../../../assets/arrow_right_16_icon1.png" alt="" v-if="!(currentIndex==14)"><img src="../../../assets/arrow_right_16_icon2.png" alt="" v-else-if="currentIndex==14">
   </div>
   <p v-if="currentIndex==14">为了确保您的资金安全，提现前请先完成实名认证。</p>
   <div @click="changeState(15)"> 
     <span>5）什么是已累计赚取？</span><img src="../../../assets/arrow_right_16_icon1.png" alt="" v-if="!(currentIndex==15)"><img src="../../../assets/arrow_right_16_icon2.png" alt="" v-else-if="currentIndex==15">
   </div>
   <p v-if="currentIndex==15">已累计赚取是指从您注册开始的所有收入。</p>
   <h2>猎人问题</h2>
   <div @click="changeState(16)"> 
     <span>1）什么是赏金猎人？</span><img src="../../../assets/arrow_right_16_icon1.png" alt="" v-if="!(currentIndex==16)"><img src="../../../assets/arrow_right_16_icon2.png" alt="" v-else-if="currentIndex==16">
   </div>
   <p v-if="currentIndex==16">赏金猎人是爆好货平台推出的一项皆在帮助用户更高效赚钱的会员服务。</p>
   <div @click="changeState(17)"> 
     <span>2）赏金猎人的权益有哪些？<img src="../../../assets/a_page_hot_tab_iocn.png" alt=""></span><img src="../../../assets/arrow_right_16_icon1.png" alt="" v-if="!(currentIndex==17)"><img src="../../../assets/arrow_right_16_icon2.png" alt="" v-else-if="currentIndex==17">
   </div>
   <p v-if="currentIndex==17">
     <span>全年可领取<em>60.00</em>元话费券</span>
     <span>全年可领取<em>600元</em>购物券</span>
     <span>金币<em>200%</em>加成</span>
     <span><em>24小时</em>均可提现（普通用户可在12:00-23:59提现）</span>
     <span>信用卡<em>100%</em>加成</span>
     <span>白条优先邀请</span>
     <span>邀请好友成为猎人<em>100%</em>加成</span>
     <span>好友消费享<em>最高20%</em>提成</span>
     <span>分享商品，享<em>最高20%</em>成交成分</span>
   </p>
   <h2>黑卡问题</h2>
   <div @click="changeState(18)"> 
     <span>1）什么是黑卡？</span><img src="../../../assets/arrow_right_16_icon1.png" alt="" v-if="!(currentIndex==18)"><img src="../../../assets/arrow_right_16_icon2.png" alt="" v-else-if="currentIndex==18">
   </div>
   <p v-if="currentIndex==18">黑卡是黑卡会员简称，是平台与用户的一张契约，我们将努力帮助用户获取有品质保障、高性价比的商品或服务，并将通过返现形式进一步降低您购买商品和服务的实际成本。</p>
   <div @click="changeState(19)"> 
     <span>2）黑卡会员的权益有哪些？<img src="../../../assets/a_page_hot_tab_iocn.png" alt=""></span><img src="../../../assets/arrow_right_16_icon1.png" alt="" v-if="!(currentIndex==19)"><img src="../../../assets/arrow_right_16_icon2.png" alt="" v-else-if="currentIndex==19">
   </div>
   <p v-if="currentIndex==19">黑卡的核心权益为返现，加入黑卡会员，可获得<em>最高20%返现</em>。首次加入，还有丰厚奖励！</p>
   <h2>发货问题</h2>
   <div @click="changeState(20)"> 
     <span>1）什么时候发货？</span><img src="../../../assets/arrow_right_16_icon1.png" alt="" v-if="!(currentIndex==20)"><img src="../../../assets/arrow_right_16_icon2.png" alt="" v-else-if="currentIndex==20">
   </div>
   <p v-if="currentIndex==20">订单支付成功后，一般将在48小时内发货，春节假期除外</p>
   <div @click="changeState(21)"> 
     <span>2）是包邮吗？</span><img src="../../../assets/arrow_right_16_icon1.png" alt="" v-if="!(currentIndex==21)"><img src="../../../assets/arrow_right_16_icon2.png" alt="" v-else-if="currentIndex==21">
   </div>
   <p v-if="currentIndex==21">爆好货平台大陆范围内<i>全国包邮</i>!</p>
   <div @click="changeState(22)"> 
     <span>2）用什么快递？</span><img src="../../../assets/arrow_right_16_icon1.png" alt="" v-if="!(currentIndex==22)"><img src="../../../assets/arrow_right_16_icon2.png" alt="" v-else-if="currentIndex==22">
   </div>
   <p v-if="currentIndex==22" >将有商家根据现实情况选择快递公司</p>
  </div>
</template>

<script>
import { commandCopy } from 'xe-command'
import { Toast } from "mint-ui";
export default {
  name: "ProblemsSee",
  data() {
    return {
      currentIndex:0,
      
    };
  },
  created() {
    document.title = "常见问题"
  },
  mounted() {
    
  },
  methods: {
    copy(value){
      let str = location.href.split('#/')[0]+'#/'+value;
      commandCopy(str)
      if(commandCopy(str)){
        Toast('链接已经复制')
      }else{
        Toast('复制失败')
      }
    },
    changeState(index){
      if(this.currentIndex == index){
        this.currentIndex = 0
      }else{
        this.currentIndex = index
      }
    }
   
  },
  
    
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.commonproblem {
  display: flex;
  flex-direction: column;
  width:100%;
  height:auto;
  background: #FFFFFF;
  h2 {
    height:54px;
    width:100%;
    box-sizing: border-box;
    background: #F4F4F4;
    padding-left: 20px;
    font-size:18px;
    color:#666D7C;
    line-height: 54px;
  }
  aside {
    width:100%;
    height:auto;
     >img {
      width:100%;
      display: block;
    }
  }
  p{
    padding: 20px 20px 20px 40px;
    color:#737373;
    font-size: 12px;
    line-height: 20px;
    em{
      
      position: relative;
      &:first-child {
         margin-bottom: 10px;
      }
      a {
        color:#5891EB;
        font-size: 12px;
        height:24px;
        line-height: 24px;
      }
    img {
       position: absolute;
       top:0;
       right:0;
       width:24px;
       height:24px;
       z-index: 2000;
    }
  }
  
    span{
      display: block;
      position: relative;
      
    }
    em {
        color:#FF3C3A;
      }
    i{
       color:#FF3C3A;
       font-family: normal;
      }
  }
 div{
   background: #FFFFFF;
   //width:100%;
   box-sizing: border-box;
   color:#99A1B2;
   font-size:14px;
   margin:0 15px 0 20px;
   line-height: 54px;
   height:54px;
   border-bottom: 1px solid #F4F4F4;
   display: flex;
   justify-content: space-between;
   align-items: center;
   >img {
     height:12px;
     width:12px;
     
   }
  span {
    position: relative;
    img {
      //display: block;
      position: absolute;
      top:5px;
      right:-36px;
        width:36px;
        height:20px;
      
    }
  }
 }
}
.anzhuang em{
  display: block;
}
</style>
