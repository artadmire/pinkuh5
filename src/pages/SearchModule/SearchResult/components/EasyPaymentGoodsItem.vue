<template>
    <router-link class="easypayment" :to="{path:'./detail',query:{id:item.itemId}}">
        <img class="bg" v-lazy="item.pic+'@!400'" alt="">
        <img class="logo" v-lazy="item.brandLogo+'@!200'" alt="">
        <p class="title">{{item.title}}</p>
        <div>
            <p>￥{{item.salePriceCent | float2Point}}<span>{{item.easyPaymentInfo.freeChargeDesc}}</span></p>
            <span>每期￥{{item.easyPaymentInfo.minEasyPaymentCent | float2Point}}起</span>
        </div>
    </router-link>
</template>

<script>
export default {
    props:{
        item:{
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
    filters:{
        float2Point(value){
            return parseFloat(value/100).toFixed(2)
        },
    },
    mounted () {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.easypayment{
    width: 164px;
    height: 285px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    border:1px solid #dee1e7;/*no*/
    box-sizing: border-box;
    background: white;
    position: relative;
    margin-bottom: 16px;
    img.bg{
        width: 164px;
        height: 164px;
        object-fit: cover;
        border-bottom: 1px solid #dee1e7;/*no*/
    }
    img.logo{
        width: 46px;
        height: 46px;
        object-fit: cover;
        margin-top: -23px;
        border-radius: 50%;
        border: 1px solid #dee1e7;/*no*/
        background: white;
    }
    .title{
        height: 32px;
        padding: 0 15px;
        line-height: 16px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 12px;
    }
    div{
        width: 100%;
        height: 50px;
        padding-left:10px;
        box-sizing: border-box; 
        position: absolute;
        bottom: 0;
        left: 0;
        p{
            line-height: 20px;
        }
        p:nth-child(1){
            color: #5891EB;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            span{
                background: #5891EB;
                color: white;
                font-size: 12px;
                padding: 0 10px;
                border-radius: 10px 0 0 10px;
            }
        }
        >span:nth-child(2){
            background: #FFF4F6;
            border: 1px solid #FAE1E1;/*no*/
            color: #FF3C3A;
            border-radius: 5px;
            line-height: 25px;
            padding: 0 4px;
        }
    }
}
</style>
