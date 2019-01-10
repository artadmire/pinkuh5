<template>
    <div class='bountyincom' @click="isShow" v-if="hunterStore.bountyincomstate">
        <div class="tab" ref="income" @click.stop="funcvoid">
            <div  class="top"><span>赏金猎人 权益详情</span></div>
            <ul>
                <li v-for="(item,index) in showInfo" :key="index"><div><p>{{ item.showTitle }}</p><span>{{ item.explain }}</span></div><span>¥{{ item.cent | save2Point}}</span></li>
            </ul>
            <p @click.self="isShow" >知道了</p>
        </div>
    </div>
</template>

<script>
import { mapState,mapMutations } from "vuex"

export default {
    name:"Bountyincom",
    props:{
        showInfo:{
            type:Array,
            default:[]
        }
    },
    data(){
        return{
            
        }
    },
    computed:{
        ...mapState(['hunterStore']),
       
    },
    
    created(){
       
    },
    methods: {
        ...mapMutations(["changebountyincomStatus"]),
        isShow(){
            //console.log(22)
           this.changebountyincomStatus(false)
            document.body.style.overflow='';//出现滚动条
        },
        funcvoid(){

        }
       
    },

    filters:{
        save2Point(value){
                    return parseFloat(value/100).toFixed(2)
                },
    },
    
    mounted () {
         
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.bountyincom{
    width:100%;
    height:16rem;
    background: rgba(0,0,0,0.5);
    position: fixed;
    top:0;
    left:0;
    z-index: 200;
    display: flex;
    justify-content: center;
    align-items: center;
    .tab{
        width:300px;
        background: white;
        .top {
            width:100%;
            height:100px;
            line-height: 100px;
            text-align: center;
            border-bottom:  1px solid #F4F4F4;/*no*/
            background: url("~@/assets/vip_page_earnings_bg_pic.png") 100% 100% /contain;
            span{
                font-size: 20px;
                color:#A9773A;
            }
        }
        ul {
            width: 100%;
            box-sizing: border-box;
            padding:10px 20px 20px 20px;
            li{
                width:260px;
                height:50px;
                border-bottom: 1px solid #F4F4F4;/*no*/
                display: flex;
                justify-content: space-between;
                align-items:center;
                div{
                    p{
                        margin-bottom: 8px;
                        font-size: 14px;
                        color:#141414;
                    }
                    span{
                        font-size: 12px;
                        color:#B2B2B2;

                    }
                }
                >span {
                    font-size:16px;
                    color:#FFAE1D;
                }
            }
        }
        >p{
            width:220px;
            margin:0 auto;
            margin-bottom: 20px;
            height:32px;
            background: linear-gradient(bottom,#FFC456,#FFD9B3);
            border-radius: 4px;
            color:#98470C;
            font-size:14px;
            text-align: center;
            line-height: 32px;
        }
    }
    
}
</style>
