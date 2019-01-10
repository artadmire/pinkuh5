<template>
    <li v-if='isShow'>
        <div class="li_left">
            <img v-if='itemInfo.avatar' :src="commonSrore.imgUrlPrefix+itemInfo.avatar+'@!400'" alt="">
            <img v-else src="~static@/img/avator.png" alt="">
            <span>{{itemInfo.nick}}</span>
        </div>
        <div class="li_right">
            <div>
                <p>再有<i>{{itemInfo.leftQuota}}人</i>拼成</p>
                <p>剩余{{time}}</p>
            </div>
            <div @click='callUpParticpateTuan(true)'>去拼团</div>
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
    computed:{
        ...mapState(['commonSrore'])

    },
    created(){
       
    },
    methods: {
        ...mapMutations(['newParticpateTuanState','newParticpateTuanId']),
        callUpParticpateTuan(state){
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
    justify-content: space-between;
    border-bottom: 1px solid #f4f4f4; /*no*/
    .li_left{
        display: flex;
        align-items: center;
        img{
            width: 44px;
            height: 44px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 10px;
        }
        span{
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100px;
            
        }
    }
    .li_right{
        display: flex;
        align-items: center;
        >div:nth-child(1){
            text-align: right;
            margin-right: 10px;
            p{
                line-height: 15px;
                font-family:'Helvetica Neue';
                i{
                    color: $pink;
                }
            }

        }
        >div:nth-child(2){
            width: 56px;
            height: 25px;
            background: $pink;
            border-radius:20px;
            line-height: 25px;
            text-align: center;
            color: white;
        }
    }
}
</style>
