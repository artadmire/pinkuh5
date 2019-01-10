<template>
    <div class="detail_promise" v-if='goodsDetail.servicePromiseList'>
        <ul>
            <li v-for='(item,index) in goodsDetail.servicePromiseList' :key='index'>
                <span></span><em>{{item.title}}</em>
            </li>
        </ul>
        
    </div>
</template>

<script>
export default {
    props:{
        goodsDetail:{
            type:Object,
            default:{}
        }
    },
    data(){
        return{
        }
    },
    created(){
       
    },
    methods: {
        
    },
    mounted () {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.detail_promise {
    width: 100%;
    border-bottom: 10px solid #f4f4f4;
    ul{
        display: flex;
        width: 335px;
        margin: 0 auto;
        border-top: 1px solid #f4f4f4;/*no*/
        height: 44px;
        line-height: 44px;
        justify-content: space-between;
        background: white;
    }
  
  li {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    font-size: 12px;
    color: #99a1b2;
    letter-spacing: 0;
    line-height: 11px;
    span {
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-right: 3px;
      background: url('~@/assets/detail_brand_check_icon@3x.png');
      background-size: 100%;
    }
    em {
      transform: scale(0.9);
    }
  }
}
</style>
