<template>
    
    <li @click='goToDetail'>
        <img v-lazy="itemInfo.pic+'@!800'" alt="">
        <p>{{itemInfo.itemTitle}}</p>
        <div class="price">
            ￥{{itemInfo.salePriceCent|parse2point}} 
        </div>
        <div class="price">
         <span>原价<em>￥{{itemInfo.originalPriceCent | parse2point}}</em></span>
        </div>
        <div class="share" @click.stop='shareBurstGood'>
            <img src="@/assets/vip_homepage_goods_price_tag_icon_h5.png" alt="">
            <span>
                最高返<em>{{itemInfo.incomeCent | parse2point}}</em>元
            </span>
            
        </div>
        <img  class="pic-label" v-if='itemInfo.picLabel' :src="itemInfo.picLabel+'@!400'" alt="">
    </li>
</template>

<script>
import api from '@/pages/VipModule/Home/api.js'
import pk from '@/util/pk.js'
export default {
    props:{
        itemInfo:{
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
        goToDetail(){
            pk.navigateTo(
                {
                    url:'pinkumall://default/item_detail?item_id='+this.itemInfo.itemId
                }
            )
        }
    },
    filters: {
        parse2point(value){
            return parseFloat(value/100).toFixed(2)
        }
    },
    mounted () {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
li{
    width: 164px;
    height: 290px;
    box-sizing: border-box;
    margin-bottom: 10px;
    padding: 4px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    position: relative;
    >img:nth-child(1) {
        width: 156px;
        height: 156px;
        object-fit: cover;
        border: 1px solid #f7f8fa;/*no*/
        box-sizing: border-box;
        flex:none;
        border-radius: 5px;
    }
    
    p{
        flex:none;
        height: 36px;
        width:140px;
        box-sizing: border-box;
        text-align: center;
        //margin:10px 12px;
        margin:10px 0 4px 0;
        font-size: 14px;
        color: #141414;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 18px;
        word-wrap:break-word;
        word-break: break-all;
    }
    >.price{
        width:155px;
        flex:none;
        font-size: 16px;
        font-weight: bold;
        overflow: hidden;
        line-height: 18px;
        text-align: center;
        span{
            width:155px;
            display: inline-block;
            font-weight: normal;
            font-size: 10px;
            transform: scale(0.9);
            color: $gray;
            margin: 0px 0 5px 0;
            em{
                text-decoration: line-through;
            }
        }
    }
    >.share{
        flex:none;
        display: flex;
        width: 144px;
        height: 30px;
        font-size: 14px;
        background: linear-gradient(left,#3E3433,#141414);
        border-radius: 4px;
        align-items: center;
        padding-left: 3px;
        box-sizing: border-box;
        img {
            height:23px;
            width:33px;
        }
        span{
            display: inline-block;
            text-align: center;
            line-height: 30px;
            flex:1;
            overflow: hidden;
            color:#EFBA94 ;
            font-size: 11px;
            em{
                font-size: 18px;
                
            }
        }
    }
    .pic-label{
        position: absolute;
        width: 156px;
        height: 156px;
        top: 4px;
        left: 4px;
        z-index: 9;
    }
}
</style>
