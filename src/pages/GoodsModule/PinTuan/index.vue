<template>
  <div class="pintuan">
      <h2><i onclick="window.history.go(-1)"></i>拼团商品</h2>
      <div class="banner">
            <SchemeSimple v-for='(item,index) in imgArr' :key='index' :url='item.link' :urlPrefix='commonStore.imgUrlPrefix' :img='item.img' size='@!1200' />
      </div>
      <PintuanTabUl ref='pintuanTabUl' :class='{fixedActive:isFixed}' :dataInfo='tabArr' :defaultIndex='defaultIndex' @listenFromChild='listenFromChild'></PintuanTabUl>
      <div class='fixedBlank' v-if='isFixed'></div>
      <div class="commodityUl" v-if='commodityArr.length'>
          <Commodity v-for='(item,index) in commodityArr' :key='index' :itemInfo='item'></Commodity>
      </div>
      <div class="commodityNull" v-else>
          <img src="~static@/img/order_nothing_110@3x.png" alt="">
         <p>暂无数据哦~</p>
      </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import { Toast } from "mint-ui";
import PintuanTabUl from './components/PintuanTabUl'
import Commodity from './components/Commodity'
import api from './api'
export default {
  name: "pintuan",
  data() {
    return {
        imgArr:[],
        tabArr:[],
        defaultIndex:0,
        currentPage:1,
        commodityArr:[],
        isFixed:false,
        currentGroupName:'',
        canLoad:true,
        pageCount:1
    };
  },
  created() {
      this.getQuery();
      this.getPintuanGroups();
  },
  computed: {
    ...mapState(['commonStore'])
  },
  methods: {
       async listenFromChild(msg){
            this.defaultIndex = msg;
            this.commodityArr= [];
            this.currentPage =1;
            this.currentGroupName = this.tabArr[msg].title;
            this.getPintuanItemList({
                'groupName':this.tabArr[msg].title,
                'currentPage':this.currentPage
            })
      },
      async getPintuanGroups(){
            let wipres = await api.getPintuanGroups();
            wipres.groups.forEach((item,index)=>{
                this.tabArr.push({
                    'title':item,
                    'index':index
                })
            })
            this.currentGroupName = wipres.groups[0];
            //默认请求第一个数据
            this.getPintuanItemList({
                'groupName':this.currentGroupName,
                'currentPage':this.currentPage
            })
      },
      async getPintuanItemList(obj){
        if(this.canLoad&&this.currentPage<=this.pageCount){
            this.canLoad = false;
            let wipList = await api.getPintuanItemList(obj);
            // console.log(wipList)
            this.pageCount = wipList.pageCount;
            this.commodityArr.push(...wipList.values);
            this.currentPage++;
            this.canLoad = true;
        }
      },
      async getQuery(){
          let wipres = await api.getQuery();
          
          wipres.values.forEach((item,index)=>{
              this.imgArr.push(JSON.parse(item.data))
          })
          console.log(this.imgArr)
      }
  },
  components:{
    PintuanTabUl,Commodity
  },
  mounted() {
        this.$nextTick(()=>{
            // pintuanTabUlTop 记录pintuanTabUlTop 高度。滚动的时候，会再次取值， wip 仅记录一次初始高度，初始高度可能不准的
            let pintuanTabUlTop = this.$refs.pintuanTabUl.$el.offsetTop;
            let wip = pintuanTabUlTop;
            window.onload = window.onscroll = ()=>{
                
                if(pintuanTabUlTop == wip){
                    pintuanTabUlTop = this.$refs.pintuanTabUl.$el.offsetTop;
                }else{
                    let top = document.documentElement.scrollTop || document.body.scrollTop;
                    if(top>(pintuanTabUlTop-wip)){
                        this.isFixed = true
                    }else{
                        this.isFixed =false
                    }
                    
                }
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                //文本高度
                let textHeight = document.body.scrollHeight;
                //屏幕高度
                let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
                if (textHeight - scrollTop - clientHeight < clientHeight / 2) {
                    this.getPintuanItemList({
                        'groupName': this.currentGroupName ,
                        'currentPage':this.currentPage
                    })
                }
            }
        })
      
  },
  destroyed () {
      window.onscroll = ()=>{}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
h2 {
  height: 44px;
  line-height: 44px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  align-items: center;
  font-size: 18px;
  color: #212121;
  font-family: PingFangSC-Regular;
  border-bottom: 1px solid #f4f4f4;
  /*no*/
  text-align: center;
  transform: translate3d(0, 0, 0);
  i {
    position: absolute;
    left: 20px;
    top: 10px;
    width: 24px;
    height: 24px;
    background: url('~@/assets/order_navbar_arrow_back_icon@3x.png');
    background-size: 100%;
    margin-right: 10px;
  }
}
.pintuan{
  width: 100%;
  .banner{
      width: 100%;
      display: flex;
      flex-direction: column;
      padding-top: 44px;
      img{
        width: 100%;
      }
  }
}
.commodityUl{
    background: #f7f8fa;
    padding: 10px 20px;
}
.fixedActive{
    position:fixed;
    top:44px;
    left:0;
    z-index:9;
}
.fixedBlank{
    width:100%;
    height:38px;
    background:white;
}
.commodityNull{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
        width: 80px;
        height: 80px;
        margin-top: 50px;
    }
    p{
        line-height: 30px;
    }
}
</style>
