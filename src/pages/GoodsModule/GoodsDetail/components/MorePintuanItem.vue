<template>
    <li >
        <img :src="commonStore.imgUrlPrefix+itemInfo.avatar+'@!400'" alt="">
        <div>
            <p>{{itemInfo.nick}}</p>
            <p>剩余{{time}}</p>
        </div>
        <div>
            还差{{itemInfo.leftQuota}}人
        </div>
        <div class="goToPintuan" @click='callUpParticpateTuan(true)'>
            去拼团
        </div>
    </li>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {formatTime} from '@/util'
export default {
    props:{
        itemInfo:{
            type:Object,
            default:{}
        }
    },
    data(){
        return{
            timer:null,
            time:'00:00:00.0',
            isShow:true
        }
    },
    created(){
       
    },
    computed:{
        ...mapState(['commonStore'])
    },
    methods: {
        ...mapMutations(['newParticpateTuanState','newMorePintuanListState','newParticpateTuanId']),
        callUpParticpateTuan(state){
            this.newMorePintuanListState(false);
            this.newParticpateTuanState(state);
            this.newParticpateTuanId(this.itemInfo.tuanId)
        }
    },
    mounted () {
        let wiptime = this.itemInfo.endTime;
        this.timer =  setInterval(()=>{
            this.time = formatTime(wiptime);
            // console.log(this.time)
            if(this.time.indexOf('-')!=-1){
                this.isShow = false;
                clearInterval(this.timer)
            }else{
                this.isShow = true;
            }
        },100)
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
li{
    height: 64px;
    display: flex;
    width: 260px;
    align-items: center;
    margin: 0 auto;
    border-bottom: 1px solid #f4f4f4; /*no*/
    justify-content: space-between;
    img{
        width: 44px;
        height: 44px;
        border-radius: 50%;
        object-fit: cover;
    }
    >div:nth-child(2){
        line-height: 15px;
        p{
            font-family:'Helvetica Neue';
        }
    }
    .goToPintuan{
        width: 56px;
        height: 25px;
        background: $pink;
        border-radius: 20px;
        line-height: 25px;
        text-align: center;
        color: white;
    }
}
</style>
