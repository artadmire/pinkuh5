<template>
    <div class="invoice_list_box">
        <h2><i onclick="window.history.go(-1)"></i>发票抬头</h2>
        <ul class="invoice_list" v-if='invoiceListArr.length'>
            <InvoiceItem v-for='(item,index) in invoiceListArr' :key='index' :dataInfo='item' ></InvoiceItem>
        </ul>
        <div v-else class="no_invoice">
            <div>
                <img src="~static@/img/order_nothing_110@3x.png" alt="">
                <p>暂时还没有发票哦</p>
            </div>
        </div>
        <div id="add_invoice" @click='addInvoice'>
            添加开票信息
        </div>
    </div>
</template>

<script>
import InvoiceItem from './components/item'
import api from './api'
export default {
  data() {
    return {
        invoiceListArr:[]
    }
  },
  created() {
      this.getInvoiceList();
  },
  computed: {
  },
  methods: {
      async getInvoiceList(){
          let wipRes = await api.getInvoiceList();
        //   console.log(wipRes);
          this.invoiceListArr = wipRes.value;
      },
      addInvoice(){
        this.$router.push({
            path: "/invoice"
        });
      }
  },
  components:{
      InvoiceItem
  },
  mounted() {
      
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
  z-index: 100;
  background: white;
  align-items: center;
  font-size: 18px;
  color: #212121;
  font-family: 'PingFangSC-Regular';
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
.invoice_list_box{
    height: 100%;;
}
.invoice_list{
    overflow: auto;
    font-family: 'PingFang SC';
    font-size: 14px;
    padding: 44px 0 48px 0;
}
.no_invoice{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    >div{
        width: 110px;
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: $gray;
        img{
            width: 110px;
            height: 110px;
        }
    }
}
#add_invoice{
    width: 100%;
    height: 48px;
    line-height: 48px;
    position: fixed;
    text-align: center;
    bottom: 0;
    left: 0;
    z-index: 9;
    font-size: 18px;
    background: $pink;
    color: white;
}
</style>
