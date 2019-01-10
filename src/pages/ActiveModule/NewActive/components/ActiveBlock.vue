<template>
        <div v-if='dataInfo' :class='{havePadding:dataInfo.type!="BANNER"}' >
            <li class='bannerImg' v-if='dataInfo.type=="BANNER"' >
                <SchemeSimple  :url='dataInfo.url' :urlPrefix='imgUrl' :img='dataInfo.img' size='@!1200' />
            </li>
            <li  class="active_items_box"  v-else-if='dataInfo.type=="ITEM_LIST"&&dataInfo.layout=="1"'  v-for='(item,index) in idsArr' :key='index' >
               <router-link :style="{border:'4px solid'+colorSchema.themeColor,background:colorSchema.themeColor}" v-if='dataInfo.items' :to="{path:'./detail',query:{id:dataInfo.items[index].id}}" >
                    <div class="active_dd_box_left">
                        <img v-lazy='imgUrl+dataInfo.items[index].pic+"@!400"' alt="">
                    </div>
                    <div class="active_dd_box_right">
                        <p> <i :style='{background:colorSchema.iconColor}'><em>{{dataInfo.items[index].discountPercentage | transMoney0}}</em>折起</i> </p>
                        <p>{{dataInfo.items[index].title}}</p>
                        <p class="session"><i :style='{color:colorSchema.themeColor}'>￥{{dataInfo.items[index].salePriceCent | transMoney00}}</i><em>￥{{dataInfo.items[index].originalPriceCent | transMoney00}}</em></p>
                        <p><em :style='{background:colorSchema.themeColor}'>立即购买</em></p>
                    </div>
               </router-link>
            </li>
            <li  class="active_session_box" v-else-if='dataInfo.type=="SESSION_LIST"&&dataInfo.layout=="1"'  v-for='(item,index) in idsArr' :key='index' >
                <router-link  :style="{border:'4px solid'+colorSchema.themeColor,background:colorSchema.themeColor}" v-if='dataInfo.sessions' :to='{path:"./special",query:{sessionId:dataInfo.sessions[index].id}}'>
                    <div  class="active_dd_box_left">
                        <img v-lazy="imgUrl+dataInfo.sessions[index].pic+'@!400'" alt="">
                    </div>
                    <div  class="active_dd_box_right">
                        <p> <i :style='{background:colorSchema.iconColor}'><em>{{dataInfo.sessions[index].minDiscountPercentage | transMoney0}}</em>折起</i> </p>
                        <p >{{dataInfo.sessions[index].title}}</p>
                        <p class="goods">全场满<b :style='{color:colorSchema.themeColor}'>{{dataInfo.sessions[index].discountThresholdCent | transMoney}}</b>减<b :style='{color:colorSchema.themeColor}' >{{dataInfo.sessions[index].discountCent | transMoney}}</b></p>
                        <p><em :style='{background:colorSchema.themeColor}'>立即购买</em></p>
                    </div>
                </router-link>
            </li>
            <li  class="active_itemlist_box " v-else-if='dataInfo.layout=="2"' >
                <ActiveGoods :simpleData='dataInfo' :colorSchema='colorSchema'></ActiveGoods>
            </li>
            <li  class="active_itemlist_box " v-else-if='dataInfo.layout=="3"' >
                <ActiveType :simpleData='dataInfo' :colorSchema='colorSchema'></ActiveType>
            </li>
        </div>
</template>
  
<script>
import ActiveGoods from './ActiveGoods'
import ActiveType from './ActiveType'
export default {
  name: "Header",
  props:{
      'simpleData':{
          ids:'',
          type:'',
          layout:'',
          sessions:'',
          items:''
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
        dataInfo:{
            ids:'',
            type:'',
            layout:'',
            sessions:undefined,
            items:undefined
        }
    };
  },
  watch:{
    dataInfo:{
        handler(newValue,oldValue){
            // console.log(newValue);
            this.dataInfo = newValue
            // console.log(this.dataInfo)
        },
        deep: true
    }
  },
  computed: {
    idsArr(){
        let wipIds = this.dataInfo.ids.split(' ').filter(item=>item!=='');
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
        // this.dataInfo = this.simpleData;
        this.$set(this,'dataInfo',this.simpleData)
        console.log(this.dataInfo,777)
      })
  },
  components:{
    ActiveGoods,ActiveType
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
li.bannerImg{
    width: 100%;
    display: flex;
    flex-direction: column;
    img{
    width: 100%;
    }
}
.havePadding{
    padding: 10px 0 0;
}
li.active_session_box,li.active_items_box{
    a{
        width: 343px;
        margin: 0px auto 0;
        box-sizing: border-box;
        margin-bottom: 12px;
        border-radius: 5px;
        display: flex;
        .active_dd_box_left{
            width: 162px;
            height: 162px;
            img{
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            width: 100%;
            height: 100%;
            object-fit: cover;
            }
        }
        .active_dd_box_right{
            flex: 1;
            display: flex;
            flex-direction: column;
            background: #f2f7fe;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            p{
            padding-left:15px;
            }
            p:nth-child(1){
                height: 20px;
                line-height: 20px;
                position: relative;
                margin: 10px 0 15px ;
                i{
                    font-weight: bolder;
                    position: absolute;
                    right: -4px;
                    width: 58px;
                    height: 20px;
                    text-align: right;
                    border-radius:12px 0 0 12px;  
                    em{
                    font-size: 14px;
                    font-size: 16px;
                    }
                }
            }
            p:nth-child(2){
                font-size: 14px;
                line-height: 18px;
                width: 133px;
                margin: 0 0 13px;
                font-family:PingFangTC-Medium;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                color: $fontColor;
            }
            p:nth-child(3).session{
            margin: 0 0 15px;
            i{
                font-size: 16px;
                font-family:PingFangSC-Semibold;
            }
            em{
                display: inline-block;
                font-size: 12px;
                text-decoration: line-through;
                color: $gray;
                transform: scale(0.9);
            }
            }
            p:nth-child(3).goods{
                margin: 0 0 15px;
                font-size: 14px;
                color: $gray;
                b{
                    font-size: 18px;
                }
                }
                p:nth-child(4){
                em{
                    display: inline-block;
                    width: 72px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    color: white;
                    border-radius: 3px;
                    font-weight: normal;
                }
            
            }
        }
    }
}
</style>
