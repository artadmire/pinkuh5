<template>
    <div class='gold_coin_task'>
        <img  v-lazy="imgurl" alt="">
        <div class="to_do_task" @click='navigateTo'>立即邀请猎人</div>
    </div>
</template>

<script>
import pk from '@/util/pk.js'
import { mapState, mapMutations } from 'vuex';
export default {
    props:{
    },
    data(){
        return{
            imgurl:require('static@/img/rights_7_pic.png')
        }
    },
    created(){
       
    },
    computed:{
        ...mapState(['hunterStore'])
    },
    methods: {
        ...mapMutations(['changeJionHunterToastStatus']),
        navigateTo(){
            if(this.hunterStore.hunterInfo.type==0){
                this.changeJionHunterToastStatus(true)
            }else{
                pk.navigateTo(
                    {
                        url:'pinkumall://default/invite_hunter'
                    },
                )
            }
            
        }
    },
    mounted () {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.gold_coin_task{
    width: 100%;
    box-sizing: border-box;
    padding:  10px 0px;
    display: flex;
    flex-direction: column;
    background: #f7f8fa;
    align-items: center;
    img{
        width: 90%;
        //height: 180px;
        object-fit: cover;
    }
    .to_do_task{
        width: 90%;
        height: 48px;
        background: linear-gradient(top,#FFD9B3,#FFC456);
        margin: 10px auto;
        line-height: 48px;
        font-size: 18px;
        text-align: center;
        color: #98470C;
        border-radius: 5px;
    }
}
</style>
