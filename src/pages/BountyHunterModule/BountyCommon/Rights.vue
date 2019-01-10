<template>
    <div class="rights_item" :data-id='itemIndex'  @click="showRightsIntroduce">
        <img v-if='itemIndex==2' src="@/assets/rights_defult_1_h5_icon.png" alt="">
        <img v-else-if='itemIndex==3' src="@/assets/rights_defult_2_h5_icon.png" alt="">
        <img v-else-if='itemIndex==5' src="@/assets/rights_defult_3_h5_icon.png" alt="">
        <img v-else-if='itemIndex==8' src="@/assets/rights_defult_4_h5_icon.png" alt="">
        <img v-else-if='itemIndex==4' src="@/assets/rights_defult_5_h5_icon.png" alt="">
        <img v-else-if='itemIndex==7' src="@/assets/rights_defult_6_h5_icon.png" alt="">
        <img v-else-if='itemIndex==1' src="@/assets/rights_defult_7_h5_icon.png" alt="">
        <img v-else-if='itemIndex==6' src="@/assets/rights_defult_8_h5_icon.png" alt="">
        <img v-else-if='itemIndex==0' src="@/assets/rights_defult_9_h5_icon.png" alt="">
        <p>{{dataInfo.title}}</p>
        <p>{{dataInfo.desc}}</p>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    props:{
        dataInfo:{
            type:Object,
            default:{}
        },
        itemIndex:{
            type:Number,
            default:0
        }
    },
    data(){
        return{
        }
    },
    created(){
       
    },
    methods: {
        ...mapMutations(['changeBountyRightsIndex','changeBountyRightsState']),
        showRightsIntroduce(){
            this.changeBountyRightsIndex(this.itemIndex);
            this.changeBountyRightsState(true)
        }
    },
    mounted () {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.rights_item{
    width: 80px;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    height: 120px;
    img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        box-sizing: border-box;
        object-fit: cover;
    }
    p:nth-child(2){
        line-height: 25px;
        font-size:13px;
    }
    p:nth-child(3){
        width: 90px;
        color: $lightGray;
        line-height: 15px;
        transform: scale(0.9);
    }
}
</style>
