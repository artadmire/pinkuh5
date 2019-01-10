<template>
    
    <li @click='goToDetail'>
        <img :src="itemInfo.pic+'@!800'" alt="">
        <img :src="itemInfo.brandLogo+'@!400'" alt="">
        <p>{{itemInfo.itemTitle}}</p>
        <div class="price">
            ￥{{itemInfo.salePriceCent|parse2point}} <span>原价<em>￥{{itemInfo.oriPriceCent | parse2point}}</em></span>
        </div>
        <div class="share" @click.stop='shareBurstGood'>
            <span>
                最高赚<em>{{itemInfo.incomeCent | parse2point}}</em>元
            </span>
            <span>分享</span>
        </div>
        <img v-if='itemInfo.picLabel' :src="itemInfo.picLabel+'@!400'" alt="" class="pic-label">
    </li>
</template>

<script>
import api from '../api.js'
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
        shareBurstGood(){
            pk.share({
                'title':this.itemInfo.shareInfo.shareTitle,
                'content':this.itemInfo.shareInfo.shareContent,
                'imgUrl':this.itemInfo.shareInfo.shareIcon,
                'linkUrl':this.itemInfo.shareInfo.h5Url,
                'miniProgramPath':this.itemInfo.shareInfo.smartUrl,
                'targetType':2,
                'targetId':this.itemInfo.itemId,
                'displayTitle':'分享该商品最高可赚'+(this.itemInfo.incomeCent/100).toFixed(2)+'元',
                'displayTitleColor':'#ff0000',
            })
        },
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
    height: 295px;
    margin-bottom: 10px;
    padding-top: 5px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    img:nth-child(1){
        width: 156px;
        height: 156px;
        object-fit: cover;
        border: 1px solid #f7f8fa;/*no*/
        box-sizing: border-box;
        flex:none;
    }
    img:nth-child(2){
        flex:none;
        width: 46px;
        height: 46px;
        margin: -23px auto 0;
        border-radius: 50%;
        object-fit: contain;
        border: 1px solid $lightGray; /*no*/
        box-sizing: border-box;
        background: white;
        position: relative;
        z-index: 10;
    }
    p{
        flex:none;
        height: 30px;
        box-sizing: border-box;
        margin:10px 12px;
        font-size: 14px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 15px;
        word-wrap:break-word;
        word-break: break-all;
    }
    >.price{
        flex:none;
        font-size: 16px;
        display: flex;
        align-items: center;
        font-weight: bold;
        span{
            font-weight: normal;
            font-size: 12px;
            transform: scale(0.9);
            color: $gray;
            em{
                text-decoration: line-through;
            }
        }
    }
    >.share{
        flex:none;
        display: flex;
        width: 156px;
        height: 32px;
        margin: 10px auto ;
        font-size: 14px;
        span{
            
            text-align: center;
            line-height: 32px;
        }
        span:nth-child(1){
            flex:1;
            background: #222234;
            color:$HunterThemeColor ;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            font-size: 12px;
            em{
                font-size: 18px;
            }
        }
        span:nth-child(2){
            width:50px;
            background: white;
            border: 1px solid #222234;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
        }
    }
    .pic-label{
        position: absolute;
        width: 156px;
        height: 156px;
        z-index: 9;
        top: 5px;
        left: 4px;
    }
}
</style>
