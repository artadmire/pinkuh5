<template>
  <div class="newAddr">
    <h2>
      <i onclick="window.history.go(-1)"></i>
      <span>新建地址</span>
      <em @click="saveAddr">保存</em>
    </h2>
    <div class="newAddr_baseInfo">
      <h3>基本信息</h3>
      <p>
        <span>收货人姓名</span>
        <input type="text" ref="name" placeholder="请点击输入">
      </p>
      <p>
        <span>手机号码</span>
        <input type="tel" maxlength="11" ref="phone" placeholder="请点击输入">
      </p>
      <p @click="maskShow">
        <span>{{myAddressProvince}}、{{myAddressCity}}、{{myAddresscounty}}</span>
        <em></em>
      </p>
      <p>
        <span>详细地址</span>
        <input type="text" ref='address' placeholder="请点击输入">
      </p>
      <div class="setDefaultAddr">
        <em :class='{active:address_Info.isDefault}' @click="setIsDefaultAddr"></em>设置为默认地址
      </div>
    </div>
    <transition name='fade'>
        <div class="addChoose_mask" v-if="maskShowState" >
          <div class="addChoose_mask_top" @click="maskClose"></div>
          <mt-picker id="mask" :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
        </div>
    </transition>
    
  </div>
</template>

<script>
import myaddress from "static@/data/address";
import "mint-ui/lib/style.css";
import { Toast } from "mint-ui";
import axios from "axios";
export default {
  name: "newAddr",
  data() {
    return {
      myAddressSlots: [
        {
          flex: 1,
          defaultIndex: 1,
          values: Object.keys(myaddress), //省份数组
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          // defaultIndex: 1,
          values: Object.keys(myaddress[Object.keys(myaddress)[0]]),
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          // defaultIndex: 1,
          values:
            myaddress[Object.keys(myaddress)[0]][
              Object.keys(myaddress[Object.keys(myaddress)[0]])
            ],
          className: "slot5",
          textAlign: "center"
        }
      ],
      myAddressProvince: "省份",
      myAddressCity: "城市",
      myAddresscounty: "区县",
      maskShowState: false,
      address_Info: {
        region: "",
        address: "",
        name: "",
        phone: "",
        isDefault: false
      }
    };
  },
  created() {},
  methods: {
    saveAddr() {
      // this.address_Info.region = this.myAddressProvince+';'+this.myAddressCity+';'+this.myAddresscounty;
      this.address_Info.region = "";
      if (this.myAddressProvince && this.myAddressProvince != "省份") {
        this.address_Info.region += this.myAddressProvince + ";";
      }
      if (this.myAddressCity && this.myAddressCity != "城市") {
        this.address_Info.region += this.myAddressCity + ";";
      }
      if (this.myAddresscounty && this.myAddresscounty != "区县") {
        this.address_Info.region += this.myAddresscounty;
      }
      this.address_Info.name = this.$refs.name.value;
      this.address_Info.address = this.$refs.address.value;
      this.address_Info.phone = this.$refs.phone.value;
      // console.log(this.address_Info);
      //判断姓名
      if (this.address_Info.name.length < 1) {
        let instance = Toast("收货人姓名格式不正确");
        setTimeout(() => {
          instance.close();
        }, 2000);
        return false;
      }

      //检测手机号码是否正确
      let myreg = /^[1][0-9]{10}$/;
      if (!myreg.test(this.address_Info.phone)) {
        let instance = Toast("手机号码格式不正确");
        setTimeout(() => {
          instance.close();
        }, 2000);
        return false;
      }
      if (!this.address_Info.region) {
        let instance = Toast("区域地址格式不正确");
        setTimeout(() => {
          instance.close();
        }, 2000);
        return false;
      }
      if (this.address_Info.address.length < 1) {
        let instance = Toast("详细地址格式不正确");
        setTimeout(() => {
          instance.close();
        }, 2000);
        return false;
      }
      this.increase_addr_ajax(this.address_Info);
    },
    maskShow() {
      this.maskShowState = true;
    },
    maskClose() {
      this.maskShowState = false;
    },
    setIsDefaultAddr() {
      this.address_Info.isDefault = !this.address_Info.isDefault;
    },
    increase_addr_ajax(info) {
      this.axiosFun({
        config: {
          method: "post",
          url: this.$api + "/h5/users/address/edit",
          data: info
        },
        onSuccess: res => {
          this.$router.push({
            path: "/addrList"
          });
        }
      });
    },
    onMyAddressChange(picker, values) {
      if (myaddress[values[0]]) {
        //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
        picker.setSlotValues(1, Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
        picker.setSlotValues(2, myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
        this.myAddressProvince = values[0];
        this.myAddressCity = values[1];
        this.myAddresscounty = values[2];
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      //vue里面全部加载好了再执行的函数  （类似于setTimeout）
      this.myAddressSlots[0].defaultIndex = 0;
      // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
      //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
@import "~@/common/css/newAddr.scss";
</style>
