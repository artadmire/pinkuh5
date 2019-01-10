<template>
    <div class="ParticipateTuan">
        <div class="box">
            <div class="box_top">
                参与Ta的拼团
                <img src="~@/assets/detail_order_delete_icon@3x.png" alt="" @click="closeParticpateTuan(false)">
            </div>
            <div class="box_content">
                <p>仅剩<i>{{detailInfo.leftQuota}}</i>个名额，{{time}}后结束</p>
                <div class="particpate_content_user">
                    <div :style="{margin:marginValue}" v-for='(item,index) in detailInfo.members' :key='index'>
                        <div class="tuanLeader" v-if='item.role==1'>{{item.roleDesc}}</div>
                        <img :src="item.avatar+'@!400'" alt="">
                    </div>
                    <div :style="{margin:marginValue}" class='noPeople' v-for='(item,index) in detailInfo.leftQuota' :key='index+"Gy"'>
                        <span>?</span>
                    </div>
                </div>
                <div class="particpate_content_bottom" @click='callUp(true)'>
                    参与拼团
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import api from '../api'
import {formatTime} from '@/util'
export default {
    props:{
        callUpState:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            detailInfo:{},
            timer:null,
            time:'00:00:00.0',
        }
    },
    computed:{
        ...mapState(['commonStore']),
        marginValue(){
            //60 是2，3，4，5的最小公倍数 rpx为是px的1/2
            return '0 '+60/(this.detailInfo.quota*this.detailInfo.quota).toFixed(2)+'px'
        },
    },
    created(){
       this.getTuanDetail(this.commonStore.particpateTuanId);
    },
    methods: {
        ...mapMutations(['newParticpateTuanState','newParticpateTuanId','newOrderParticpateTuanId']),
        closeParticpateTuan(state){
            //清除tuanId,此处为了区分判断创建订单的时候要不要带tuanId
            this.newParticpateTuanId(null)
            this.newParticpateTuanState(state);
        },
        async getTuanDetail(id){
            let wipData = await api.getTuanDetail(id);
            this.detailInfo = wipData.value;
            let wiptime = this.detailInfo.endTime;
            this.timer =  setInterval(()=>{
                this.time = formatTime(wiptime);
                // console.log(this.time)
                if(this.time.indexOf('-')!=-1){
                    // this.isShow = false;
                    clearInterval(this.timer)
                }
            },100)
        },
        callUp(state){
            this.$emit('ListenFromParticipateTuan',true);
            this.newParticpateTuanState(false);
            //此时参与别人的拼团，创建订单的时候应该带上tuanid
            this.newOrderParticpateTuanId(this.commonStore.particpateTuanId)
        }
    },
    mounted () {

    },
    destroyed () {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.ParticipateTuan{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .box{
        width: 300px;
        height: 210px;
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
        .box_content{
            display: flex;
            flex-direction: column;
            align-items: center;
            p{
                text-align: center;
                font-size: 12px;
                line-height: 40px;
                font-family:'Helvetica Neue';
                i{
                    color:$pink;
                }
            }
            .particpate_content_user{
                min-width: 120px;
                display: flex;
                padding:10px 15px 20px;
                justify-content: center;
                div{
                    width: 46px;
                    height: 46px;
                    border: 1px solid $pink;
                    /*no*/
                    border-radius: 50%;
                    position: relative;
                    text-align: center;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                }
                .tuanLeader{
                    position: absolute;
                    background:#fceded;
                    border:1px solid #f12b55;/*no*/
                    left: -10px;
                    top: -5px;
                    border-radius:20px;
                    width:31px;
                    height:15px;
                    line-height: 15px;
                    font-size: 10px;
                    color:#f12b55;
                    text-align: center;
                }
                span{
                    line-height: 46px;
                    color: $lightGray;
                }
                }
                .noPeople{
                    border:1px dashed $lightGray;/*no*/
                    font-size: 16px;
                }
            }
            .particpate_content_bottom{
                background:$pink;
                border-radius:30px;
                width:200px;
                height:32px;
                color: white;
                font-size: 14px;
                text-align: center;
                line-height: 32px;
            }
        }
    }
}
</style>
