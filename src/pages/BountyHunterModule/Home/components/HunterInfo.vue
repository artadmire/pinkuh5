<template>
    <div class="hunter_info_box" >
        <div class="hunter_info">
            <img v-if='userInfo.avatar' :src="userInfo.avatar+'@!400'" alt="">
            <img v-else src="@/assets/usercenter_avatar_default.png" alt="">
            <div class="info">
                <p>{{userInfo.nick}}</p>
                <p><span>您已赚取{{sumCent | parse2point}}元</span><img @click="isShows" src="~@/assets/vip_page_calculatoricon_icon.png" alt=""></p>
                <p @click='navigateTo'>查看提成明细 ></p>
                
            </div>
            <router-link class="join_now" to='/bountyhunter/payhunter'>
                <p>立即续费</p>
                <p>{{userInfo.expireTime | expireTime}}到期</p>
            </router-link>
        </div>
       
    </div>
</template>

<script>
import pk from '@/util/pk.js'
import { mapState , mapMutations } from "vuex";
import api from '../api.js'
//import Incomtab from './Incomtab'
export default {
    props:{
        userInfo:{
            type:Object,
            default:{}
        },
        sumCent:{
            type:Number,
            default:0
        }
    },
    data(){
        return{
            
        }
    },
    computed:{
        ...mapState["hunterStore"],
        
        Status(){
            return this.$store._vm._data.$$state.hunterStore.bountyincomstate
        }
    },
    created(){
      // console.log(this.$store._vm._data.$$state.hunterStore.bountyincomstate,"000")
       //
    },
    watch:{
       Status(curval,oldval){
           
           // console.log(curval)
            if(curval){
                this.stop()
                this.changemaxDistance(0.1)
                
            }else {
               // console.log(888)
                this.move()
                this.changemaxDistance(0)
            }
            
       }
    },
    methods: {
           
        ...mapMutations(['changebountyincomStatus',"changehunterincomeinfo","changemaxDistance"]),
        isShows(){
            //console.log(this.hunterStore.bountyincomstate)
            this.changebountyincomStatus(true)
            //console.log(22444)
            //
            document.body.style.overflow='hidden'
            
        },
        navigateTo(){
            pk.navigateTo(
                {
                    url:'pinkumall://default/hunter_income'
                }
            )
        },
        // async getHunterIncom(){
        //    let wip = await api.getHunterIncom()
          
        //     this.changehunterincomeinfo(wip.value.showInfo)
        //    console.log(wip)
        // },
        /***禁止滑动***/
        stop(){
           // console.log("stop")
           document.body.style.overflow='hidden';
            document.body.addEventListener("touchmove",this.mo,false);//禁止页面滑动
        } ,
        /***取消滑动限制***/
        move(){
           // console.log("move")
          // console.log("move")
           document.body.style.overflow=''
            document.body.removeEventListener("touchmove",this.mo,false);
        },
        mo(e){e.preventDefault()}
        
    },
    filters:{
        parse2point(value){
            if(value>0){
                 return parseFloat(value/100).toFixed(2)
            }else{
                return 0;
            }
        },
        expireTime(value){
            return value.split(' ')[0]
        }
    },
    
    mounted () {
    },
    components:{
         //Incomtab 
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
    position: relative;
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
        overflow: hidden;
        padding: 40px 0 0 20px;
        >img{
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
            margin: 0 2px 0 10px;
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
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 25px;
                span{
                    display: block;
                    font-size: 16px;
                    line-height: 25px;
                    width: 130px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                img{
                    display: block;
                    height:20px;
                    width:20px;
                }
            }
            p:nth-child(3){
                color: $HunterThemeColor;
                line-height: 25px;
               
            }
        }
        .join_now{
            color: white;
            flex:none;
            width: 120px;
            height: 50px;
            transform: scale(0.9);
           // margin-right: -6px;
            background: rgba($color: #F1A826, $alpha: 0.5);
            border-top-left-radius: 25px;
            border-bottom-left-radius: 25px;
            line-height: 20px;
            box-sizing: border-box;
            padding: 5px 0 5px 18px;
            p:nth-child(1){
                font-size: 14px;
            }
            p:nth-child(2){
                font-size: 12px;
                color: $lightGray;
                
            }
        }
    }
}
</style>
