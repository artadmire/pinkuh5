<template>
    <dl class="search_history">
        <div v-if='historyRecord.length'>
            <dt>
                <span>历史记录</span>
                <span @click='delHistory'></span>
            </dt>
            <dd>
                <span v-for='(item,index) in historyRecord' :key='index' @click='search(item)'>{{item}}</span>
            </dd>
        </div>
       
       <Confirm v-if='confirmStatus' :confirmStatus='confirmStatus' :title='"确认删除历史记录吗?"' :confirmFunc='confirmFunc' @ListenFromConfirm='ListenFromConfirm' />
    </dl>
</template>

<script>
import Confirm from '@/pages/common_components/Confirm'
export default {
    props:{
    },
    data(){
        return{
            confirmStatus:false,
            confirmFunc:null,
            historyRecord:[]
        }
    },
    created(){
       if(window.localStorage.historyRecord){
           this.historyRecord = JSON.parse(window.localStorage.historyRecord);
       }
    },
    methods: {
        delHistory(){
            this.confirmFunc = ()=>{
                this.confirmStatus = false;
                window.localStorage.historyRecord = [];
                this.historyRecord = [];
            }
            this.confirmStatus = true;
        },
        ListenFromConfirm(status){
            this.confirmStatus = status;
        },
        search(value){
            this.$router.push({
                path: "./search_result?searchVal="+value
            });
        }
    },
    components:{
        Confirm
    },
    mounted () {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
@import "~@/common/css/var.scss";
.search_history{
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
        span:nth-child(2){
            width: 25px;
            height: 25px;
            background: url('~@/assets/search_page_history_delete_icon@3x.png');
            background-size: 100% 100%;
        }
    }
    dd{
        display: flex;
        flex-wrap: wrap;
        span{
            padding: 0 12px;
            height: 25px;
            line-height: 25px;
            border: 1px solid #b2b2b2;/*no*/
            color: #737373;
            border-radius: 4px;
            margin:0 8px 10px 0;
        }
    }
}

</style>
