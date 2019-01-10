<template>
    <div class='gold_coin_task' >
        <!-- <img  v-lazy="imgurl" alt=""> -->
        <div class="gold_coin_task_list">
            <p>- 每日爆款 分享赚钱<i></i> -</p>
            <ul>
                <shareBurstGoodItem v-for='(item,index) in itemList' :key='index' :itemInfo='item'></shareBurstGoodItem>
            </ul>
        </div>
    </div>
</template>

<script>
import { nextpage } from '@/util'
import api from '../api.js'
import shareBurstGoodItem from './shareBurstGoodItem'
export default {
    props:{
    },
    data(){
        return{
            currentPage:1,
			confirmCurrenPage:1,
			pageCount:1,
            itemList : [],
            imgurl:require('static@/img/rights_9_pic.png')
        }
    },
    created(){
       this.getRecommendItemList(this.currentPage);
    },
    methods: {
        async getRecommendItemList(currentPage){
            if(this.currentPage == this.confirmCurrenPage&&this.currentPage<=this.pageCount){
                this.confirmCurrenPage = -1;
                let wip = await api.getRecommendItemList(currentPage);
                this.itemList.push(...wip.value.values);
                this.currentPage++;
                this.confirmCurrenPage = this.currentPage;
                this.pageCount  = wip.value.pageCount;
            }
        },
    },
    filters: {
        parse2point(value){
            return parseFloat(value/100).toFixed(2)
        }
    },
    components:{shareBurstGoodItem},
    mounted () {
        window.onload = window.onscroll = () => {
            //滚动条的位置
            let top = document.documentElement.scrollTop || document.body.scrollTop;
            //文本高度
            let textHeight = document.body.scrollHeight;
            //屏幕高度
            let clientHeight =
            document.documentElement.clientHeight || document.body.clientHeight;
            //热卖商品高度
            //去掉热卖商品后高度取消
            if (textHeight - top - clientHeight < clientHeight / 2) {
                this.getRecommendItemList(this.currentPage)
            }
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.gold_coin_task{
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background: #f7f8fa;
    
    >img{
        padding:  10px 20px;
        width: 335px;
        height: 180px;
        object-fit: cover;
    }
    .gold_coin_task_list{
        >p{
            font-size: 18px;
            font-weight: bold;
            line-height: 50px;
            text-align: center;
            background: white;
            i{
                color: $HunterThemeColor
            }
        }
        ul{
            padding: 10px 20px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
    }
}
</style>
