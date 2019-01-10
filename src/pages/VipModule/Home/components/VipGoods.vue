<template>
    <div class='vip_goods' >
        <p>- 黑卡会员精选商品 -</p>
        <ul>
            <vipGooditem v-for='(item,index) in itemList' :key='index' :itemInfo='item'></vipGooditem>
        </ul>
    </div>
</template>

<script>
import { nextpage } from '@/util'
import api from '@/pages/VipModule/Home/api.js'
import vipGooditem from './vipGooditem'
import {addEvent} from '@/util'
export default {
    data(){
        return{
            itemList : [],
            confirmcurrentPage:1,
            pageCount:1,
            currentpage:1

        }
    },
    created(){
        this.getCashBackGoodsList({currentPage:1,pageSize:8,groupId:-1})
    },
    methods: {
        async getCashBackGoodsList(config) {
           // if(this.currentpage == this.confirmcurrentPage && this.currentpage<=this.pageCount){
               // this.confirmcurrentPage = -1
                var wipdata = await api.getCashBackGoodsList(config);
                if(wipdata.succ) {
                    this.itemList.push(...wipdata.value.values);
                  //  this.currentpage++
                   // this.confirmcurrentPage = this.currentpage
                   // this.pageCount = wipdata.value.pageCount

                }
           // }

      },
    },
    filters: {
        parse2point(value){
            return parseFloat(value/100).toFixed(2)
        }
    },
    components:{ vipGooditem },
    mounted () {
        // addEvent(window,'scroll',() => {
            
        //     let top = document.documentElement.scrollTop || document.body.scrollTop;
        //     //文本高度
        //     let textHeight = document.body.scrollHeight;
        //     //屏幕高度
        //     let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //     //热卖商品高度
        //     //去掉热卖商品后高度取消
        //     if (textHeight - top - clientHeight < clientHeight / 2) {
        //         this.getCashBackGoodsList({currentPage:this.currentpage,pageSize:30,groupId:-1})
        //     }
        // })
     }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.vip_goods{
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background: #141414;
        >p{
            font-size: 18px;
            font-weight: bold;
            line-height: 50px;
            text-align: center;
            color:#F2D8B5;
            margin-top:10px;
        }
        ul{
            padding: 10px 20px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
    
}
</style>
