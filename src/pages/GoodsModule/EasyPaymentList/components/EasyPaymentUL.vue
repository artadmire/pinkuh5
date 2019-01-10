<template>
    <div class="pintuan_tab_ul">
        <ul class="pintuan_tab" :style="{width:'2.34667'*dataInfo.length+'rem'}">
            <li v-for='(item,index) in dataInfo' :key='index' :class="{active:(index)==defaultIndex}" @click='changeDefaultIndex(index)'>{{item.title}}</li>
        </ul>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "pintuan",
  props:{
      dataInfo:{
          type:Array,
          default:[]
      },
      defaultIndex:{
          type:Number,
          default:0
      }
  },
  data() {
    return {
    };
  },
  created() {
  },
  computed: {
  },
  methods: {
    changeDefaultIndex(index){
        this.$emit('listenFromChild',index)
    }
  },
    
  mounted() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.pintuan_tab_ul{
    overflow-x: scroll;
    overflow-y: hidden;
    width: 100%;
    background:white;
    .pintuan_tab{
        display: flex;
        height: 38px;
        align-items: center;
        position: relative;
        li{
            flex:none;
            width: 68px;
            height: 25px;
            border-radius: 22px;
            background: #F7F8FA;
            text-align: center;
            line-height: 25px;
            font-size: 12px;
            box-sizing: border-box;
            margin:0 0px 0 20px ;
            color: $gray;
            font-size: 12px;
        }
        li:nth-last-child{
            margin-right:20px;
        }
        li.active{
            color: $pink;
            background: #FCE6EA;
        }
    }
}
.pintuan_tab_ul::-webkit-scrollbar{
    display: none;
}

</style>
