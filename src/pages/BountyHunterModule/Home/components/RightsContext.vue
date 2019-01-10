<template>
    <transition name='fade'>
        <keep-alive>
            <div class="rights_context" v-if='hunterStore.rightsIndex==2' key='Voucher'>
                <Voucher></Voucher>
            </div>
            <div class="rights_context" v-else-if='hunterStore.rightsIndex==3'  key='CashCoupon'>
                <CashCoupon></CashCoupon>
            </div>
            <div class="rights_context" v-else-if='hunterStore.rightsIndex==5'  key='GoldCoinTask'>
                <GoldCoinTask></GoldCoinTask>
            </div>
            <div class="rights_context" v-else-if='hunterStore.rightsIndex==8'  key='PriorityOfCashExtraction'>
                <PriorityOfCashExtraction></PriorityOfCashExtraction>
            </div>
            <div class="rights_context" v-else-if='hunterStore.rightsIndex==4'  key='CreditCardAward'>
                <CreditCardAward></CreditCardAward>
            </div>
            <div class="rights_context" v-else-if='hunterStore.rightsIndex==7'  key='WhiteStripesPriority'>
                <WhiteStripesPriority></WhiteStripesPriority>
            </div>
            <div class="rights_context" v-else-if='hunterStore.rightsIndex==1'  key='InvitingFriends'>
                <InvitingFriends></InvitingFriends>
            </div>
            <div class="rights_context" v-else-if='hunterStore.rightsIndex==6' key='MakeCommission'>
                <MakeCommission></MakeCommission>
            </div>
            <div class="rights_context" v-else-if='hunterStore.rightsIndex==0'  key='ShareBurstGoods'>
                <ShareBurstGoods></ShareBurstGoods>
            </div>
        </keep-alive>
    </transition>
</template>

<script>
import { mapState,mapMutations} from 'vuex';
import Voucher from "./Voucher";
import CashCoupon from "./CashCoupon";
import GoldCoinTask from "./GoldCoinTask";
import PriorityOfCashExtraction from "./PriorityOfCashExtraction";
import CreditCardAward from "./CreditCardAward";
import WhiteStripesPriority from "./WhiteStripesPriority";
import InvitingFriends from "./InvitingFriends";
import MakeCommission from "./MakeCommission";
import ShareBurstGoods from './ShareBurstGoods'

export default {
  props: {
  },
  data() {
    return {
    };
  },
  created() {
  },
  computed:{
      ...mapState(['hunterStore'])
  },
  methods: {
  },
  components: {
    Voucher,
    CashCoupon,
    GoldCoinTask,
    PriorityOfCashExtraction,
    CreditCardAward,
    WhiteStripesPriority,
    InvitingFriends,
    MakeCommission,
    ShareBurstGoods
  },
  mounted() {
      
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.rights_context {
  min-height: 300px;
  width:100%;
}
.fade-enter-active{
    transition: opacity 1s;
}
 .fade-leave-active {
  transition: opacity 0s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
