<template>
    <div class="whitebar">
        <img src="../../../assets/defeated_icon_defult@3x.png" alt="">
        <span>哎呀，暂无信用额度！</span>
        <p>建议您多参加拼团、特卖、分期购、信用卡申请 或多邀请好友，并保持良好的信用记录！</p>
        <a href="" @click="navigateTo">返回首页</a>
    </div>
</template>

<script>
// import '@/util/PKBridge.js'
import pk from '@/util/pk.js'
export default {
   name:"Whitebar",
    data(){
        return{
            telephone:""
        }
    },
    created(){
        document.title = "开通白条"
    },
    methods: {
       navigateTo(){
            pk.navigateTo(
                {
                    url:'pinkumall://default/mall_home'
                }
            )
        }
    },
    mounted () {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.whitebar {
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
        width: 110px;
        height:110px;
        margin-top:80px;
    }
    span {
        font-size: 16px;
        color:$gray;
        margin-top:18px;
        margin-bottom: 7px;
    }
    p {
        width:294px;
        height:40px;
        color:$lightGray;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
    }
    a {
        width:335px;
        height:48px;
        box-sizing: border-box;
        border:1px solid #FF3C3A;/*no*/
        display: block;
        text-align: center;
        line-height: 48px;
        color:#FF3C3A;
        font-size: 16px;
        border-radius: 6px;
        margin-top:70px;
    }
}
</style>
