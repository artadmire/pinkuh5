<template>
    <div class="hunter_info_box">
        <div class="hunter_info">
            <img v-if='userInfo.avatar' :src="userInfo.avatar+'@!400'" alt="">
            <img v-else src="@/assets/usercenter_avatar_default.png" alt="">
            <div class="info">
                <p>{{userInfo.nick}}</p>
                <p>您将赚取{{userInfo.incomeCent | parse2point}}元</p>
            </div>
            <router-link to='/bountyhunter/payhunter' class="join_now">立即加入</router-link>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    props:{
        userInfo:{
            type:Object,
            default:{}
        }
    },
    data(){
        return{
        }
    },
    computed: {
    },
    created(){
    },
    methods: {
        
    },
    filters:{
        parse2point(value){
            if(value>0){
                 return parseFloat(value/100).toFixed(2)
            }else{
                return 0;
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
    height: 190px;
    box-sizing: border-box;
    padding-top: 10px;
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
            margin: 0 10px;
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
        }
        .join_now{
            flex:none;
            width: 100px;
            height: 45px;
            background: rgba($color: #F1A826, $alpha: 0.5);
            color: white;
            border-top-left-radius: 25px;
            border-bottom-left-radius: 25px;
            line-height: 45px;
            box-sizing: border-box;
            padding-left: 20px;
        }
    }
}
</style>
