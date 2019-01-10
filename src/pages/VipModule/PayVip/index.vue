<template>
    <div class="pay_hunter">
        <!-- <Title :title='"购买赏金猎人"'></Title> -->
        <!-- //<div class="pay_hunter_bg"></div> -->
        <PayForm @listenFromAgreement='listenFromAgreement' ></PayForm>
        <AgreementToast @listenFromAgreement='listenFromAgreement' v-if='agreementToastStatus' ></AgreementToast>
    </div>
</template>

<script>

import PayForm from './components/PayForm'

import AgreementToast from './components/AgreementToast'

import { mapState, mapMutations } from 'vuex';
import pk from '@/util/pk.js'
export default {
    data(){
        return{
            agreementToastStatus : false,
        }
    },
    created(){
       window.scrollTo(0,0);
    },
    computed:{
        ...mapState(['vipStore'])
    },
    components: {
      PayForm,AgreementToast
    },
    methods: {
        ...mapMutations(['changevipRightsIndex','changevipRightsState']),
        listenFromAgreement(msg){
            this.agreementToastStatus = msg;
        },
        commitCustomEvent(){
            pk.commitCustomEvent(
                {
                    'eventName':'enter_hunter_purchase_page'
                },
                ()=>{
                }
            )
        },
    },
    mounted () {
       document.title = '黑卡会员';
       pk.addLisenter('onshow',()=>{
            this.commitCustomEvent();
       })
      
    },
    destroyed(){
        this.changevipRightsIndex(-1)
        this.changevipRightsState(false)
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.pay_hunter{
    background: url('../../../assets/vip_purchase_page_bg_pic_h5.png') no-repeat center top/contain,linear-gradient(top,#DCBB8E,#FCE5C5); 
    width: 100%;
    height: 100%;
    background-size: cover;
    overflow: hidden;
}
.bounty_rights{
    h2{
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 18px;
        margin:  10px auto;
    }
    .BountyRights{
        margin: 0px auto;
    }
}

</style>
