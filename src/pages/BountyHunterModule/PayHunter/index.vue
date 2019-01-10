<template>
    <div class="pay_hunter">
        <!-- <Title :title='"购买赏金猎人"'></Title> -->
        <div class="pay_hunter_bg">
        </div>
        <PayForm @listenFromAgreement='listenFromAgreement' ></PayForm>
        
        <AgreementToast @listenFromAgreement='listenFromAgreement' v-if='agreementToastStatus' ></AgreementToast>
        <!-- <div class="bounty_rights">
            <h2>- 猎人9大权益 -</h2>
            <BountyRights class="BountyRights"></BountyRights>
        </div> -->
        
    </div>
</template>

<script>
import Title from '../BountyCommon/Title'
import PayForm from './components/PayForm'
import HunterRights from './components/HunterRights'
import AgreementToast from './components/AgreementToast'
import BountyRights from '../BountyCommon/BountyRights'
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
        ...mapState(['hunterStore'])
    },
    components: {
      PayForm,HunterRights,Title,AgreementToast,BountyRights
    },
    methods: {
        ...mapMutations(['changeBountyRightsIndex','changeBountyRightsState']),
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
       document.title = '赏金猎人';
       pk.addLisenter('onshow',()=>{
            this.commitCustomEvent();
       })
      
    },
    destroyed(){
        this.changeBountyRightsIndex(-1)
        this.changeBountyRightsState(false)
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.pay_hunter{
    background: #f7f8fa;
    .pay_hunter_bg{
        width: 375px;
        height: 300px;
        background: url('~static@/img/hunter_buy_bg_pic.png');
        background-size: contain;
    }
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
