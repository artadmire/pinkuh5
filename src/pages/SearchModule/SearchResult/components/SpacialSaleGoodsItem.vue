<template>
    <router-link class="spacial-sale" :to="{path:'./detail',query:{id:item.itemId}}">
        <img class="bg" v-lazy="item.pic+'@!400'" alt="">
        <img class="logo" v-lazy="item.brandLogo+'@!200'" alt="">
        <p class="title">{{item.title}}</p>
        <div>
            <p>￥{{item.salePriceCent | float2Point}}<span>{{item.sessionInfo.discountPercent |float1Point }}折</span></p>
            <p>原价<i>¥{{item.originalPriceCent | float2Point}}</i></p>
            
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
        float1Point(value){
            return parseFloat(value/10).toFixed(1)
        },
    },
    mounted () {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.spacial-sale{
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
            color: #FF3C3A;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            span{
                background: #FF3C3A;
                color: white;
                font-size: 12px;
                padding: 0 10px;
                border-radius: 10px 0 0 10px;
            }
        }
        p:nth-child(2){
            color: #9B9B9B;
            font-size: 12px;
            i{
                text-decoration: line-through;
            }
        }
    }
}
</style>
