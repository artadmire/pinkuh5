<template>
    <li>
        <div class="taitou" @click='choose'>
            <span>开票抬头:</span>
            <p>
                <span>{{dataInfo.title}}</span> <i class="personal" v-if='dataInfo.titleType==1'>个人</i><i class="company" v-else-if='dataInfo.titleType==2'>企业</i>
            </p>
        </div>
        <div v-if='dataInfo.titleType==2'>
            <span>纳税识别号:</span>
            <p>{{dataInfo.taxId}}</p>
        </div>
        <div v-if='dataInfo.email'>
            <span>收票人邮箱:</span>
            <p>{{dataInfo.email}}</p>
        </div>
    </li>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  props:{
      dataInfo:{
          type:Object,
          default:{}
      }
  },
  data() {
    return {
    }
  },
  created() {
  },
  computed: {
      ...mapState(['commonStore']),
  },
  methods: {
      ...mapMutations(['newInvoice_info']),
      choose(){
        //   this.dataInfo.type=2;
        this.$set(this.dataInfo,'type',2)
          this.newInvoice_info(this.dataInfo)
          window.sessionStorage.invoice_info = JSON.stringify(this.dataInfo);
          this.$router.push({
                path: "../submit_order"
            });
      }
  },
  components:{
  },
  mounted() {
      
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
li{
    padding: 10px 20px;
    line-height: 30px;
    border-bottom: 1px solid #f4f4f4; /*no*/
    >div{
        display: flex;
        span{
            padding-right: 10px;
        }
    }
    .taitou{
        p{
            i{
                display: inline-block;
                padding: 0 5px;
                transform: scale(0.8);
                border-radius: 3px;
                line-height: 20px;
            }
            .personal{
                border: 1px solid $pink;/*no*/
                color: $pink;
            }
            .company{
                border: 1px solid #5891EB;/*no*/
                color: #5891EB;
            }
        }
    }
}
</style>
