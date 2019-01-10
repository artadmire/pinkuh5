<template>
    <div class="markets">
        <TitleBack :arrowLeftStatus='false' :title='"爆好货专场"' /> 
        <MarketsTabs class="marketsTabs" :groups='groups' @ListenFromMarketsTabs='ListenFromMarketsTabs'/>
        <div class="brand_list" 
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="queryLoading"
            infinite-scroll-distance="10"
            infinite-scroll-immediate-check='false'>
            <BrandItem v-for='(item,index) in session_list' :key='index' :item='item'/>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Vue from 'vue'
import MarketsTabs from './components/markets-tabs' 
import TitleBack from '@/pages/common_components/TitleBack'
import BrandItem from '@/pages/GoodsModule/Home/components/BrandItem'
import { InfiniteScroll } from 'mint-ui';
import { Spinner } from 'mint-ui';
import { mapMutations } from 'vuex';
import api from './api.js'
Vue.use(InfiniteScroll);
Vue.component(Spinner.name, Spinner);
export default {
    props:{
    },
    data(){
        return{
            queryLoading:false,
            pageCount: 1,
            currentPage:1,
            groups:[],
            session_list:[],
            groupId:null,
        }
    },
    created(){
       this.newFooterState({
            tab1: false,
            tab2: false,
            tab3:true,
            tab4: false
        })
        window.localStorage.footerState = JSON.stringify({
            tab1: false,
            tab2: false,
            tab3:true,
            tab4: false
        });
        this.getGroup_all();
    },
    methods: {
        ...mapMutations(['newFooterState']),
        loadMore() {
            if(this.queryLoading){
                return;
            }
            this.queryLoading = true;
            if(this.currentPage<=this.pageCount){
                this.getGroup_brand_list(this.groupId,this.currentPage);
            }else{
                console.log('over')
            }
        },
        ListenFromMarketsTabs(value){
            this.init(value);
        },
        init(value){
            this.groupId = value;
            this.currentPage = 1;
            this.pageCount = 1;
            this.session_list = [];
            this.getGroup_brand_list(this.groupId,this.currentPage)
        },
        async getGroup_all(){
            const wip =await api.getGroup_all();
            this.groups = wip.groups;
            this.groupId = this.groups[0].id;
            this.getGroup_brand_list(this.groupId,1);
        },
        async getGroup_brand_list(groupId,currentPage){
            const wip = await api.getGroup_brand_list(groupId,currentPage);
            this.session_list.push(...wip.values);
            this.pageCount = wip.pageCount;
            this.currentPage++;
            this.allLoaded = this.currentPage>=this.pageCount;
            // this.session_list.push(last);
            this.queryLoading = false;
        }
    },
    components:{
        MarketsTabs,TitleBack,BrandItem
    },
    mounted () {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.brand_list {
  width: 335px; // max-width: 414px;
  min-height: 500px;
  margin: 0 auto;
  padding-top: 88px;
}
.marketsTabs{
    position: fixed;
    top: 44px;
    left: 0;
    z-index: 99;
    background: white;
}
</style>
