<template>
    <div class="gold_coin_task">
        <ul>
            <CashBackGoodsItem v-for='(item,index) in itemList' :key='index' :itemInfo='item'></CashBackGoodsItem>
        </ul>
    </div>
    
</template>

<script>
import { nextpage } from "@/util";
import api from "@/pages/VipModule/Home/api.js";
import CashBackGoodsItem from "./CashBackGoodsItem";
import { mapState, mapMutations } from "vuex";
import { Loadmore } from "mint-ui";
import { addEvent } from "@/util";
export default {
  props: {},
  data() {
    return {
      currentPage: 1,
      confirmCurrentPage: 1,
      pageCount: 1,
      confirmCurrenPage: 1,
      itemList: [],
      allLoaded: false,
      bottomDistance: 800,
      imgurl: require("static@/img/rights_9_pic.png"),
      itemId: undefined
    };
  },
  props: {
    id: {
      type: Number,
      default: -1
    }
  },
  created() {
    this.itemId = this.id;
    this.getCashBackGoodsList({
      currentPage: this.currentPage,
      pageSize: 4,
      groupId: this.itemId
    });
    //console.log(this.vipStore.id,33)
  },

  computed: {
    ...mapState(["vipStore"])
  },
  watch: {
    id: function(val) {
      // let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      // scrollTop = 0
      this.currentPage = 1;
      this.confirmCurrentPage = 1;
      this.itemList = [];
      this.itemId = val;
      //document.body.scrollTop = this.top
      //document.documentElement.scrollTop = this.top
      // console.log(document.body.scrollTop||document.documentElement.scrollTop,this.top)
      this.getCashBackGoodsList({
        currentPage: this.currentPage,
        groupId: val,
        pageSize: 4
      });
    }
  },
  methods: {
    // handleScroll() {
    //页面滚动出发做一些事情
    // },
    async getCashBackGoodsList(config) {
      if (
        this.currentPage == this.confirmCurrentPage &&
        this.currentPage <= this.pageCount
      ) {
        this.confirmCurrentPage = -1;
        var wip = await api.getCashBackGoodsList(config);
        // if(this.currentPage == 1) {
        //   this.itemList = wip.value.values
        // }else {
        //   this.itemList.push(...wip.value.values);
        // }
        this.itemList.push(...wip.value.values);
        // alert(1)
        //this.itemList = wip.value.values
        //console.log(this.itemList,3333)
        this.currentPage++;
        this.confirmCurrentPage = this.currentPage;
        this.pageCount = wip.value.pageCount;
      }
    }
  },

  filters: {
    parse2point(value) {
      return parseFloat(value / 100).toFixed(2);
    }
  },
  components: {
    CashBackGoodsItem
  },

  mounted() {
    //添加页面滚动事件window.addEventListener('scroll', this.handleScroll)
    addEvent(window, "scroll", () => {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      //文本高度
      let textHeight = document.body.scrollHeight;
      //屏幕高度
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      //热卖商品高度
      //去掉热卖商品后高度取消
      if (textHeight - top - clientHeight < clientHeight / 2) {
        this.getCashBackGoodsList({
          currentPage: this.currentPage,
          groupId: this.itemId,
          pageSize: 4
        });
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.gold_coin_task {
  width: 339px;
  display: flex;
  flex-direction: column;
  padding: 10px 18px;
  min-height: 600px;
  ul {
    background: #f2d8b5;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
