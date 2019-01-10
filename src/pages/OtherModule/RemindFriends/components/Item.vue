<template>
    <li>
        <img class="huangguan" v-if='listIndex==0' src="~@/assets/invitation_open_crown_1_icon.png" alt="">
        <img class="huangguan" v-else-if='listIndex==1' src="~@/assets/invitation_open_crown_2_icon.png" alt="">
        <img class="huangguan" v-else-if='listIndex==2' src="~@/assets/invitation_open_crown_3_icon.png" alt="">
        <img :src="avatarUrl" alt="">
        <span>{{item.nick}}</span>
        <em>已赚{{income}}元</em>
    </li>
</template>

<script>
export default {
    props:{
        item:{
            type:Object,
            default:{}
        },
        listIndex:{
            type:Number,
            default:0
        }
    },
    data(){
        return{
            imgUrl: require("@/assets/usercenter_avatar_default.png"), //设置一个默认值
        }
    },
    computed:{
        avatarUrl(){
            if(this.item.avatar){
                return this.item.avatar+'@!400'
            }else{
                return imgUrl
            }
        },
        income(){
            return this.item.income
        }
    },
    created(){
       
    },
    methods: {
        
    },
    mounted () {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
li{
    width: 220px;
    height: 36px;
    margin:10px 0;
    position: relative;
    background: #a63336;
    border-radius: 30px;
    line-height: 36px;
    display: flex;
    align-items: center;
    position: relative;
    font-size: 12px;
    .huangguan{
        position: absolute;
        width: 27px;
        height: 25px;
        left: -10px;
        top: -18px;
        object-fit: cover;
    }
    img{
        width: 36px;
        height: 36px;
        object-fit: cover;
        border-radius: 50%;
    }
    span{
        padding-left: 5px;
        color: white;
        display: block;
        width: 72px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    em{
        position: absolute;
        right: 10px;
        color: #FDDCA1;
    }
}
</style>
