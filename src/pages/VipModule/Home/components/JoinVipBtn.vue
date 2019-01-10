<template>
    <router-link class="join_hunter" to='/vip/payvip'>
        加入黑卡会员<span>￥{{vipItems.vipItem.salePriceCent |parse2point}}/年</span><em>￥{{vipItems.vipItem.oriPriceCent |parse2point}}</em>
    </router-link>
</template>

<script>
export default {
    props:{
        vipItems:{
            type:Object,
            default:{}
        }
    },
    data(){
        return{
        }
    },
    created(){
       
    },
    methods: {
        
    },
    mounted () {
        // console.log(this.hunterItem)
    },
    filters:{
        parse2point(val){
            return parseFloat(val/100).toFixed(2)
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.join_hunter{
    width: 335px;
    height: 48px;
    background: linear-gradient(left,#3E3433,#141414);
    margin: 0 auto 20px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #F2D8B5;
    
    // box-shadow: 0 0 8px  $HunterThemeColor; 
    span{
        color: #FF3C3A;
        padding-left: 10px;
        font-weight: bolder;
    }
    em{
        padding-left: 5px;
        font-size: 14px;
        color: #B2B2B2;
        text-decoration: line-through;
    }
}
</style>
