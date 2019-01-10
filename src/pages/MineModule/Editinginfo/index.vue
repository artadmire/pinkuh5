<template>
  <div class="editinginfo">
    <TitleBack :title='"编辑资料"' />
    <div class="progress">
      <p>您已完善 {{ rang }}的资料，完善越多，奖励越多</p>
      <div><span :style='{width:rang}'></span></div>
      <ul>
        <li>
          <span>头像</span>
          <div>
            <img src="" alt="">
            <i></i>
          </div>
        </li>
        <li>
          <span>昵称</span>
          <div>
            <em>未设置</em>
            <i></i>
          </div>
        </li>
         <li>
          <span>年龄</span>
          <div>
            <em>未设置</em>
            <i></i>
          </div>
        </li>
         <li>
          <span>性别</span>
          <div>
            <em>未设置</em>
            <i></i>
          </div>
        </li>
         <li>
          <span>职业</span>
          <div>
            <em>未设置</em>
            <i></i>
          </div>
        </li>
         <li>
          <span>密码</span>
          <div>
            <em>未设置</em>
            <i></i>
          </div>
        </li>
         <li>
          <span>手机号</span>
         <div>
            <em>未设置</em>
            <i></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TitleBack from "@/pages/common_components/TitleBack"
export default {
  name: "Editinginfo",
  data() {
    return {
      rang:"20%"
    };
  },
  created() {
    
  },
  components:{
    TitleBack
  },
  methods: {
    
   
  },
  
    
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";

.editinginfo {
  display: flex;
  flex-direction: column;
  width:100%;
  height:100%;
  .progress {
    margin-top:64px;
    p {
      text-align: center;
      color:$fontColor;
      font-size: 12px;
      margin-bottom: 13px;
    }
    >div {
      width:341px;
      height:6px;
      background: #F4F4F4;
      margin-left: 20px;
      box-sizing: border-box;
      // border:1px solid #979797;
      border-radius: 3.5px;
      margin-bottom: 30px;
      span {
        display: block;
        height:100%;
        border-radius: 3.5px;
        background: $pink;
      }
    }
    ul li{
      height:54px;
      border-bottom: 1px solid #F4F4F4;/*no*/
      line-height: 54px;
      padding:0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span{
        font-size: 16px;
      }
      div{
        display: flex;
        align-items: center;
        img {
          height:40px;
          width:40px;
          border-radius: 20px;
          background: #F4F4F4;
        }
        i{
          height:20px;
          width:20px;
          border-radius: 10px;
          background: #F4F4F4;
          display: block;
          margin-left: 10px;
        }
      }
       
    }
  }
}
</style>
