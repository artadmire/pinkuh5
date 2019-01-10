<template>
    <router-link class="join_hunter" to='/bountyhunter/payhunter'>
        赏金猎人<span>￥{{hunterItem.salePriceCent |parse2point}}</span> <em>￥{{hunterItem.oriPriceCent |parse2point}}</em>
        <div>限时特惠</div>
    </router-link>
</template>

<script>
export default {
    props:{
        hunterItem:{
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
    background: linear-gradient(top,#FFD9B3,#FFC456);
    margin: 0 auto 20px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #98470C;
    position: relative;
    // box-shadow: 0 0 8px  $HunterThemeColor; 
    span{
        color: #222234;
        padding-left: 10px;
        font-weight: bolder;
    }
    em{
        padding-left: 5px;
        font-size: 14px;
        color: white;
        text-decoration: line-through;
    }
    div{
        position: absolute;
        width: 64px;
        height: 21px;
        right: 75px;
        top: -10px;
        background: url('~@/assets/hunter_page_purchase_btn_tag.png');
        background-size:100% 100%; 
        color: white;
        font-size: 12px;
        text-align: center;
        line-height: 17px;
    }
}
</style>
