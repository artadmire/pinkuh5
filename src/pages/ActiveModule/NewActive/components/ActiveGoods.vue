<template>
<div >
     <ul v-if='data.type=="ITEM_LIST"' class="Active_goods" >
        <li v-for='(item,index) in idsArr' :key='index' >
           <router-link v-if='data.items'  :to="{path:'./detail',query:{id:data.items?(data.items[index].id):1}}">
                <img v-lazy="data.items?(imgUrl+data.items[index].pic+'@!400'):''" alt="">
                <img v-lazy="data.items?(imgUrl+data.items[index].brandLogo+'@!200'):''" alt="">
                <p>{{data.items?data.items[index].title:''}}</p>
                <p class="goods"><i>￥{{data.items?data.items[index].salePriceCent:''|transMoney00}}</i><em>￥{{data.items?data.items[index].originalPriceCent:''|transMoney00}}</em></p>
                <p> 
                    <span :style='{background:colorSchema.themeColor,}'><i>{{data.items?data.items[index].discountPercentage:''|transMoney0}}</i><em>折起</em></span>
                    <span :style='{color:colorSchema.themeColor,border:"1px solid "+colorSchema.themeColor}'>立即购买</span>
                </p>
           </router-link>
        </li>
    </ul>
    <ul v-else-if='data.type=="SESSION_LIST"'  class="Active_session"   >
         <li  v-for='(item,index) in idsArr' :key="index" >
            <router-link v-if='data.sessions' :to='{path:"./special",query:{sessionId:data.sessions?(data.sessions[index].id):1}}'>
                <img v-lazy="data.sessions?(imgUrl+data.sessions[index].pic+'@!400'):''" alt="">
                <img v-lazy='data.sessions?(imgUrl+data.sessions[index].brandLogo+"@!200"):""' alt="">
                <p>{{data.sessions?(data.sessions[index].title):''}}</p>
                <p class="session">全场满<b :style='{color:colorSchema.themeColor}'>{{data.sessions?(data.sessions[index].discountThresholdCent):'' |transMoney }}</b>减<b :style='{color:colorSchema.themeColor}'>{{data.sessions?(data.sessions[index].discountCent):'' |transMoney }}</b></p>
                <p>
                    <span :style='{background:colorSchema.themeColor}' ><i>{{data.sessions?(data.sessions[index].minDiscountPercentage):''| transMoney0}}</i><em>折起</em></span>
                    <span :style='{color:colorSchema.themeColor,border:"1px solid "+colorSchema.themeColor}'>进入专场</span>
                </p>
            </router-link>
        </li>
    </ul>
</div>
   
</template>
  
<script>
export default {
  name: "Header",
  props:{
      simpleData:{
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
        data:[
        ]
    };
  },
  watch:{
      data(newvalue,oldValue){
      }
  },
  computed:{
      idsArr(){
        let wipIds = this.data.ids.split(' ').filter(item=>item!=='');
        return wipIds
    }
  },
  created() {
         this.imgUrl = this.imgUrlPrefix
      ? this.imgUrlPrefix
      : localStorage.imgUrlPrefix;
  },
  mounted(){
      this.$nextTick(()=>{
          this.data = this.simpleData;
      })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.Active_goods,.Active_session{
    display: flex;
    flex-wrap: wrap;
    width: 339px;
    padding: 0px 18px 0;
    justify-content: space-between;
    li{
        a{
            width: 164px;
            height: 280px;
            overflow: hidden;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            background: white;
            position: relative;
            margin: 0px 0 10px;
            cursor: pointer;
            img:nth-child(1){
                width: 156px;
                height: 156px;
                object-fit: cover;
                margin: 4px auto;
                border-radius: 3px;
            }
            img:nth-child(2){
                width:46px;
                height: 46px;
                border-radius: 50%;
                margin: -23px auto 0;
                border:1px solid #dee1e7;/*no*/
                box-sizing: border-box;
                object-fit: cover;
                background: white;
            }
            p{
                width: 100%;
                box-sizing: border-box;
            }
            p:nth-child(3){
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin: 10px auto 0;
                color: $fontColor;
                font-size: 12px;
                padding: 0 12px;
                line-height: 16px;
                height: 32px;
            }
            p:nth-child(4).goods{
                padding: 0 12px;
                i{
                    font-family:PingFangSC-Regular;
                    font-size:16px;
                    color: $fontColor;
                }
                em{
                    display: inline-block;
                    padding-left: 5px;
                    font-size:12px;
                    transform: scale(0.9);
                    color:$gray;
                    text-decoration: line-through;
                }
            }
            p:nth-child(4).session{
                text-align: center;
                font-size: 12px;
                color: $gray;
                b{
                    font-size: 16px;
                    color: red;
                }
            }
            p:nth-child(5){
                position: absolute;
                bottom: 5px;
                left: 0;
                display: flex;
                width: 100%;
                justify-content: center;
                span{
                    width: 78px;
                    text-align: center;
                    height: 26px;
                    line-height: 26px;
                }
                span:nth-child(1){
                    border-top-left-radius: 5px;
                    border-bottom-left-radius: 5px;
                    color: white;
                    i{
                        font-size: 16px;
                    }
                    em{
                        display: inline-block;
                        transform: scale(0.9);
                    }
                }
                span:nth-child(2){
                    box-sizing: border-box;
                    border-top-right-radius: 5px;
                    border-bottom-right-radius: 5px;
                }
            }
        }
       
    }
}
.Active_session li a{
     p:nth-child(3){
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        margin: 10px auto;
        color: $fontColor;
        font-size: 14px;
        padding: 0 12px;
        line-height: 16px;
        height: 16px;
    }
}
</style>
