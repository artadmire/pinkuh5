<template>
  <div class="detial">
  	<div class="detail_box">
  		<Download></Download>
      <!-- 轮播banner -->
      <div  class="detail_imgbox" v-if="goodsDetail.picInfo">
        <mt-swipe :auto="5000">
          <mt-swipe-item  v-for="(item,index) in goodsDetail.picInfo.picList"  v-bind:key="index" >
            <img v-bind:src="item+'@!1200'" alt="">
          </mt-swipe-item>
        </mt-swipe>
        <p v-if="goodsDetail.basicInfo.onSession" ref='pdpa'>
          {{goodsDetail.sessionInfo.title}}<em class="triangle-left"></em><span ref='countDown'>距离结束：{{goodsDetail.sessionInfo.endTime|time}}</span>
        </p>
        <div id="backPrev" onclick="window.history.go(-1)"></div>
      </div>
       <!-- 是否是黑卡会员 -->
       <VipGoods :goodsDetail='goodsDetail'></VipGoods>
      <!-- 商品详情展示价格部分 -->
      <DetailDesc :goodsDetail='goodsDetail'></DetailDesc>
      <!-- 商品promise -->
      <DetailPromise :goodsDetail='goodsDetail'></DetailPromise>
      <!-- 进入专场 -->
      <SessionSec :goodsDetail='goodsDetail' v-if='goodsDetail.sessionInfo'></SessionSec>
      <!-- 拼团列表 -->
      <PintuanList v-if='pintuanListShowState==2&&itemType==4' :dataInfo='pintuanListData'></PintuanList>
      <!-- 拼团列表无人开团 -->
      <pintuanNullUser v-else-if='pintuanListShowState==1&&itemType==4'></pintuanNullUser>
      <!-- 更多拼团列表 -->
      <MorePintuanList :dataInfo='pintuanListData' v-if='commonStore.morePintuanListState'></MorePintuanList>
      <!-- 参加他人拼团 -->
      <ParticipateTuan v-if='commonStore.particpateTuanState' :callUpState='states.callUpState' @ListenFromParticipateTuan='ListenFromParticipateTuan'></ParticipateTuan>
      <!-- 底部商品详情图片 -->
      <div class="detail_botImg" v-if="goodsDetail.detailInfo">
        <div>-商品详情-</div>
        <img v-for="(item,index) in goodsDetail.detailInfo.picList" v-lazy="item+'@!1200'" alt="" :key='index'>
      </div>
      <!-- 商品规则声明 -->
      <Explain></Explain>
      <!-- 底部button -->
      <div class="detail_bot_btn forthcomingSale" v-if='statusInfo.code==-1'>
        {{statusInfo.desc}}
      </div>
      <div class="detail_bot_btn downline" v-else-if='statusInfo.code==-2'>
        {{statusInfo.desc}}
      </div>
      <div class="detail_bot_btn lootAll" v-else-if='statusInfo.code==-3'>
        {{statusInfo.desc}}
      </div>
      <div class="detail_bot_btn" v-else-if='itemType==1'>
        <span @click="toCart" class='ToCartBtn'>
          <img src="~@/assets/Bottom_label_icon_shopping_cart_onclick@3x.png" alt="">
        </span>
        <div id="addCart" @click="statusInfo.addToCart&&callUpBox('addCart')" :class='{addToCart:statusInfo.addToCart}'>
          加入购物车
        </div>
        <div id="buyNow" @click="statusInfo.canBuy&&callUpBox('buyNow')" :class="{canBuy:statusInfo.canBuy}">
          {{statusInfo.desc}}
        </div>
      </div>
      <div class="detail_bot_btn" v-else-if='itemType==3'>
        <div @click="toCart" class="detail_bot_btn_title">
          <img src="~@/assets/Bottom_label_icon_shopping_cart_onclick@3x.png" alt="">
          <span>购物车</span>
        </div>
        <p id="direct_buy_btn" @click="callUpBox('easyPayment',1)">
            <span>￥{{goodsDetail.basicInfo.salePriceCent |transMoney00}}</span>
            <span>直接购买</span>
        </p>
        <p id="easy_payment_btn" @click="callUpBox('easyPayment',2)">
            <span>￥{{goodsDetail.easyPaymentInfo.minEasyPaymentCent | transMoney00}}</span>
            <span>分期购买</span>
        </p>
      </div>
      <div class="detail_bot_btn" v-else-if='itemType==4'>
          <div class="singleBuy" @click="callUpBox('buyNow')">
             <p>￥{{salePriceCent}}</p>
             <p>单独购买</p>
          </div>
          <div class="pintuanBuy" @click="callUpBox('pintuan')">
            <p>￥{{pintuanPriceCent}}</p>
            <p>拼团购买</p>
          </div>
      </div>
  	</div>

  	<transition name='fade'>
  		<div name="fade" v-if='states.callUpState' class="callUp_box" >
  			<div class="kongbai" @click="callUp_close"></div>
			<div class="callUp" v-if="sKUDate">
				<h2><p>{{sKUDate.itemTitle}}</p><span id="callUp_close" @click="callUp_close"></span></h2>
				<div class="callUp_detail_img">
					<img v-bind:src="goodsDeatalInfo.pic+'@!400'" alt="">
					<div >
						<p>￥{{goodsDeatalInfo.salePriceCent|transMoney00}}</p>
						<p>{{goodsDeatalInfo.quantityLeft>99?'库存充足':'库存紧张'}} </p>
						<p>
							<span v-for="(item,index) in goodsDeatalInfo.attributeList" :key='index'>{{item.value}}</span>
						</p>
					</div>
				</div>
				<div class="skuScroll">
					<div class="callUp_style">
						<dl v-for='(item,index) in sKUDate.renderData' :key='index'>
							<dt>{{item.name}}</dt>
							<dd>
								<span   v-for="(itit,index) in item.value"  :key='index' :class='{active:item.iscur==index}' @click="changeSku(item,index,$event)">{{itit}}</span>
							</dd>
						</dl>
					</div>
					<dl class="callUp_count">
						<dt>
							数量
						</dt>
						<dd>
							<a  id="callUp_count_reduce" @click='reduceGoodsCount'></a>
							<em>{{goodsCount}}</em>
							<a  id="callUp_count_increase" @click="increaseGoodsCount"></a>
						</dd>
					</dl>
          <dl class="easy_payment" v-if='goodsDeatalInfo.easyPaymentList'>
            <dt>分期</dt>
            <dd>
              <div @click="easy_payment_tabChange(index,$event)" v-for='(item,index) in goodsDeatalInfo.easyPaymentList' :key="index" :data-easyPaymentNum='item.easyPaymentNum' :class='{activeEasypayment:index==easyPayment_tab_index_light}'>
                <p> {{item.easyPaymentNum}}期 <span v-if="item.freeCharge">0手续费</span><i v-else>含手续费</i></p>
                <p> 每期¥{{item.easyPaymentCent|transMoney00}}</p>
              </div>
            </dd>
          </dl>
				</div>
				<div id="callUp_sure"  v-bind:data-num='goodsAllcount' @click="(addCart_info.num<=goodsAllcount)&&flag&&callUp_sure(states.isAddCart)" :class="{activebtn:flag&&(addCart_info.num<=goodsAllcount)}">
					{{callUp_box_str}}
				</div>
			</div>
		</div >
  	</transition>
	
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from "axios";
import { Toast } from "mint-ui";
import Explain from './components/Explain'
import DetailDesc from './components/DetailDesc'
import SessionSec from './components/SessionSec'
import DetailPromise from './components/DetailPromise'
import PintuanList from './components/PintuanList'
import pintuanNullUser from './components/pintuanNullUser'
import MorePintuanList from './components/morePintuanList'
import ParticipateTuan from './components/ParticipateTuan'
import VipGoods from './components/VipGoods'
import wechatPublicShare from '@/util/wechatPublicShare'
import api from './api'
export default {
  name: "Detail",
  data() {
    return {
      states: {
        callUpState: false,
        isAddCart: "cart"
      },
      goodsDetail: {},
      time: 0,
      sKUDateClass: [],
      sKUDate: {
        itemTitle: "",
        mainPic: "",
        renderData: [],
        library: []
      },
      goodsCount: 1,
      goodsAllcount: 1,
      goodsDeatalInfo: [],
      addCart_info: {
        skuId: null,
        num: 1
      },
      pre_order: undefined,
      flag: true,
      statusInfo:false,
      easyPayment_tab_index_light:0,
      easyPaymentNum:3,
      itemType:1,
      // 拼团列表信息展示状态 1 不显示，2 显示列表
      pintuanListShowState:1,
      pintuanListData: {},
      salePriceCent:'',
      pintuanPriceCent:'',
      // 呼气sku列表是加入购物车还是立即购买文案
      callUp_box_str:'',
      invitationCode:'',
      // 分期购订单分为直接购买和分期购买 1:直接购买 2：分期购买
      easyPaymentType:2
    };
  },
  created() {
    let invitationCode = this.$route.query.invitationCode;
    let id = this.$route.query.id;
    if (isapp() != "weixin" || isapp() != "QQ") {
      window.location.href = "pinkumall://default/item_detail?item_id="+id;
    }
    this.getGoodsDetail(id,invitationCode);
  },
  computed: {
    ...mapState(['commonStore']),
  },
  methods: {
    ...mapMutations(['newRedirectUrl','newSubmit_order_data']),
    //判断是加入购物车还是立即购买？并呼起callUp框
    callUpBox(str,type=2) {
      console.log(str);
      
      // 清空之前sku数据
      this.sKUDate.library = [];
      this.sKUDate.renderData =[];
      this.states.callUpState = true;
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
      this.states.isAddCart = str;
      let id = this.$route.query.id;
      console.log(this.itemType)
      if(str == 'easyPayment'){
         this.easyPaymentType = type;
         if(type==1){
            this.getSKUList(id,1);
         }else{
           this.getSKUList(id,3);
         }
      }else if(str == 'buyNow'){
         this.getSKUList(id,1);
      }else{
        this.getSKUList(id,this.itemType);
      }
      //可能是分期购订单直接购买
      if(str == 'addCart'){
          this.callUp_box_str = '加入购物车'
      }else {
          this.callUp_box_str = '立即购买'
      }
      
      
    },
    //监听来自ParticipateTuan的状态信息
    ListenFromParticipateTuan(msg){
      console.log(msg)
      this.$set(this.states,'callUpState',msg);
      this.callUpBox('pintuan');
    },
    callUp_sure(str) {
      //判断有没有登录
      this.axiosFun({
        config: {
          url: this.$api + "/h5/users/check_login"
        },
        deal: {
          backToLogin: true,
          backToLoginFun: () => {
            this.newRedirectUrl(location.href.split("#/")[1])
            window.localStorage.redirectUrl = location.href.split("#/")[1];
            this.$router.push({
              path: "./login"
            });
          }
        },
        onSuccess: res => {
          if (str == "addCart") {
            this.add_to_Cart_ajax(this.addCart_info);
          } 
          //成功之后存下当前url，若是下单下单成功没有付款，返回的时候能返回到记录的url
          
          else if (str == "buyNow") {
            this.$set(this, "pre_order", {
              'itemList':[
                {
                  buyNum: this.addCart_info.num,
                  skuId: this.addCart_info.skuId
                }
              ],
              'orderType':1,
            });
            this.newSubmit_order_data(this.pre_order)
            window.localStorage.submit_order_data = JSON.stringify(
              this.pre_order
            );
            this.$router.push({
              path: "/submit_order"
            });
          }
          else if(str == 'easyPayment'){
            // console.log(this.easyPaymentNum)
            let orderType;
            if(this.easyPaymentType == 1){
               orderType  = 1;
            }else{
              orderType  = 3;
            }
            this.$set(this,'pre_order',{
              'itemList':[
                {
                  buyNum: this.addCart_info.num,
                  skuId: this.addCart_info.skuId
                }
              ],
              'useCoupon':false,
              'orderType':orderType,
              'easyPaymentNum':this.easyPaymentNum
            })
            this.newSubmit_order_data(this.pre_order);
            window.localStorage.submit_order_data = JSON.stringify(
              this.pre_order
            );
            this.$router.push({
              path: "/submit_order"
            });
          }else if(str=='pintuan'){
            this.$set(this,'pre_order',{
              'itemList':[
                {
                  buyNum: this.addCart_info.num,
                  skuId: this.addCart_info.skuId
                }
              ],
              'useCoupon':false,
              'orderType':4,
            })
            this.newSubmit_order_data(this.pre_order)
            window.localStorage.submit_order_data = JSON.stringify(
              this.pre_order
            );
            this.$router.push({
              path: "/submit_order"
            });
          }
          global.preOrderPreUrl = location.hash.split('#')[1];
        }
      });
    },
    callUp_close() {
      this.states.callUpState = false;
      document.getElementsByTagName("body")[0].style.overflow = "auto";
    },
    getGoodsDetail(id,invitationCode) {
      this.axiosFun({
        config: {
          url: this.$api + "/h5/items/detail",
          params: {
            id: id,
            invitationCode:invitationCode
          }
        },
        onSuccess: res => {
          // console.log(res.data.value);
          // this.goodsDetail = res.data.value;
          let resValue = res.data.value;
          this.$set(this,'goodsDetail',resValue);
          console.log(resValue,888)
          //判断是不是分期购商品
          // this.statusInfo = res.data.value.statusInfo;
          this.$set(this,'statusInfo',resValue.statusInfo);
          //商品的类型
          this.itemType = resValue.basicInfo.itemType;
          // 判断itemType的类型若是为拼团，则去请求待成团列表
          if(this.itemType==4){
            //单独购买价格
            this.salePriceCent = (resValue.basicInfo.salePriceCent/100).toFixed(2);
            this.pintuanPriceCent = (resValue.pintuanInfo.pintuanPriceCent/100).toFixed(2);
            //拼团购买价格
            this.getTuanList(resValue.basicInfo.id);
          }

          this.time = resValue.basicInfo.onSession
            ? new Date(
                resValue.sessionInfo.endTime.replace(/-/g, "/")
              ).getTime() - new Date().getTime()
            : 0;
          this.$nextTick(() => {
            // console.log(this.goodsDetail)
            //数据更新之后倒计时
            this.countDown(this.$refs.countDown);
          });

          // 公众号分享deal
          wechatPublicShare({
            url:location.href.split('#')[0],
            share:{
              title:resValue.shareInfo.title,
              link:resValue.shareInfo.targetUrl,
              desc:resValue.shareInfo.subTitle,
              imgUrl:resValue.shareInfo.picUrl+'@!400'
            },
            isVerification:true
          })
        }
      });
    },
    getSKUList(id,type) {
      this.axiosFun({
        config: {
          url: this.$api + "/h5/items/item_sku_list",
          params: {
            itemId: id,
            type:type
          }
        },
        onSuccess: res => {
          //先把sku首先要展示的信息展示出来
          // console.log(res.data.value.skuList);
          this.$set(this, "goodsDeatalInfo", res.data.value.skuList[0]);
          this.$set(
            this,
            "goodsAllcount",
            res.data.value.skuList[0].quantityLeft
          );
          //如果是分期购商品
          if(this.goodsDetail.easyPaymentInfo && this.easyPaymentType == 2){
            this.$set(this,'easyPaymentNum',res.data.value.skuList[0].easyPaymentList[0].easyPaymentNum)
          }
          //首次设置一下商品id
          this.$set(this.addCart_info, "skuId", res.data.value.skuList[0].id);
          //判断库存
          if (!res.data.value.skuList[0].quantityLeft) {
            this.$set(this, "flag", false);
          } else {
            this.$set(this, "flag", true);
          }
          // console.log(this.addCart_info)
          this.sKUDate.library = res.data.value.skuList;
          this.sKUDate.itemTitle = res.data.value.itemTitle;
          this.sKUDate.mainPic = res.data.value.mainPic;
          if (res.data.value.skuList) {
            res.data.value.skuList.forEach(item => {
              // console.log(item.attributeList);
              //第一步，先把所有的类型遍历出来
              item.attributeList.forEach(itit => {
                // console.log(itit)
                //遍历存放的sku数据并判断，一个简单去重并push数据
                //先把sKUDateClass放满
                if (this.sKUDateClass.indexOf(itit.name) == -1) {
                  this.sKUDateClass.push(itit.name);
                }
              });
            });
            //把name去重放到sKUData.renderData里面
            this.sKUDateClass.forEach(item => {
              this.sKUDate.renderData.push({
                name: item,
                iscur: 0,
                value: []
              });
            });
            //把value放到sKUData.renderData里面
            res.data.value.skuList.forEach(item => {
              item.attributeList.forEach(itit => {
                //判断name是不是对应,对应则放入value里面
                this.sKUDate.renderData.forEach(it => {
                  if (
                    it.name == itit.name &&
                    it.value.indexOf(itit.value) == -1
                  ) {
                    // console.log(it.name);
                    it.value.push(itit.value);
                  }
                });
              });
            });
          }
        }
      });
    },
    reduceGoodsCount() {
      this.goodsCount--;
      if (this.goodsCount <= 1) {
        this.goodsCount = 1;
      }
      this.addCart_info.num = this.goodsCount;
      // console.log(this.addCart_info)
    },
    increaseGoodsCount() {
      this.goodsCount++;
      if (this.goodsCount >= this.goodsAllcount) {
        this.goodsCount = this.goodsAllcount;
      }
      if (this.goodsAllcount < 1) {
        this.goodsCount = 1;
      }
      this.addCart_info.num = this.goodsCount;
      // console.log(this.addCart_info)
    },
    changeSku(item, index, event) {
     
      //无效商品
      if (event.target.className.indexOf("invalid") != -1) {
        return false;
      } else {
        item.iscur = index;
        let classArr = [];
        //获取带有active状态的标签
        this.$nextTick(() => {
          let spanActive = document.getElementsByClassName("active");
          for (let i = 0; i < spanActive.length; i++) {
            classArr.push({
              name: spanActive[i].parentNode.parentNode.firstChild.innerHTML,
              value: spanActive[i].innerHTML
            });
            // console.log(spanActive[i].parentNode.parentNode.firstChild.innerHTML)
          }
          //查询this.sKUDate.library字典
          console.log(this.sKUDate.library)
          console.log(classArr);
          // console.log(JSON.stringify(classArr))
          this.sKUDate.library.forEach(item => {
            // console.log(JSON.stringify(item.attributeList))
            //转成字符串比较

            // console.log(JSON.stringify(item.attributeList))
            //  console.log(JSON.stringify(classArr) == JSON.stringify(item.attributeList))
            if (
              JSON.stringify(classArr) == JSON.stringify(item.attributeList)
            ) {
              // console.log(JSON.stringify(item.attributeList))
              // console.log(item);
              // 设置物品的id
              this.$set(this.addCart_info, "skuId", item.id);
              // console.log(this.addCart_info);
              //设置物品的详情
              this.$set(this, "goodsDeatalInfo", item);
              //修改库存总数
              this.$set(this, "goodsAllcount", item.quantityLeft);
              if (item.quantityLeft > 0) {
                this.$set(this, "flag", true);
              } else {
                this.$set(this, "flag", false);
              }
              //判断若是此时的this.goodsAllcount大于itit.quantityLeft(库存),让this.goodsAllcount为1
              if (this.goodsCount > item.quantityLeft) {
                this.$set(
                  this,
                  "goodsCount",
                  item.quantityLeft < 1 ? 1 : item.quantityLeft
                );
              }
            }
          });
        });
      }
    },
    add_to_Cart_ajax(info) {
      let params = new FormData();
      params.append("skuId", info.skuId);
      params.append("num", info.num);
      // 		axios.post(this.$api+'/h5/cart/add',params).then((res)=>{
      // 	// console.log(res);
      // 			if(res.status ==200 && res.data){
      // 				let instance = Toast('添加购物车成功');
      // 		setTimeout(() => {
      // 		  instance.close();
      // 		  this.states.callUpState = false;
      // 		  document.getElementsByTagName('body')[0].style.overflow = 'auto';
      // 		}, 500);

      // 			}
      // })

      this.axiosFun({
        config: {
          method: "post",
          url: this.$api + "/h5/cart/add",
          data: params
        },
        onSuccess: res => {
          let instance = Toast("添加购物车成功");
          setTimeout(() => {
            instance.close();
            this.states.callUpState = false;
            document.getElementsByTagName("body")[0].style.overflow = "auto";
          }, 1000);
        }
      });
    },
    countDown(dom) {
      if (dom) {
        setInterval(() => {
          this.time -= 1000;
          let second = parseInt(this.time / 1000) % 60,
            min = ((parseInt(this.time / 1000) - second) / 60) % 60,
            hour =
              (((parseInt(this.time / 1000) - second) / 60 - min) / 60) % 24,
            day =
              (((parseInt(this.time / 1000) - second) / 60 - min) / 60 - hour) /
              24;
          dom.innerHTML =
            "距离结束：" +
            (day > 0 ? day + "天" : "") +
            (hour < 10 ? "0" + hour : hour) +
            ":" +
            (min < 10 ? "0" + min : min) +
            ":" +
            (second < 10 ? "0" + second : second);
        }, 1000);
      }
    },
    toCart() {
      this.axiosFun({
        config: {
          url: this.$api + "/h5/users/check_login"
        },
        deal: {
          backToLogin: true,
          backToLoginFun: () => {
            this.newRedirectUrl(location.href.split("#/")[1])
            window.localStorage.redirectUrl = location.href.split("#/")[1];
            this.$router.push({
              path: "./login"
            });
          }
        },
        onSuccess: res => {
          this.$router.push({
            path: "./cart"
          });
        }
      });
    },
    easy_payment_tabChange(index,e){
      this.easyPayment_tab_index_light = index;
      e = e || window.e;
      this.$set(this,'easyPaymentNum',e.currentTarget.dataset.easypaymentnum)
    },
    async getTuanList(itemId){
      let wipData = await api.getTuanList(itemId);
      this.pintuanListShowState = wipData.value.values.length?2:1;
      this.pintuanListData = wipData.value;
    }
  },
  filters: {
    capitalize(value) {
      if (!value) return "0";
      return parseFloat(value / 100)
        .toFixed(2)
        .toString()
        .split(".")[0];
    },
    capitalize2(value) {
      if (!value) return "0";
      return parseFloat(value / 100)
        .toFixed(2)
        .toString()
        .split(".")[1];
    }
  },
  components: {
    Explain,DetailDesc,SessionSec,DetailPromise,PintuanList,pintuanNullUser,MorePintuanList,ParticipateTuan,VipGoods
  },
  mounted() {
    
  },
  destroyed () {
    document.getElementsByTagName("body")[0].style.overflow = "auto";
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
@import "~@/common/css/var.scss";
@import "~@/common/css/detail.scss";
</style>
