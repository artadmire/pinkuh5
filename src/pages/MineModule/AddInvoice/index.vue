<template>
  <div class="invoice">
    <h2>
      <i onclick="window.history.go(-1)"></i>
      <span>发票信息</span>
      <em></em>
    </h2>
    <div class="invoice_box">
        <div class="invoice_content" >
          <p>
            <span>发票类型</span>
            <!-- <i><em :class="{active:!isDrowBill}" @click="invoice_choose_btn"></em>不开发票</i> -->
            <i>电子发票</i>
          </p>
        </div>
        <div class="dianzi">
          <p class="invoice_choose">
            <span>抬头类型</span>
            <i><em :class="{active:isPersonal}" @click="type_choose"></em>个人</i>
            <i><em :class="{active:!isPersonal}" @click="type_choose"></em>企业</i>
          </p>
          <div class="invoice_choose_result" >
            <p >
              <span>发票抬头</span>
              <input type="text" v-model="invoice_data.title" placeholder="请输入发票抬头">
            </p>
            <p v-if="!isPersonal">
              <span>纳税识别号</span>
              <input maxlength="18" type="text" v-model="invoice_data.taxId" placeholder="请输入纳税识别号">
            </p>
            <p>
              <span>收票人邮箱</span>
              <input type="text" v-model="invoice_data.email" placeholder="请输入邮箱(非必须)">
            </p>
          </div>
        </div>
    </div>
    <div id="invoice_sure" @click='invoice_sure'>确定</div>

  </div>
</template>

<script>
import { mapState,mapMutations} from 'vuex';
import { Toast } from "mint-ui";
import api from './api.js'
import {isEmail} from '@/util'
export default {
  name: "invoice",
  data() {
    return {
      isPersonal: true,
      invoice_data: {
        titleType: "",
        title: "",
        taxId: "",
        email: ""
      }
    };
  },
  computed: {
  },
  created() {
  },
  methods: {
    ...mapMutations(['newInvoice_info']),
    async invoice_sure() {
        this.invoice_data.titleType = this.isPersonal ? 1 : 2;
        
        window.sessionStorage.invoice_info = JSON.stringify(this.invoice_data);
        if(this.invoice_data.titleType == 1){
          this.invoice_data.taxId = undefined;
        }
        if (!this.invoice_data.title) {
          let instance = Toast("请输入发票抬头");
          setTimeout(() => {
            instance.close();
          }, 2000);
          return false;
        } else if (
          !this.invoice_data.taxId &&
          this.invoice_data.titleType == 2
        ) {
          
          let instance = Toast("请输入发票税号");
          setTimeout(() => {
            instance.close();
          }, 2000);
          return false;
        }
        //  else if (!isEmail(this.invoice_data.email)) {
        //   let instance = Toast("收票人邮箱格式不正确");
        //   setTimeout(() => {
        //     instance.close();
        //   }, 2000);
        //   return false;
        // }
        // console.log(this.invoice_data)
        // return;
        let wipRes = await  api.saveInvoice(this.invoice_data);
        console.log(wipRes)
        if(wipRes.succ){
          //确定开发票
          this.$set(this.invoice_data,'type',2)
          this.newInvoice_info(this.invoice_data)
          window.sessionStorage.invoice_info = JSON.stringify(this.invoice_data);
          this.$router.push({
            path: "../submit_order"
          });
        }
        
      
    },
    type_choose() {
      this.isPersonal = !this.isPersonal;
    }
  },
  destroyed () {
    this.invoice_data = {
        titleType: "",
        title: "",
        taxId: "",
        email: "",
        id :null,
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
@import "~@/common/css/invoice.scss";
#invoice_sure{
  flex:none;
  width: 100%;
  // position: fixed;
  // bottom: 0;
  // left: 0;
  height: 48px;
  background: $pink;
  color: white;
  text-align: center;
  line-height: 48px;
  font-size: 18px;
}
</style>
