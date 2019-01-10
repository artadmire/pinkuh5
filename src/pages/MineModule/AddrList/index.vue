<template>
  <div class="addrList">
  	<h2><span class="arrow_left" onclick="window.history.go(-1)"></span>收货地址</h2>
  	<ul class="addrList_ul">
  		<li  v-for="(item,index) in addrList" v-bind:data-id="item.id" :key='index' @click="to_sublime_order($event)">
  			<p>
  				<span>收货人:<i>{{item.name}}</i></span>
  				<em v-if="item.isDefault">默认</em>
				<b>{{item.phone}}</b>
  			</p>
  			<p>
          <span>地址:</span>{{item.region |capitalize}} {{item.address}}
  			</p>
  		</li>
  	</ul>
  	<div id="increase_new_addr" @click="increase_new_addr">
  		添加新地址
  	</div>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
import { Toast } from "mint-ui";
export default {
  name: "Addr-list",
  data() {
    return {
      addrList: [],
      receiver: {}
    };
  },
  created() {
    this.get_addList_ajax();
  },
  methods: {
    ...mapMutations(['newReceiver_data']),
    increase_new_addr() {
      this.$router.push({
        path: "/NewAddr"
      });
    },
    get_addList_ajax() {
      // this.$http({
      //   method:'get',
      //   url:this.$api+'/h5/users/address/list'
      // }).then(res=>{

      //   if(res.data.succ){
      //     this.addrList = res.data.value
      //   }
      //   console.log(res.data.value);
      // }).catch(error=>{
      //     let instance = Toast('网络好像有问题,请稍候再试试');
      //   setTimeout(() => {
      //     instance.close();
      //   }, 2000);
      //   })
      this.axiosFun({
        config: {
          url: this.$api + "/h5/users/address/list"
        },
        onSuccess: res => {
          this.addrList = res.data.value;
        }
      });
    },
    to_sublime_order(event) {
      console.log(event.currentTarget.dataset.id);
      this.addrList.forEach((item, index) => {
        if (item.id == event.currentTarget.dataset.id) {
          this.$set(this, "receiver", {
            name: item.name,
            phone: item.phone,
            region: item.region,
            address: item.address
          });
        }
      });
      this.newReceiver_data(this.receiver)
      window.sessionStorage.receiver_data = JSON.stringify(this.receiver);
      this.$router.push({
        path: "./submit_order"
      });
    }
  },
  filters: {
    capitalize(value) {
      return value.split(";").join(" ");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
@import "~@/common/css/addr-list.scss";
</style>
