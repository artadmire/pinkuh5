<template>
    <div class="hunter_info_box">
        <div class="hunter_info">
            <img v-if='userInfo.avatar' :src="userInfo.avatar+'@!400'" alt="">
            <img v-else src="@/assets/usercenter_avatar_default.png" alt="">
            <div class="info">
                <p>{{userInfo.nick}}</p>
                <p>累计已返{{userInfo.incomeCent | parse2point}}元  </p>
                <p @click='navigateTo'>返现明细 ></p>
            </div>
            <router-link class="join_now" to='/vip/payvip'>
                <p>立即续费</p>
                <p >{{userInfo.payExpireTime | payExpireTime}}到期</p>
            </router-link>
        </div>
    </div>
</template>

<script>
import pk from '@/util/pk.js'
export default {
    props:{
        userInfo:{
            type:Object,
            default:{
                payExpireTime:'00-00-00 00:00:00'
            }
        }
    },
    data(){
        return{

        }
    },
    computed:{
    },
    created(){
       
    },
    methods: {
        navigateTo(){
            pk.navigateTo(
                {
                    url:'pinkumall://default/vip_cashback'
                }
            )
        },
    },
    filters:{
        parse2point(value){
            if(value>0){
                 return parseFloat(value/100).toFixed(2)
            }else{
                return 0;
            }
        },
        payExpireTime(value){
            if(value){
                return value.split(' ')[0]
            }else{
                return '0000-00-00'
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
.hunter_info_box{
    width: 375px;
    height: 200px;
    box-sizing: border-box;
    padding-top: 20px;
    background: #F2D8B5;
    .hunter_info{
        width: 355px;
        height: 160px;
        border:1px solid #141414;/*no*/
        margin: 0 auto;
        border-radius: 8px;
        box-shadow: 0 2px 7px #000; 
        box-sizing: border-box;
        display: flex;
        color: white;
        background: linear-gradient(left,#3E3433,#141414);
        padding: 40px 0 0 20px;
        img{
            flex:none;
            width: 60px;
            height: 60px;
            border: 1px solid $HunterThemeColor;/*no*/
            border-radius: 50%;
            box-shadow: 0 0 6px $HunterThemeColor;
            object-fit: cover;
        }
        .info{
            flex:1;
            margin: 0 0 0 10px;
            p:nth-child(1){
                font-size: 14px;
                color: $HunterThemeColor;
                line-height: 20px;
                width: 130px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            p:nth-child(2){
                font-size: 16px;
                line-height: 25px;
            }
            p:nth-child(3){
                color: $HunterThemeColor;
                line-height: 25px;
                font-size:12px;
            }
        }
        .join_now{
            color: #FFFFFF;
            flex:none;
            width: 120px;
            height: 50px;
            transform: scale(0.9);
            margin-right: -6px;
            background: rgba($color: #C49962, $alpha: 0.5);
            border-top-left-radius: 25px;
            border-bottom-left-radius: 25px;
            line-height: 20px;
            box-sizing: border-box;
            padding: 5px 0 5px 20px;
            p:nth-child(1){
                font-size: 12px;
            }
            p:nth-child(2){
                font-size: 9px;
                color: #B2B2B2;
            }
        }
    }
}
</style>
