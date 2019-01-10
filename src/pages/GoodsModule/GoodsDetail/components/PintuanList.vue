<template>
    <div class="pintuan_container">
        <div class="pintuan_container_top">
            <span>{{dataInfo.desc}}</span>
            <span v-if='dataInfo.values.length>3' @click="callUpMorePintuanList(true)">更多拼团 <i>></i></span>
        </div>
        <ul>
            <PintuanItem v-for='(item,index) in dataInfo.values' :key='index' :itemInfo='item' v-if='index<3'></PintuanItem>
        </ul>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import PintuanItem from './pintuanItem'
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
    computed: {
        ...mapState(['commonStore']),
    },
    created(){
       
    },
    methods: {
        ...mapMutations(['newMorePintuanListState']),
        callUpMorePintuanList(state){
            this.newMorePintuanListState(state)

        }
    },
    components: {
        PintuanItem,
    },
    mounted () {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.pintuan_container{
    padding: 0 20px;
    .pintuan_container_top{
        height: 34px;
        font-size: 12px;
        line-height: 34px;
        display: flex;
        justify-content: space-between;
        span{
            i{
                color: $lightGray;
            }
        }
    }
}
</style>
