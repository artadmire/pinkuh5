<template>
    <div class='more_pintuan_list'>
        <div class="box">
            <div class="box_top">
                正在拼团
                <img src="~@/assets/detail_order_delete_icon@3x.png" alt="" @click='closeMorePintuanList(false)'>
            </div>
            <ul>
                <MorePintuanItem v-for='(item,index) in dataInfo.values' :key='index' :itemInfo='item'></MorePintuanItem>
            </ul>
        </div>
    </div>
</template>

<script>
import MorePintuanItem from './MorePintuanItem'
import { mapMutations } from 'vuex';
export default {
    props:{
        dataInfo:{
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
        ...mapMutations(['newMorePintuanListState']),
        closeMorePintuanList(state){
            this.newMorePintuanListState(state)
        }
    },
    components: {
        MorePintuanItem  
    },
    mounted () {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.more_pintuan_list{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index:10000;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .box{
        width: 300px;
        height: 392px;
        background: white;
        border-radius: 3px;
        .box_top{
            height: 40px;
            line-height: 40px;
            text-align: center;
            position: relative;
            font-size: 12px;
            border-bottom: 1px solid #f4f4f4;/*no*/
            img{
                position: absolute;
                width: 16px;
                height: 16px;
                right: 8px;
                padding: 12px;
            }
        }
        ul{
            height: 352px;
            overflow: auto;
        }
        ul::-webkit-scrollbar{
            display: none;
        }
    }
}
</style>
