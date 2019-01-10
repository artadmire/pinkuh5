<template>
    <div class="activebox" v-if='floors' >
      <section :style="{background:item.colorSchema.backgroundColor}" v-for='(item,index) in floorsData' :key='index' :ref='item.title'>
        <ul class="active_sec">
          <ActiveBlock v-for='(itit,v) in item.blocks' :key='v' :simpleData="itit" :colorSchema='item.colorSchema'></ActiveBlock>
        </ul>
        <div class="show_more" v-if='item.showMoreStatus'>
           <div @click='show_more_Ajax(index)'>
              <p>查看更多</p>
              <i></i>
           </div>
        </div>
      </section>
    </div>
</template>
  
<script>
import ActiveBlock from './ActiveBlock'
export default {
  name: "Activemoudel",
  props:['floors','ulLength'],
  data() {
    return {
      floorsData : {}
    };
  },
  watch: {
    floors(newValue,oldValue){
      this.floorsData = newValue;
      // console.log(this.floorsData)
      // this.$set(this,'floorsData',newValue)
    }
  },  
  created() {
    // console.log(this.floors)
  },
  methods: {
     show_more_Ajax(key){
      //请求余下的数据;
      let requestCount = 0;
      this.floorsData[key].blocks.forEach((item,index)=>{
        // console.log(requestCount);
          if(requestCount<=8){
            if(item.type==='SESSION_LIST'){
              item.ids.split(' ').forEach(()=>{
                requestCount ++;
              })
            }else if(item.type==='ITEM_LIST'){
              item.ids.split(' ').forEach(()=>{
                requestCount ++;
              })
            }else{
              requestCount++;
            }
          }else{
            if(item.type==='SESSION_LIST'){
              item.ids.split(' ').forEach(()=>{
                requestCount ++;
              })
              this.getSessionListData(item.ids,key);
            }else if(item.type==='ITEM_LIST'){
              // console.log(item.ids,key)
              item.ids.split(' ').forEach(()=>{
                requestCount ++;
              })
              this.getItemListData(item.ids,key);
            }else{
              requestCount++;
            }
          }
          // console.log(requestCount)
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
              this.$set(this.floorsData[key],'showMoreStatus',false)
                this.floorsData[key].blocks.forEach((single,index)=>{
                  if(single.ids == ids && single.type=='SESSION_LIST'){
                    this.$set(single,'sessions',res.data.value.sessions)
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
              this.$set(this.floorsData[key],'showMoreStatus',false)
              this.floorsData[key].blocks.forEach((single,index)=>{
                if(single.ids == ids && single.type == 'ITEM_LIST'){
                    this.$set(single,'items',res.data.value.items)
                }
              })
              
            }
          })
      },
  },
  mounted(){
    
    // document.getElementsByClassName('')
  },
  updated(){
    if(this.ulLength){
      document.getElementsByClassName('activebox')[0].style.padding='3.52rem 0 0'
    }else{
      document.getElementsByClassName('activebox')[0].style.padding='2.213333rem 0 0'
    }
    
  },
  components:{
    ActiveBlock
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
 .activebox{
    padding: 83px 0 0 ;
    position: relative;
    section{
      .show_more{
        width: 100%;
        height: 50px;
        >div{
          width: 100px;
          height: 50px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          align-items: center;
          flex-direction: column;
          p{
            color: white;
            padding: 15px 0 2px;
          }
          i{
            width: 10px;
            height: 10px;
            border-right:1px solid white;/*no*/
            border-bottom: 1px solid white;/*no*/
            transform: rotate(45deg);
          }
        }
      }
    }
  }
</style>
