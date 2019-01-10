<template>
<div >
     <ul v-if='simpleData.type=="ITEM_LIST"' class="Active_goods" >
        <li v-for='(item,index) in idsArr'  :key='index' >
           <router-link v-if='simpleData.items'  :to="{path:'./detail',query:{id:simpleData.items?(simpleData.items[index].id):1}}">
                <img v-lazy="simpleData.items?(imgUrl+simpleData.items[index].pic+'@!400'):''" alt="">
                <p>{{simpleData.items?simpleData.items[index].title:''}}</p>
                <p class="goods" :style='{color:colorSchema.themeColor,}'>￥{{simpleData.items?simpleData.items[index].salePriceCent:''|transMoney00}}</p>
                <p> 
                    <span>￥{{simpleData.items?simpleData.items[index].originalPriceCent:''|transMoney00}}</span>
                    <em class="as" v-if="simpleData.items[index].itemType == 1 && simpleData.items[index].sessionInfo.discountPercent!=100 && simpleData.items[index].sessionInfo.discountPercent>=10 " :style='{background:colorSchema.themeColor,}'>{{simpleData.items ? simpleData.items[index].sessionInfo.discountPercent:''|transMoney0}}折</em>
                    <em class="as" v-else-if="simpleData.items[index].itemType == 1&&simpleData.items[index].sessionInfo.discountPercent<10" :style='{background:colorSchema.themeColor,}'>不足1折</em>
                    <em class="bs" v-else-if="simpleData.items[index].itemType == 3" :style='{background:colorSchema.themeColor,}'>{{simpleData.items ? simpleData.items[index].easyPaymentInfo.freeChargeDesc:''}}</em>
                </p>
           </router-link>
        </li>
    </ul>
    <ul v-else-if='simpleData.type=="SESSION_LIST"'  class="Active_session"   >
         <li v-for='(item,index) in idsArr' :key='index' >
           <router-link v-if='simpleData.items'  :to="{path:'./detail',query:{id:simpleData.items?(simpleData.items[index].id):1}}">
                <img v-lazy="simpleData.items?(imgUrl+simpleData.items[index].pic+'@!400'):''" alt="">
                <p>{{simpleData.items?simpleData.items[index].title:''}}</p>
                <p class="goods" :style='{background:colorSchema.themeColor,}'>￥{{simpleData.items?simpleData.items[index].salePriceCent:''|transMoney00}}</p>
                <p> 
                    <span>￥{{simpleData.items?simpleData.items[index].originalPriceCent:''|transMoney00}}</span>
                    <em :style='{background:colorSchema.themeColor,}'>{{simpleData.items?simpleData.items[index].discountPercentage:''|transMoney0}}期免息</em>
                </p>
           </router-link>
        </li>
    </ul>
</div>
   
</template>
  
<script>
export default {
  name: "ActiveType",
  props:{
      "simpleData":{
        'type':'',
        'layout':1,
        'ids':'',
        'sessions':[],
        'items':[]
      },
      'colorSchema':{
        "backgroundColor": "#33dd33",
        "themeColor": "#000000",
        "iconColor": "#330033"
      }
  },
  data() {
    return {
        imgUrl:'',
       
    };
  },
  watch:{
    
  },
  computed:{

      idsArr(){
        let wipIds = this.simpleData.ids.split(' ').filter(item=>item!=='');
        return wipIds
    }
  },
  created() {
      console.log(this.simpleData)
         this.imgUrl = this.imgUrlPrefix
      ? this.imgUrlPrefix
      : localStorage.imgUrlPrefix;
  },
  mounted(){
     
     
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.Active_goods,.Active_session{
    display: flex;
    flex-wrap: wrap;
    width: 343px;
    padding: 0px 16px 0;
    justify-content: flex-start;
    li{
        margin-right: 10px;
        margin-top: 10px;
        &:nth-of-type(1),&:nth-of-type(2),&:nth-of-type(3){
            margin-top: 0;
        }
        
        a{
            width: 107px;
            //height: 190px;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            background: white;
            position: relative;
            padding:5px 5px 10px 5px; 
            cursor: pointer;
            >img{
                width: 98px;
                height: 93px;
                object-fit: cover;
                border-radius: 3px;
            }
            p{
                width: 100%;
                box-sizing: border-box;
            }
            p:nth-of-type(1){
                height:32px;
                color:#141414;
                font-size: 11px;
                line-height: 16px;
                 overflow: hidden;
                -webkit-line-clamp:2;
                word-break:break-all;
                display:-webkit-box;
               -webkit-box-orient:vertical;
               margin: 5px auto;
            }
            p:nth-of-type(2){
               
                
                overflow: hidden;
                font-size: 14px;
                line-height: 18px;
            }
            p:nth-of-type(3){
                height:16px;
                line-height: 16px;
                position:relative;
                span{
                    display: block;
                    width: 58px;
                    height: 16px;
                    line-height: 16px;
                    color:#B2B2B2;
                    font-size:10px;
                    overflow: hidden;
                    text-decoration: line-through;
                }
                em{
                    position: absolute;
                    top:0;
                    right:-8px;
                    width:45px;
                    display: block;
                    color:white;
                    line-height: 16px;
                    height:16px;
                    width:45px;
                    font-size:8px;
                    border-radius: 10px 0px 0px 10px;
                    //text-indent: 7px;
                    text-align: center;
                }
            }
        }
    &:nth-of-type(3n){
            margin-right:0px; 
            }
    }
}
// .Active_session li a{
//      p:nth-of-type(3){
//          em{
//             font-size:8px;
//             text-align: center;
//         }
        
       
//     }
// }
</style>
