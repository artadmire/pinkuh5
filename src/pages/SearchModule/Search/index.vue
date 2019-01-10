<template>
    <div class="search">
        <div class="search_header">
            <div>
                <input v-model="searchVal" placeholder="请输入商品的名字，折扣无限" @keyup.enter="search" type="search">
            </div>
            <span @click='search' >搜索</span>
        </div>
        <SearchHistory />
        <SearchRecommend />
        <Footer></Footer>
    </div>
</template>

<script>
import SearchHistory from './components/SearchHistory'
import SearchRecommend from './components/SearchRecommend'
import { mapMutations } from 'vuex';
export default {
    props:{
    },
    data(){
        return{
            searchVal:''
        }
    },
    created(){
       this.newFooterState({
            tab1: false,
            tab2: true,
            tab3:false,
            tab4: false
        })
        window.localStorage.footerState = JSON.stringify({
            tab1: false,
            tab2: true,
            tab3:false,
            tab4: false
        });
    },
    methods: {
        ...mapMutations(['newFooterState']),
        search(){
            if(this.searchVal){
                let historyRecord = window.localStorage.historyRecord?JSON.parse(window.localStorage.historyRecord):[];
                //或者超过10个
                if(historyRecord.length>=10){
                    historyRecord = historyRecord.slice(1);
                }
                //判断是否有重复的
                if(historyRecord.indexOf(this.searchVal) != -1){
                    historyRecord.splice(historyRecord.indexOf(this.searchVal),1);
                }
                historyRecord.push(this.searchVal);
                historyRecord.reverse();
                window.localStorage.historyRecord = JSON.stringify(historyRecord);
                this.$router.push({
                    path: "./search_result?searchVal="+this.searchVal
                });
            }
        },
    },
    components:{
        SearchHistory,SearchRecommend
    },
    mounted () {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.search{
    .search_header{
        width: 100%;
        height: 44px;
        display: flex;
        align-items: center;
        padding-left: 20px;
        border-bottom: 1px solid #F4F4F4;/*no*/
        >div{
            width: 305px;
            height: 32px;
            background: #F7F8FA;
            border-radius: 4px;
            display: flex;
            box-sizing: border-box;
            padding: 0 10px;
            align-items: center;
            input{
                flex:1;
                font-size: 14px;
                background: #F7F8FA;
                font-size: 12px;
            }
        }
        >span{
            width: 40px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            color: #737373;
        }
    }
}
</style>
