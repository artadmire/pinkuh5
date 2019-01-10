<template>
  <div class="cart">

  	<h2>购物车</h2>
  	<div class="cartList" v-if="normalGroupList.length || abNormalItemList.length">
  		<dl class="normal" v-for="(item,index) in normalGroupList" :key='index'>
  			<dt>
  				<div>
  					<em  @click="checkActive($event)" :class="{active:checkedStateArr[index],checkedSimpe:1}"></em>
  					<span>{{item.groupName}}</span>
  				</div>
				<!-- 是不是满减 -->
				<router-link v-if="item.onSession" :to='{path:"./special",query:{sessionId:item.sessionInfo.saleSessionId}}'>
					<em class="cart_discount_active" v-if="item.onSession">满减</em>
					<em v-if="item.sessionInfo.satisfied" class="cart_discount_price_active">已省{{item.sessionInfo.discountCent|transMoney}}元</em>
					<span>{{item.sessionInfo.saleText}}</span>
					
					<b v-if="item.sessionInfo.satisfied">再逛逛</b>
					<b v-else>去凑单</b>
					<i></i>
				</router-link>
  			</dt>

  			<dd  v-for="(itit,v) in item.cartItemList" :class="{discount_active:itit.onSession}" :key='v'>
  				
				<router-link :to="{path:'./detail',query:{id:itit.itemId}}"><img v-bind:src="commonStore.imgUrlPrefix+itit.pic+'@!200'" alt=""></router-link>
  				<router-link :to="{path:'./detail',query:{id:itit.itemId}}" class="cartList_goods_center">
  					<p>{{itit.itemTitle}}</p>
  					<p>
  						<em>{{itit.skuName}}</em>
  					</p>
  					<p>
  						<em>￥{{itit.salePriceStr}}</em>
  						<span>￥{{itit.originalPriceStr}}</span>
  					</p>
  				</router-link>
  				<div class="cartList_goods_right">
  					<span class="cartList_goods_del" @click="delete_cartGoods($event)"></span>
  					<i v-if='itit.stockLeft<99'>库存紧张</i>
  					<p v-bind:data-id="itit.skuId">
  						<em class="cartList_goods_reduce" @click="reduce($event)">-</em><b>{{itit.num}}</b><em class="cartList_goods_increase" @click="increase($event)">+</em>
  					</p>
  				</div>
  				
  			</dd>
  		</dl>
  		<dl class="abNormal" v-if="abNormalItemList.length">
  			<dt>
  				<span @click="clearAbNormal($event)">清空失效商品</span>
  			</dt>
  			<dd v-for="(item,index) in abNormalItemList" v-bind:data-id="item.skuId" :key='index'>
  				<a href="javascript:;"><img v-bind:src="commonStore.imgUrlPrefix+item.pic+'@!200'" alt=""></a>
  				<div class="cartList_goods_center">
  					<p>{{item.itemTitle}}</p>
  					<p>
  						<em>{{item.skuName}}</em>
  					</p>
  					<p>
  						<em>￥{{item.salePriceCent | transMoney}}</em>
  						<span>￥{{item.originalPriceCent | transMoney}}</span>
  					</p>
  				</div>
  				<div class="cartList_goods_right">
  					<span v-bind:data-id="item.skuId" class="cartList_goods_del" @click="delete_cartGoods($event)"></span>
  				</div>
  			</dd>
  		</dl>
  	</div>
  	<div class="cartListNone" v-else>
  		<img src="~static@/img/shopping _cart_is_empty_icon_110@3x.png" alt="">
  		<span>购物车里什么都没有哦~</span>
  	</div>
  	<div class="settlement">
		<div>
  			<em @click="checkedAll($event)" :class="{active:ischeckedAll,checkedAll:1}"></em>全选
  		</div>
		<div>
			<p>共计:￥{{res_settlementPrice-res_discountPrice|capitalize}}</p>
			<p>(已优惠{{res_discountPrice|capitalize}}元)</p>
		</div>
		<div id="settlementBtn" :class="{invide:!normalGroupList.length}"  @click="settlementFun">结算</div>
  	</div>
  	<Footer></Footer>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import { Toast, MessageBox } from "mint-ui";

import axios from "axios";
export default {
  name: "Cart",
  data() {
    return {
      msg: "suolun",
      //有效商品数据
      normalGroupList: [],
      //无效商品数据
      abNormalItemList: [],
      checkedList: {
        num: 0,
        settlementPrice: [],
        discountPrice: []
      },
      checkedStateArr: [],
      ischeckedAll: false,
      res_settlementPrice: 0,
      res_discountPrice: 0
    };
  },
  created() {
    //修改footer组件底部的状态信息
    this.newFooterState({
      tab1: false,
      tab2: false,
      tab3: false,
      tab4:true
    })
    window.localStorage.footerState = JSON.stringify({
      tab1: false,
      tab2: false,
      tab3: false,
      tab4:true
    });
    this.get_cart_list();
  },
  computed: {
    ...mapState(['commonStore']),
    csrfToken() {
      return this.$store.state.csrfToken;
    },
  },
  methods: {
    ...mapMutations(['newSubmit_order_data','newFooterState']),
    reduce(event) {
      let skuId = event.target.parentNode.getAttribute("data-id");
      // console.log(event.target.nextSibling);
      //在字典中找到对应的skuId并修改数量
      this.normalGroupList.forEach(item => {
        item.cartItemList.forEach(itit => {
          if (itit.skuId == skuId) {
            itit.num--;
            if (itit.num < 1) {
              itit.num = 1;
            }
            this.edit_num({
              skuId: itit.skuId,
              num: itit.num
            });
          }
        });
      });
    },
    increase(dom) {
      let skuId = event.target.parentNode.getAttribute("data-id");
      // console.log(event.target.nextSibling);
      //在字典中找到对应的skuId并修改数量
      this.normalGroupList.forEach(item => {
        item.cartItemList.forEach(itit => {
          if (itit.skuId == skuId) {
            itit.num++;
            if (itit.num > itit.stockLeft) {
              itit.num = itit.stockLeft;
            }
            this.edit_num({
              skuId: itit.skuId,
              num: itit.num
            });
          }
        });
      });
    },
    edit_num:_.debounce(
       function(info){
         let params = new FormData();
          params.append("skuId", info.skuId);
          params.append("num", info.num);
          this.axiosFun({
            config: {
              method: "post",
              url: this.$api + "/h5/cart/edit_num",
              data: params
            },
            onSuccess: res => {
              console.log('success');
              this.updata(res);
              this.computedSettlementPrice();
            }
          });
      },500
    ),
    delete_cartGoods(event) {
      MessageBox.confirm("确定删除?", "提示")
        .then(action => {
          let skuIds = event.target.parentNode.lastChild.getAttribute(
            "data-id"
          );

          this.axiosFun({
            config: {
              method: "post",
              url: this.$api + "/h5/cart/delete",
              data: { skuIds: [skuIds] }
            },
            onSuccess: res => {
              this.updata(res);
              this.$nextTick(() => {
                //若是当前专场的商品都没了，要把this.checkedList，this.checkedStateArr里的数据更新一下
                this.computedSettlementPrice();
                let instance = Toast("删除成功");
                setTimeout(() => {
                  instance.close();
                }, 2000);
              });
            }
          });
        })
        .catch(cacel => {});
    },
    checkActive(event) {
      event.target.className =
        event.target.className == "active checkedSimpe"
          ? "checkedSimpe"
          : "active checkedSimpe";
      let checkedSimpe = document.getElementsByClassName("checkedSimpe");
      //修改checkedStateArr
      for (let i = 0; i < checkedSimpe.length; i++) {
        if (checkedSimpe[i].className.indexOf("active") != -1) {
          this.$set(this.checkedStateArr, i, true);
        } else {
          this.$set(this.checkedStateArr, i, false);
        }
      }
      //修改ischeckedAll
      //先让this.ischeckedAll为true,再判断
      this.$set(this, "ischeckedAll", true);
      this.checkedStateArr.forEach(item => {
        if (!item) {
          this.$set(this, "ischeckedAll", false);
        }
      });
      this.computedSettlementPrice();
    },
    checkedAll(event) {
      event.target.className =
        event.target.className == "active checkedAll"
          ? "checkedAll"
          : "active checkedAll";
      if (event.target.className == "active checkedAll") {
        this.ischeckedAll = true;
        for (let i = 0; i < this.checkedStateArr.length; i++) {
          this.$set(this.checkedStateArr, i, true);
        }
      } else {
        this.ischeckedAll = false;
        for (let i = 0; i < this.checkedStateArr.length; i++) {
          this.$set(this.checkedStateArr, i, false);
        }
      }
      this.computedSettlementPrice();
    },
    settlementFun() {
      //判断有没有选中商品
      let itemListArr = [];
      if (
        !document.getElementsByClassName("active").length &&
        this.normalGroupList.length
      ) {
        let instance = Toast("请选择商品");
        setTimeout(() => {
          instance.close();
        }, 2000);
      } else if (!this.normalGroupList.length) {
        return false;
      } else {
        this.checkedStateArr.forEach((item, index) => {
          this.normalGroupList.forEach((itit, j) => {
            //判断选中状态和数组序列对应的数据
            if (item && index == j) {
              itit.cartItemList.forEach((it, v) => {
                itemListArr.push({
                  skuId: it.skuId,
                  buyNum: it.num
                });
              });
            }
          });
        });
        // console.log(itemListArr)


        this.newSubmit_order_data( {
          'itemList':itemListArr,
        })
        window.localStorage.submit_order_data = JSON.stringify({
          'itemList':itemListArr,
          'orderType':1
        });
        global.preOrderPreUrl = location.hash.split('#')[1];
        this.$router.push({
          path: "/submit_order"
        });
      }
    },
    clearAbNormal(event) {
      let dlDom = event.target.parentNode.parentNode,
        ddDom = dlDom.getElementsByTagName("dd"),
        clearArr = [];

      for (var i = 0; i < ddDom.length; i++) {
        clearArr.push(ddDom[i].dataset.id);
      }

      this.axiosFun({
        config: {
          method: "post",
          url: this.$api + "/h5/cart/delete",
          data: { skuIds: clearArr }
        },
        onSuccess: res => {
          this.updata(res);
        }
      });
    },
    get_cart_list() {
      this.axiosFun({
        config: {
          url: this.$api + "/h5/cart/list"
        },
        onSuccess: res => {
          this.updata(res);
        }
      });
    },
    //计算优惠价格和结算价格
    computedSettlementPrice() {
      let temporary_settlementPrice = 0,
        temporary_discountPrice = 0;
      this.checkedStateArr.forEach((item, index) => {
        this.checkedList.settlementPrice.forEach((itit, j) => {
          if (item && index == j) {
            temporary_settlementPrice += itit;
          }
        });
        this.checkedList.discountPrice.forEach((itit, j) => {
          if (item && index == j) {
            temporary_discountPrice += itit;
          }
        });
      });
      this.$set(this, "res_settlementPrice", temporary_settlementPrice);
      this.$set(this, "res_discountPrice", temporary_discountPrice);
    },
    updata(res) {
      if (res.data.value) {
        this.$set(this, "normalGroupList", res.data.value.normalGroupList);
        this.$set(this, "abNormalItemList", res.data.value.abNormalItemList);
      }
      //每次更新数据重置数据
      this.checkedList = {
        num: 0,
        settlementPrice: [],
        discountPrice: []
      };
      if (this.normalGroupList.length) {
        this.checkedList.num = this.normalGroupList.length;
        this.checkedStateArr.length = this.normalGroupList.length;
        this.normalGroupList.forEach(item => {
          if (item.sessionInfo.discountCent) {
            this.checkedList.discountPrice.push(item.sessionInfo.discountCent);
          } else {
            this.checkedList.discountPrice.push(0);
          }
          let itemPrice = 0;
          item.cartItemList.forEach(itit => {
            itemPrice += itit.salePriceCent * itit.num;
          });
          this.checkedList.settlementPrice.push(itemPrice);
        });
        // console.log(this.checkedList);
        // console.log(this.checkedStateArr);
      }
    }
  },
  filters: {
    capitalize(value) {
      if (!value) return "0";
      return parseFloat(value / 100).toFixed(2);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
@import "~@/common/css/var.scss";
@import "~@/common/css/cart.scss";
</style>
