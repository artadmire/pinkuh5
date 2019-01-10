<template>
  <div class="invitefriends" v-if="taskStore.isShare">
      <!-- <h2 >分享礼包</h2> -->
      <div class="m-invite">
        <Telvetify text="立即领取" :source="source" :invitationCode="invitationCode" :code="code" ></Telvetify>
      </div>
  </div>
  <div v-else class="invitefriends">
    <h2 >分享礼包</h2>
    <div class="m-invite sucess">
      <span>已放入{{taskStore.phoneNum}}的账户</span>
      <div class="downloadapp">
        <p>恭喜您，领取了68元现金券！</p>
        <p>您可“下载APP > 用该账号登录 > 卡券包”里查看</p>
        <a href="javascript:;" ref=download @click="godowanload">立即下载APP</a>
      </div>
      
    </div>
  </div>  
</template>

<script>
import Telvetify from "@/pages/TaskCenterModule/common-components/Telvetify"
import api from '../api.js'
import { mapObj, Godownload} from "@/util"
import { mapState, mapMutations} from "vuex"
export default {
  name: "Invitefriends",
  components: { Telvetify },
  data() {
    return {
      phone:'',
      source:3,
      invitationCode:"",
      code:""
    };
  },
  computed:{
    ...mapState(['taskStore'])
  },
  created() {
    document.title = "分享有礼"
    var Url = window.location.href
    var obj = mapObj(Url)
    console.log(obj)
    this.invitationCode = obj.invitationCode
    this.code = obj.code
  },
  mounted(){
    },
  methods: {
    godowanload(){
      let Adown = this.$refs.download
      Godownload(Adown)
  
    },

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
@import "~@/common/css/var.scss";
.invitefriends {
  display: flex;
  flex-direction: column;
  width:100%;
  height:100%;
   h2 {
     width: 100%;
     height: 44px;
     line-height: 44px;
     color:#141414;
     font-size: 18px;
     text-align: center;
   }
   .m-invite {
     margin:0 auto;
     width:100%;
     flex: 1;
     background-image:  url("../../../assets/share_red_envelope_bg_unreceived_pic.png" );
     background-repeat:no-repeat;
     background-position: center;
     background-size:cover;
     >span {
       color:#98470C;
       font-size:14px;
       display: inline-block;
       width: 100%;
       position: fixed;
       text-align: center;
       top:48%;
     }
     .bottom {
       background-image:none;
       height: auto;
       bottom:8%;
       >input {
          background: #ffffff;
          color:#737373;
      &::-webkit-input-placeholder {
        color: #DEDEDE;
        font-size: 14px;
      }
        }
        div {
          input{
            background: #FFADAD;
            color:#FFFFFF;
          }
          input.active {
            color:#ffffff;
            background: #FF3C3A;
          } 
      }
     }
  }
 .sucess {
   background-image:  url("../../../assets/share_red_envelope_bg_received_pic.png" );
   background-repeat:no-repeat;
   background-position: center;
   background-size:cover;
   div {
     width:100%;
     display: flex;
     flex-direction: column;
     align-items: center; 
     position: absolute;
     bottom:8%;
   p{
     color:#FF3C3A;
     font-size:14px;
     width:302px;
     text-align: center;
     margin: 0 auto;
     line-height: 20px;
   }
   a{
     margin-top:20px;
     display: inline-block;
     width:260px;
     height: 38px;
     background: #FF3C3A;
     text-align: center;
     line-height: 38px;
     color:#ffffff;
     font-size: 16px;
     border-radius: 6px;
   }
  }
 }
}
</style>