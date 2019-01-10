<template>
    <dl class="search_recommend">
       <dt>
           <span>热门推荐</span>
       </dt>
       <dd>
           <span v-for='(item,index) in hotWords' :key='index' @click='search(item)'>{{item}}</span>
       </dd>
    </dl>
</template>

<script>
import api from '../api.js'
export default {
    props:{
    },
    data(){
        return{
            hotWords:[]
        }
    },
    created(){
       this.getHot_words();
    },
    methods: {
        async getHot_words(){
            const wip = await api.getHot_words();
            this.hotWords = wip.hotWords;
        },
        search(value){
            this.$router.push({
                path: "./search_result?searchVal="+value
            });
        }
    },
    mounted () {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.search_recommend{
    padding: 0 20px;
    dt{
        width: 100%;
        height: 44px;
        display: flex;
        justify-content: space-between;
        line-height: 44px;
        box-sizing: border-box;
        align-items: center;
        span:nth-child(1){
            color: #737373;
        }
    }
    dd{
        display: flex;
        flex-wrap: wrap;
        span{
            padding: 0 12px;
            height: 25px;
            line-height: 25px;
            border: 1px solid #FF3C3A;/*no*/
            border-radius: 4px;
            margin:0 8px 10px 0;
            color: #FF3C3A;
        }
    }
}
</style>
