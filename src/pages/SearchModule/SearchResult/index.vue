<template>
    <div class="search_result">
        <div class="search_input">
            <i onclick="window.history.go(-1)"></i>
            <input type="search" v-model="searchVal" @keyup.enter="search" placeholder="请输入搜索内容">
        </div>
        <div class="search_result_content" v-if='searchResult.length'
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="queryLoading"
            infinite-scroll-distance="10"
            infinite-scroll-immediate-check='false'>
            <div v-for='(item,index) in searchResult' :key='index'>
                <SpacialSaleGoodsItem v-if='item.sessionInfo' :item='item'/>
                <EasyPaymentGoodsItem v-else-if='item.easyPaymentInfo' :item='item'/>
                <PintuanGoodsItem v-else-if='item.pintuanInfo' :item='item'/>
            </div>
        </div>
        <div class="search_result_null" v-else>
            <img v-lazy="searchResultNullImg" alt="">
            <p>抱歉，暂时未找到您想要的搜索结果</p>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import SpacialSaleGoodsItem from './components/SpacialSaleGoodsItem'
import EasyPaymentGoodsItem from './components/EasyPaymentGoodsItem'
import PintuanGoodsItem from './components/PintuanGoodsItem'
import { InfiniteScroll } from 'mint-ui';
import {locationSearch} from '@/util'
import api from './api.js'
Vue.use(InfiniteScroll);
export default {
    props:{
    },
    data(){
        return{
            queryLoading:false,
            pageCount: 1,
            currentPage:1,
            searchVal:'',
            searchResult:[
            ],
            searchResultNullImg:require('@/assets/search_page_empty_icon@3x.png')
        }
    },
    created(){
       this.searchVal = locationSearch('searchVal');
       this.getSearchItem_list(this.searchVal,1)
    },
    watch:{
    },
    methods: {
        loadMore(){
            if(this.queryLoading){
                return;
            }
            this.queryLoading = true;
            if(this.currentPage<=this.pageCount){
                this.getSearchItem_list(this.searchVal,this.currentPage);
            }else{
                console.log('over')
            }
        },
        search(){
            this.currentPage = 1;
            this.pageCount = 1;
            this.searchResult = [];
            this.getSearchItem_list(this.searchVal,1);
        },
        async getSearchItem_list(keyword,currentPage){
            const wip = await api.getSearchItem_list(keyword,currentPage);
            this.searchResult.push(...wip.values);
            this.pageCount = wip.pageCount;
            this.currentPage++;
            this.allLoaded = this.currentPage>=this.pageCount;
            // this.session_list.push(last);
            this.queryLoading = false;
        },
    },
    components:{
        SpacialSaleGoodsItem,EasyPaymentGoodsItem,PintuanGoodsItem
    },
    mounted () {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.search_result{
    .search_input{
        width: 375px;
        height: 44px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 6px;
        position: fixed;
        top: 0;
        left: 0;
        background: white;
        z-index: 99;
        i{
            flex:none;
            width: 32px;
            height: 32px;
            background: url('~@/assets/order_navbar_arrow_back_icon@3x.png');
            background-size: 100% 100%;
        }
        input{
            flex:1;
            height: 32px;
            background: #f7f8fa;
            border-radius: 4px;
            margin: 0 5px;
            padding: 5px 10px;
            font-size: 12px;
        }
        span{
            flex:none;
            width: 45px;
            height: 32px;
            text-align: center;
            line-height: 32px;
            font-size: 14px;
        }
    }
    .search_result_content,{
        padding: 60px 16px 16px;
        box-sizing: border-box;
        min-height: 667px;
        background: #F7F8FA;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .search_result_null{
        padding: 60px 16px 16px;
        box-sizing: border-box;
        min-height: 667px;
        background: #F7F8FA;
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
            width: 110px;
            height: 110px;
            margin:150px 0 20px;
        }
        p{
            font-size: 14px;
            color:#B2B2B2;
        }
    }
}
</style>
