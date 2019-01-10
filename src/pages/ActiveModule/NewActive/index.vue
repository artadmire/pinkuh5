<template>
  <div class="activePage">
    <Download></Download>
    <h2><i onclick="window.history.go(-1)"></i>{{data.title}}
      <router-link to="./"></router-link>
    </h2>
    <div class="active_tabbar_box" ref='active_tabbar_box' v-show='ulLength'>
      <ul class="active_tabbar" :style="{left:active_tabbar_style_left}" ref='active_tabbar' >
        <li v-for='(item,index) in data.floors' @click='tabbar(index,$event)' :key='index' :class="{active:item.isDefault}">{{item.title}}</li>
      </ul>
    </div>
    <ActiveMoudel ref='ActiveMoudel' :refsArr='refsArr' :floors='data.floors' :ulLength='ulLength'></ActiveMoudel>
  </div>
</template>

<script>
import axios from 'axios'
  import {
    Toast
  } from "mint-ui";
  import ActiveMoudel from './components/ActiveMoudel'
  export default {
    name: "active",
    data() {
      return {
        data: {},
        active_tabbar_box_height: 0,
        timer:null,
        //已经请求过的楼层内数据,floorsArr = [true,false,false]是为了记录导航栏是否高亮过，如果高亮修改把之前为false的变成true，
        //由于vue不能监听到数组的变化，具体看官网解释,把数组变成字符串再监听
        floorsArrStr:'',
        distance:1000,
        refsArr:[],
        active_tabbar_style_left:0,
        // 导航栏和屏幕宽度的比值
        mixRatio:0
      };
    },
    created() {
      this.watchRouter();
    },
    computed: {
        ulLength(){
          // console.log(this.data.floors);
            return this.data.floors?this.data.floors.length>1:false
        }
    },
    watch: {
      $route: "watchRouter",
      floorsArrStr(newValue,oldValue){
        // console.log(this.data.floors[0])
        //对比newValue和oldValue，查看那个值变成true了，就找到data里面blocks数组里面的ids，去请求数据;
        let newValueArr = newValue.split(',');
        let oldValueArr = oldValue.split(',');
        let key = 0;
        //每次请求最多8个
        let requestCount = 0;
        newValueArr.forEach((item,index)=>{
          oldValueArr.forEach((itit,v)=>{
            //找出新旧两个不同，记下index
            if(v==index&&itit=='false'&&itit!=item){
                  key = v;
            }
          })
        })
        // console.log(this.floorsArrStr);
        // console.log(this.data.floors[key].blocks)
        this.data.floors[key].blocks.forEach((item,index)=>{
          // if(requestCount<=8){
            if(item.type==='SESSION_LIST'){
              item.ids.split(' ').forEach(()=>{
                requestCount ++;
              })
              this.getSessionListData(item.ids,key);
            }else if(item.type==='ITEM_LIST'){
              
              item.ids.split(' ').forEach(()=>{
                requestCount ++;
              })
              this.getItemListData(item.ids,key);
            }
            else{
              requestCount++;
            }
            if(requestCount>8){
              
              if(item.type==='SESSION_LIST'){
                this.getSessionListData(item.ids,key);
              }else if(item.type==='ITEM_LIST'){
                this.getItemListData(item.ids,key);
              }
            }
             this.$set(this.data.floors[key],'showMoreStatus',false)
          // }else{
            //  this.$set(this.data.floors[key],'showMoreStatus',true);
          // }
          
        })
       
      },
    },
    methods: {
      watchRouter() {
        if(this.$refs.ActiveMoudel){
            this.$refs.ActiveMoudel.$refs = {}
        }
        //路由变化的时候判断是不是newActive了
        if(location.href.indexOf('newActive')!=-1){
            let id = this.$route.query.id;
            this.data = {};
          this.getActiveData(id);
        }
      },
      getActiveData(id){
        this.axiosFun({
          config:{
              url: this.$api + "/h5/holes/hole_detail",
              params: {
                id: id  
              }
          },
          onSuccess:res=>{
            let wipdata = JSON.parse(res.data.value.data);
            let arr = [];
            wipdata.floors.forEach((item,index)=>{
                item.isDefault = index == 0 ? true : false;
                //这里给记录是否请求data数据，先记录一个数据，全是false，若是在点击导航栏或者滚动的时候，data其中的isDefault属性会变，监听data变化，判断是否需要请求数据
                arr.push(index==0?true:false);
            })
            this.floorsArrStr = arr.join(',');
            // this.data = wipdata;
            this.$set(this,'data',wipdata)
            
          }
        })
      },
      getSessionListData(ids,key){
          this.axiosFun({
            config:{
              url:this.$api+'/h5/pages/multi_get_sessions',
              params:{
                ids:JSON.stringify(ids.split(' '))
              },
            },
            onSuccess:res=>{
                this.data.floors[key].blocks.forEach((item,index)=>{
                  if(item.ids == ids && item.type=='SESSION_LIST'){
                    this.$set(item,'sessions',res.data.value.sessions)
                  }
                })
              
            }
          })
      },
      getItemListData(ids,key){
        var id = ids.split(' ')
        if(id[id.length-1] == ''){
          id.pop()
        }
        this.axiosFun({
            config:{
              url:this.$api+'/h5/pages/multi_get_items',
              params:{
                ids:JSON.stringify(id)
              },
            },
            onSuccess:res=>{
               console.log(res.data,666)
              this.data.floors[key].blocks.forEach((item,index)=>{
                
                if(item.ids == ids && item.type == 'ITEM_LIST'){
                    this.$set(item,'items',res.data.value.items)
                }
              })
            }
          })
      },
      tabbar(index, e) {
        // console.log(e);
        this.data.floors.forEach(item => {
          item.isDefault = false;
        });
        window.removeEventListener('scroll',this.onScroll);
        this.data.floors[index].isDefault = true;
        let wipArr = this.floorsArrStr.split(',');
        wipArr[index] =true;
        this.floorsArrStr = wipArr.join(',');
        //获取ref和innerHTML相同的位置;
        let start = document.documentElement.scrollTop || document.body.scrollTop;
        let end = this.$refs.ActiveMoudel.$refs[e.target.innerHTML][0].offsetTop - this.$refs.active_tabbar_box.offsetHeight;
        this.timer =  setTimeout(()=>{
          this.smooth(start, end);
        }, 10);
      },
      onScroll(e){
        
        let obj = this.$refs.ActiveMoudel?this.$refs.ActiveMoudel.$refs:{},
            arr = [],
            i = -1;
        //arr是为了保存各个楼层的高度
        for(let key in obj){
          arr.push(obj[key][0].offsetTop-document.documentElement.clientHeight);
        }
        // console.log(arr);
        // console.log(this.getScrollTop())
        arr.forEach((item,index)=>{
          if(this.getScrollTop()>=item){
            i +=1;
          }
        })
       
        if(i>=0){
            this.data.floors.forEach(item => {
              item.isDefault = false;
            });
            this.data.floors[i].isDefault = true;
            let wipArr = this.floorsArrStr.split(',');
            wipArr[i] = true;
            this.floorsArrStr = wipArr.join(',');
            
        }
      },
      getScrollTop()
      {
          var scrollTop=0;
          if(document.documentElement&&document.documentElement.scrollTop)
          {
              scrollTop=document.documentElement.scrollTop;
          }
          else if(document.body)
          {
              scrollTop=document.body.scrollTop;
          }
          return scrollTop;
      },
      //平滑滚动
      smooth(start, end) {
        let step = (end - start) / 10;
        if (Math.abs(step) > 1) {
          start += step;
          document.body.scrollTop = start; // chrome
          document.documentElement.scrollTop = start; // firefox
          this.timer = setTimeout(()=>{
            this.smooth(start, end)
          }, 10);
        } else {
          
          document.body.scrollTop = end; // chrome
          document.documentElement.scrollTop = end; // firefox
          clearTimeout(this.timer);
          window.addEventListener('scroll',this.onScroll);
        }
      }
    },
    destroyed () {
    },
    mounted() {
      
      this.$nextTick(()=>{
       
        
        let sectionDom = document.getElementsByTagName('section');
        for(let i = 0 ;i < sectionDom.length;i++){

        }
        window.addEventListener('scroll',this.onScroll);
      })
    },
    
    components: {
      ActiveMoudel
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  @import "~@/common/css/var.scss";
  @import "~@/common/css/active.scss";
</style>
