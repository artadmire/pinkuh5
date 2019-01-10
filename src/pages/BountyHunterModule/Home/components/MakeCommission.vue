<template>
    <div class='gold_coin_task'>
        <img  v-lazy="imgurl" alt="">
        <div class="comminssion_detail" v-if='showStatus'>
            <ul class="comminssion_detail_tab">
                <li>
                    <p>{{dataInfo.unearnCent|| 0 | save2Point}}元</p>
                    <p>待入账</p>
                </li>
                <li>
                    <p>{{dataInfo.unSettleCent|| 0 | save2Point}}元</p>
                    <p>待结算</p>
                </li>
                <li>
                    <p>{{dataInfo.settleCent|| 0 | save2Point}}元</p>
                    <p>已结算</p>
                </li>
            </ul>
            <div class="show_more_comminssion" @click='navigateTo'>
                查看更多明细>
            </div>
        </div>
    </div>
</template>

<script>
import pk from '@/util/pk.js'
import api from '../api.js'
import { mapState } from 'vuex';
export default {
    props:{
    },
    data(){
        return{
            dataInfo:{},
            imgurl:require('static@/img/rights_8_pic.png'),
            showStatus:true
        }
    },
    created(){
        this.getIncome();
        if(this.hunterStore.hunterInfo.type==0){
            this.showStatus = false
        }else if(this.hunterStore.hunterInfo.type==1){
            this.showStatus = true
        }
    }, 
    computed:{
        ...mapState(['hunterStore'])
    },
    methods: {
        async getIncome(){
            let wip = await api.getIncome();
            this.dataInfo = wip.value

        },
        navigateTo(){
            pk.navigateTo(
                {
                    url:'pinkumall://default/hunter_income'
                },
            )
        }
    },
    filters: {
        save2Point(value){
            return parseFloat(value/100).toFixed(2)
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
    display: flex;
    flex-direction: column;
    background: #f7f8fa;
    align-items: center;
    img{
        padding:  10px 0px;
        width: 90%;
        //height: 180px;
        object-fit: cover;
    }
    .comminssion_detail{
        background: white;
        .comminssion_detail_tab{
            width: 100%;
            height: 110px;
            // background: $fontColor;
            box-sizing: border-box;
            padding: 30px 0px 10px;
            color: $lightGray;
            display: flex;
            font-size: 18px;
            text-align: center;
            li{
                flex:1;
                border-right: 2px solid #DEE1E7;
                p:nth-child(1){
                    line-height: 40px;
                    color: $HunterThemeColor;
                }
            }
            li:nth-child(3){
                border:0;
            }
            
        }
        .show_more_comminssion{
            width: 300px;
            height: 48px;
            line-height: 48px;
            text-align: center;
            margin: 0px auto;
            font-size: 12px;
            // background: $HunterThemeColor;
            color: $lightGray;
            border-radius: 5px;
        }
    }
}
</style>
