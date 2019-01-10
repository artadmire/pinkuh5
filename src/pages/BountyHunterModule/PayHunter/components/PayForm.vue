<template>
    <div class="pay_form">
        <p class="payment_method">
            <span>购买方式</span>
            <span>付费购买</span>
        </p>
         <p>
            <span>购买年限</span>
            <span>1年</span>
            <!-- <em>赠送30天猎人会籍</em> -->
        </p>
        <p v-if="hunterStore.hunterInfo.type == 0">
            <span>输入邀请码<em>(选填)</em></span>
            <input  v-model="invitedCode" maxlength="10" type="tel">
        </p>
        <p class="pay_price">
            <span>应付金额</span>
            <span class="pay_price_right" v-if='hunterInfo.hunterItem'>
                <span>￥{{hunterInfo.hunterItem.salePriceCent | parse2piont}} <i>￥{{hunterInfo.hunterItem.oriPriceCent | parse2piont}}</i></span>
                <em>不可退款</em>
            </span>
        </p>
        <div v-if="hunterStore.hunterInfo.type == 0" id="pay_now" @click='payNow'>
            立即购买
        </div>
        <div v-else id="pay_now" @click='payNow'>
            立即续费
        </div>
        <div class="agreement">
            <i :class="{active:hunterStore.agreementStatus}" @click='agreementChange'></i> <span>开通即视为同意<em @click='openAgreementToast(true)'>《赏金猎人-用户协议》</em></span>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import api from '../api.js'
import pk from '@/util/pk.js'
export default {
    props:{
    },
    data(){
        return{
            hunterInfo:{},
            invitedCode:undefined,
        }
    },
    created(){
       this.changeAgreementStatus(false)
    },
    computed:{
         ...mapState(['hunterStore'])
    },
    methods: {
        ...mapMutations(['changeAgreementStatus','changeNoticeHunterHomeRefresh']),
        payNow(){
            if(!this.hunterStore.agreementStatus){
                alert('请同意赏金猎人协议')
            }else{
                this.hunterBuy({
                    'payFeeCent':this.hunterInfo.hunterItem.salePriceCent,
                    'merchantId':this.hunterInfo.hunterItem.merchantId,
                    'skuId':this.hunterInfo.hunterItem.skuId,
                    'invtieCode':this.invitedCode
                })
            }
        },
        openAgreementToast(status){
            this.$emit('listenFromAgreement',status)
        },
        async hunterBuy(obj){
            let wipdata  = await api.hunterBuy(obj);
            console.log(wipdata.value.orderId);
            if(wipdata.succ){
                
                this.$router.back(-1);
                this.changeNoticeHunterHomeRefresh(true)
                pk.navigateTo(
                    {url:'pinkumall://default/order_pay?order_id='+wipdata.value.orderId+'&order_type=7'},
                    (response)=>{
                        console.log(response)
                        // this.$router.push({
                        //     path: "./home"
                        // });
                       
                        
                    },
                    (error)=>{
                    }
                )
            }
        },
        agreementChange(){
            this.changeAgreementStatus(!this.hunterStore.agreementStatus)
        }
    },
    filters:{
        parse2piont(value){
            return parseFloat(value/100).toFixed(2)
        }
    },
    mounted () {
         this.hunterInfo = this.hunterStore.hunterInfo;
        console.log(this.hunterInfo ,999);
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.pay_form{
    width: 335px;
    margin: -180px auto 0;
    height: 284px;
    background: white;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 0 20px;
    p{
        height: 44px;
        line-height: 44px;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f7f8fa; /*no*/
        position: relative;
        align-items: center;
        span{
            width: 150px;
            i{
                color: $lightGray;
                text-decoration: line-through;
            }
        }
        span:nth-child(2){
            text-align: right;
            color: #FFAE1D;
        }
        .pay_price_right{
            display: flex;
            flex-direction: column;
            color: $HunterThemeColor;
            line-height: 15px;
            justify-content: space-around;
            align-items: flex-end;
            >em{
                font-size: 12px;
                color: #D0021B;
                transform: scale(0.9);
            }
        }
        em{
            color: $lightGray;
            font-size: 12px;
        }
        input{
            width: 100px;
            text-align: right;
            height: 41px;
        } 
        input::-webkit-input-placeholder { /* WebKit browsers */
            color:#dedede
        }
        input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color:#dedede
        }
        input::-moz-placeholder { /* Mozilla Firefox 19+ */
            color:#dedede
        }
        input:-ms-input-placeholder { /* Internet Explorer 10+ */
            color:#dedede
        }
    }
    
    
    #pay_now{
        width: 300px;
        height: 48px;
        // background: #F1A826;
        background: linear-gradient(top,#FFD9B3,#FFC456);
        margin-top: 20px;
        font-size: 18px;
        color: #98470C;
        line-height: 48px;
        text-align: center;
        border-radius: 8px;
        // box-shadow: 0 0 8px #F1A826;
    }
    
    .agreement{
        width: 100%;
        text-align: center;
        display: flex;
        height: 30px;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        font-size: 13px;
        transform: scale(0.9);
        i{
            width: 14px;
            height: 14px;
            background: url('~@/assets/correct_uncheck_icon_h5.png');
            background-size:100% 100%; 
            margin-right: 3px;
            box-sizing: border-box;
        }
        span{
            em{
                color: #F1A826;
            }
        }
        i.active{
            background: url('~@/assets/correct_check_icon_h5.png');
            background-size:100% 100%; 
        }
    }
}
</style>
