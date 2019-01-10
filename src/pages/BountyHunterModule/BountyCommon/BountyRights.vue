<template>
    <div class="bountyRights">
        <ShareSuperiorGoods :dataInfo='hunterStore.bountyRightsList[0]' :itemIndex='0'></ShareSuperiorGoods>
        <Rights v-for='(item,index) in hunterStore.bountyRightsList' v-if='index<9&&index>0' :key='index' :dataInfo='item' :itemIndex='index'></Rights>
    </div>
</template>

<script>
import Rights from './Rights'
import ShareSuperiorGoods from './ShareSuperiorGoods'
import { mapState } from 'vuex';
export default {
    props:{
    },
    data(){
        return{
            
        }
    },
    created(){
       
    },  
    computed:{
        ...mapState(['hunterStore']),
    },
    methods: {
        
    },
    components: {
        Rights,ShareSuperiorGoods
    },
    mounted () {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.bountyRights{
    width: 335px;
    box-sizing: border-box;
    margin: -110px auto 15px;
    background:white;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 15px 7px 10px;
}
</style>
