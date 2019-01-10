<template>
  <div class="commonproblem">
   <div class="problems">
     <div class="problemclassification">
       <h3>任务问题</h3>
     </div>
     <div>
       <h3>1.金币是什么？</h3>
       <span>答：金币是爆好货里的货币单位，您可以通过参与金币任务赚取金币，并可兑换成现金；</span>
     </div>
     <div>
       <h3>2.金币如何兑换成现金？</h3>
       <span>答：兑换现金金额= 昨日金币*昨日汇率。这里的汇率，与平台收益相关，汇率会随着平台每天的收益上下浮动；</span>
     </div>
     <div class="problemclassification">
       <h3>猎人问题</h3>
     </div>
     <div>
       <h3>1.猎人怎么收费？</h3>
       <span>答：猎人年费199元/年，限时优惠99元/年</span>
     </div>
     <div>
       <h3>2.猎人的权益有哪些？</h3>
       <span>答：猎人专享九大权益</span>
       <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1）话费券，专享60元/年话费券</span>
       <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2）购物券，专享600元/年购物券</span>
       <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3）金币加成，专享200%的金币加成</span>
       <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4）优先提现，每日限额提现，12:00前为猎人专享提现时间</span>
       <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5）信用卡奖励加成，专享100%加成</span>
       <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6）白条优先，优先获得更高额度</span>
       <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7）邀请猎人奖励加成，专享100%加成</span>
       <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8）专享好友消费返佣</span>
       <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;9）分享爆品提成，专享最高30%提成</span>
     </div>
     <div class="problemclassification">
       <h3>商城问题</h3>
     </div>
     <div>
       <h3>1.我拍下的订单怎么自动取消了？</h3>
       <span>答：当商品全部被拍下便是“已售罄”状态无法购买，所以为了让更多用户能抢到心仪商品，当您将喜欢的商品拍下时，商品保留时间只有30分钟。超过30分钟还没有支付，订单将被自动取消，商品释放并重新上架，供其他用户抢购。如果你想要购买到自己喜欢的商品，请及时完成订单支付</span>
     </div>
     <div>
       <h3>2.订单支付成功后，不想要了怎么办？</h3>
       <span>答：1）未收到货：可对包裹进行拒签，订单申请退款即可</span>
       <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2）已收到货：请参照7天无理由退货</span>
     </div>
     <div>
       <h3>3.收到商品有问题怎么办？</h3>
       <span>答：您可以联系客服，并提供实物图片确认问题是否属实。如果确认商品问题，或无法说明商品是否合格，将与您协商解决。</span>
     </div>
   </div>
  </div>
</template>

<script>
export default {
  name: "Commonproblem",
  data() {
    return {
      
    };
  },
  created() {
    document.title = "常见问题"
  },
  methods: {
    
   
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
  background: #F7F8FA;
  
  >div {
    height:100%;
    // margin-top:44px;
    flex: 1;
    background: #F7F8FA;
    div {
      margin:0 auto;
      border-radius: 6px;
      width: 335px;
      background: #ffff;
      box-sizing: border-box;
      padding:0 10px 16px 10px;
      box-shadow: #DEE1E7 0 4px 5px 0;
      margin-top:10px;
      h3 {
        font-weight: Regular;
        font-size: 16px;
        color:#141414;
        height:44px;
        line-height: 44px;
        box-shadow: #F7F8FA 0 1px 0px 0;/*no*/
        margin-bottom: 10px;
      }
      span {
        display: block;
        color:$gray;
        font-size: 12px;
        line-height: 20px;

      }
    }
    div:last-child {
      margin-bottom: 10px;
    }
    .problemclassification {
      padding:0 10px 0 10px;
      background: #F7F8FA;
      box-shadow: none;
      font-weight: 600;
      h3 {
        box-shadow: none;
     }
    }
  }
}
</style>
