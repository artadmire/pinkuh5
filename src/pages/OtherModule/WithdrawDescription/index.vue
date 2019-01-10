<template>
  <div class="withdraw-description">
      <p class="title">您当前暂未获得提现机会，您可以通过下列方式来获得提现的机会。</p>
      <div class="withdraw-description-context">
          <p>
              <img src="~@/assets/usercenter_red_envelope_icon.png" alt="">
              <b>连续签到7天，获得<i>1次机会；</i></b>
          </p>
          <p>
              <img src="~@/assets/usercenter_red_envelope_icon.png" alt="">
              <b>在商城下单（话费流量充值等虚拟商品除外），完成订单后获得<i>1次机会；</i></b>
          </p>
          <p>
              <img src="~@/assets/usercenter_red_envelope_icon.png" alt="">
              <b>邀请好友，邀请好友完成首次提现后，获得<i>1次提现机会，</i>每天最多1次。</b>
          </p>
      </div>
      <p class="memo">注：所获得的提现机会，有效期为7天，获取后尽快提现</p>
      <div class="back" @click="back_func">返回</div>
  </div>
</template>

<script>
  import pk from '@/util/pk.js'

  export default {
      created(){
          document.title = '提现说明'
      },
      methods:{
          back_func(){
              pk.navigateBack(() => {});
          }
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  @import "~@/common/css/var.scss";
  .withdraw-description{
        background: #F7F8FA;
        width: 100%;
        height: 667px;
        box-sizing: border-box;
        padding-top: 50px;
        .title{
            margin: 0 auto;
            font-size: 14px;
            width: 335px;
            line-height: 20px;
            color: #737373;
        }
        .withdraw-description-context{
            width: 335px;
            height: 166px;
            margin: 50px auto 20px;
            background: white;
            border-radius: 6px;
            font-size: 14px;
            box-sizing: border-box;
            padding: 10px;
            p{
                font-weight: bold;
                color: #5891EB;
                display: flex;
                align-items: flex-start;
                line-height: 22px;
                margin: 15px auto;
                img{
                    width: 22px;
                    height: 22px;
                    object-fit: cover;
                    margin-right: 10px;
                }
                i{
                    color: #FF3C3A;
                }
                b{
                    flex:1;
                }
            }
        }
        .memo{
            width: 335px;
            height: 30px;
            line-height: 30px;
            margin: 0 auto;
            text-align: center;
            color: #B2B2B2;
        }
        .back{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 375px;
            height: 48px;
            line-height: 48px;
            text-align: center;
            font-size: 16px;
            color: white;
            background: linear-gradient(to right, #47B5FF , #2357EE)
        }

  }
</style>
