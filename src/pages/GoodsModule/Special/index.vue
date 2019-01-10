<template>
  <div class="special">
  	<Download></Download>
  	<h2>
  		<span class="arrowLeft" onclick="window.history.go(-1)"></span>
  		<p>{{session_detail.title}}</p>
  	</h2>
	<div class="special_content">
		<!-- 有图	 -->
		<div v-if="session_detail.banner" class="special_hasImg">
			<img v-lazy="imgUrl+session_detail.banner+'@!1200'" alt="">
			<p>{{session_detail.title}}</p>
			<p><span><em >{{session_detail.minDiscountPercent|capitalize0}}</em>折起</span><i>每满{{session_detail.discountThresholdCent|transMoney}}再减{{session_detail.discountCent|transMoney}}上不封顶</i></p>
		</div>
		<!-- 无图 -->
		<dl v-else-if="session_detail.brandLogo" class="special_hasnotImg" >
			<dt>
				<img  v-bind:src="imgUrl+session_detail.brandLogo+'@!800'" alt="">
			</dt>
			<dd>
				<p>{{session_detail.title}}</p>
				<p><span>{{session_detail.minDiscountPercent|capitalize0}}</span>折起</p>
				<p>每满{{session_detail.discountThresholdCent|capitalize}}再减{{session_detail.discountCent|capitalize}}上不封顶</p>
			</dd>
		</dl>
		<h3 ref='countDown'>
			距离结束<span>{{time|day}}</span>天<span>{{time|hour}}</span>时<span>{{time|min}}</span>分<span>{{time|second}}</span>秒
		</h3>
		<GoodsList :GoodsData='GoodsData'></GoodsList>
	</div>


  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import { Toast } from "mint-ui";
export default {
  name: "Special",
  data() {
    return {
      session_detail: {},
      time: 0,
      GoodsData: [],
      specialPage: 1,
      specialBool: 1,
      specialFlag: true,
      sessionId: undefined,
      imgUrl: ""
    };
  },
  created() {
    this.imgUrl = this.commonStore.imgUrlPrefix
      ? this.commonStore.imgUrlPrefix
      : localStorage.imgUrlPrefix;
    this.sessionId = this.$route.query.sessionId;
    this.getSession_detail(this.sessionId);
    this.getSpecial_list(this.sessionId, this.specialPage);
  },
  computed: {
    ...mapState(['commonStore'])
  },
  methods: {
    getSession_detail(id) {
      this.axiosFun({
        config: {
          url: this.$api + "/h5/sales/session_detail",
          params: {
            id: id
          }
        },
        onSuccess: res => {
          this.$set(this, "session_detail", res.data.value);
          //兼容safari浏览器
          let endTime = res.data.value.endTime.replace(/-/g, "/");
          // console.log(endTime)
          this.time = new Date(endTime).getTime() - new Date().getTime();
          this.countDown(this.$refs.countDown);
        }
      });
    },
    getSpecial_list(id, page) {
      if (this.specialPage == this.specialBool) {
        this.specialBool = false;

        this.axiosFun({
          config: {
            url: this.$api + "/h5/sales/session_item_list",
            params: {
              sessionId: id,
              currentPage: page,
              pageSize: 8
            }
          },
          deal: {
            isIndicator: false
          },
          onSuccess: res => {
            if (res.data.value.values.length) {
              res.data.value.values.forEach(item => {
                this.GoodsData.push(item);
              });
              this.specialPage++;
              this.specialBool = this.specialPage;
            } else {
              this.specialFlag = false;
            }
          }
        });
      }
    },
    nextPage() {
      window.onload = window.onscroll = () => {
        let top = document.documentElement.scrollTop || document.body.scrollTop;
        //文本高度
        let textHeight = document.body.scrollHeight;
        //屏幕高度
        let clientHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        //热卖商品高度
        if (textHeight - top - clientHeight < clientHeight/2 && this.specialFlag) {
          this.getSpecial_list(this.sessionId, this.specialPage);
        }
      };
    },
    countDown(dom) {
      let timer = setInterval(() => {
        // console.log(this.time)
        this.time -= 1000;
        let second = parseInt(this.time / 1000) % 60,
          min = ((parseInt(this.time / 1000) - second) / 60) % 60,
          hour = (((parseInt(this.time / 1000) - second) / 60 - min) / 60) % 24,
          day =
            (((parseInt(this.time / 1000) - second) / 60 - min) / 60 - hour) /
            24;
        dom.innerHTML =
          "距离结束<span>" +
          (day > 0 ? day : 0) +
          "</span>天<span>" +
          (hour < 10 ? "0" + hour : hour) +
          "</span>时<span>" +
          (min < 10 ? "0" + min : min) +
          "</span>分<span>" +
          (second < 10 ? "0" + second : second) +
          "</span>秒";
        if (this.time < 1000) {
          dom.innerHTML =
            "距离结束<span>0</span>天<span>0</span>时<span>0</span>分<span>0</span>秒";

          clearInterval(timer);
        }
        for (let i = 0; i < dom.children.length; i++) {
          dom.children[i].style.cssText =
            "display: inline-block;background:#ffffff;width:20px;height:20px;line-height: 20px;margin: 0 3px;color:#333234";
        }
      }, 1000);
    }
  },
  filters: {
    capitalize00: function(value) {
      if (!value) return "0";
      return parseFloat(value / 100).toFixed(2);
    },
    capitalize0: function(value) {
      if (!value) return "0";
      return parseFloat(value / 10).toFixed(1);
    },
    capitalize: function(value) {
      if (!value) return "0";
      return parseInt(value / 100);
    },
    day(value) {
      let second = parseInt(value / 1000) % 60,
        min = ((parseInt(value / 1000) - second) / 60) % 60,
        hour = (((parseInt(value / 1000) - second) / 60 - min) / 60) % 24,
        day = (((parseInt(value / 1000) - second) / 60 - min) / 60 - hour) / 24;
      return day;
    },
    hour(value) {
      let second = parseInt(value / 1000) % 60,
        min = ((parseInt(value / 1000) - second) / 60) % 60,
        hour = (((parseInt(value / 1000) - second) / 60 - min) / 60) % 24;
      return hour < 10 ? "0" + hour : hour;
    },
    min(value) {
      let second = parseInt(value / 1000) % 60,
        min = ((parseInt(value / 1000) - second) / 60) % 60;
      return min < 10 ? "0" + min : min;
    },
    second(value) {
      let second = parseInt(value / 1000) % 60;
      return second < 10 ? "0" + second : second;
    }
  },
  mounted() {
    this.nextPage();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
@import "~@/common/css/special";
</style>
