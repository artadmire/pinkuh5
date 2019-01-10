<template>
    <div class="share_superior_goods" @click="showRightsIntroduce">
        <span>优享权益</span>
        <img src="@/assets/rights_defult_9_h5_icon.png" alt="">
        <div>
            <p>{{dataInfo.title}}</p>
            <p>{{dataInfo.desc}}</p>
        </div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    props:{
        dataInfo:{
            type:Object,
            default:{}
        },
        itemIndex:{
            type:Number,
            default:8
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
.share_superior_goods{
    width: 306px;
    height: 72px;
    border-radius: 8px;
    border: 1px solid $HunterThemeColor;/*no*/
    margin: 0px auto 10px;
    box-sizing: border-box;
    padding: 10px 0;
    display: flex;
    span{
        flex: none;
        width: 55px;
        line-height: 16px;
        height: 16px;
        padding-left: 3px; 
        background: #F1A826;
        color: white;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
    }
    img{
        flex:none;
        width: 82px;
        height: 47px;
        margin-left: 10px;
        object-fit: cover;
    }
    >div{
        flex:1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        line-height: 15px;
        font-size: 14px;
        transform: scale(0.9);
        p:nth-child(2){
            color: $lightGray;
            font-size: 12px;
        }
    }
}
</style>
