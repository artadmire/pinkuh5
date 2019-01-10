<template>
    <div class="pay_form">
        <p class="payment_method">
            <span>购买方式</span>
            <span>付费购买</span>
        </p>
         <p>
            <span>购买年限</span>
            <span>{{ vipInfo.vipItem.name }}</span>
            <!-- <em>赠送30天猎人会籍</em> -->
        </p>
        <p class="pay_price">
            <span>应付金额</span>
            <span class="pay_price_right" >
                <span>￥{{vipInfo.vipItem.salePriceCent |parse2point}} <i>￥{{vipInfo.vipItem.oriPriceCent | parse2point}}</i></span>
                <em>加入会员后，不可退款</em>
            </span>
        </p>
        <div class="pay_rigths" >
            <span v-show="isvip">加入立返
                <img src="../../../../assets/vip_purchase_page_coupon_icon_h5.png" alt="">
                <em>100元</em>到零钱，可提现
            </span>
        </div>
        <div id="pay_now" @click='payNow'>
            立即购买
        </div>
        <div class="agreement">
            <i :class="{active:vipStore.agreementStatus}" @click='agreementChange'></i> <span>开通即视为同意<em @click='openAgreementToast(true)'>《黑卡会员升级服务协议》</em></span>
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
            vipInfo:{},
            invitedCode:undefined,
            isvip:true
        }
    },
    created(){
        console.log(this.vipStore.vipInfo,333)
        if(this.vipStore.vipInfo.type == 0){
            this.isvip = true
        }else if(this.vipStore.vipInfo.type == 1){
            this.isvip = false
        }
       this.changevipAgreementStatus(false)
    },
    computed:{
         ...mapState(['vipStore'])
    },
    methods: {
        ...mapMutations(['changevipAgreementStatus','changeNoticevipHomeRefresh']),
        payNow(){
            if(!this.vipStore.agreementStatus){
                alert('请同意黑卡会员协议')
            }else{
                this.vipBuy({
                    'payFeeCent':this.vipInfo.vipItem.salePriceCent,
                    'merchantId':this.vipInfo.vipItem.merchantId,
                    'skuId':this.vipInfo.vipItem.skuId,
                })
            }
        },
        openAgreementToast(status){
            this.$emit('listenFromAgreement',status)
        },
        async vipBuy(obj){
            let wipdata  = await api.vipBuy(obj);
            console.log(wipdata.value.orderId);
            if(wipdata.succ){
                this.$router.back(-1);
                this.changeNoticevipHomeRefresh(true)
                pk.navigateTo(
                    {url:'pinkumall://default/order_pay?order_id='+wipdata.value.orderId+'&order_type=8'},
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
            this.changevipAgreementStatus(!this.vipStore.agreementStatus)
        }
    },
    mounted () {
         this.vipInfo = this.vipStore.vipInfo;
        console.log(this.vipInfo);
    },
    filters:{
        parse2point(value){
            return parseFloat(value/100).toFixed(2)
        }
    },
    
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.pay_form{
    width: 335px;
    margin: 163px auto 0;
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
            color: #C49962;
        }
        .pay_price_right{
            display: flex;
            flex-direction: column;
            color: $HunterThemeColor;
            line-height: 15px;
            justify-content: space-around;
            align-items: flex-end;
            >em{
                font-size: 9px;
                color: #D0021B;
                //transform: scale(0.9);
            }
        }
        em{
            color: $lightGray;
            font-size: 12px;
        }
        input{
            width: 100px;
            text-align: right;
            height: 44px;
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
        width: 298px;
        height: 48px;
        // background: #F1A826;
        background: linear-gradient(#3E3433,#141414);
        margin-top: 15px;
        font-size: 18px;
        color: #F2D8B5;
        line-height: 48px;
        text-align: center;
        border-radius: 8px;
        // box-shadow: 0 0 8px #F1A826;
    }
    .pay_rigths{
        text-align: center;
        margin-top:33px;
       
        
        span{
           display: block;
            color:#141414;
            font-size: 12px;
             display: flex;
             line-height: 16px;
            justify-content: center;
            img {
            //display: block;
                height:13px;
                width:22px;
                margin:0 4px 0 4px;
            }
            em {
                display: block;
                color:#FF3C3A;
                font-size: inherit;
            }
        }
    }
    .agreement{
        
        //text-align: center;
        display: flex;
        height: 15px;
        align-items: center;
        //justify-content: center;
        box-sizing: border-box;
        font-size: 13px;
        margin:15px 0;
        //transform: scale(0.9);
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
