<template>
  <router-link class="commodity" :to="{path:'./detail',query:{id:itemInfo.itemId}}">
      <img v-lazy="itemInfo.pic+'@!400'" alt="">
      <div class="commodityRight">
          <div>{{itemInfo.title}}</div>
          <div>{{itemInfo.desc}}</div>
          <dl>
              <dt>
                  <p>￥{{itemInfo.pintuanPriceCent |capitalize}}</p>
                  <p>原价<i>￥{{itemInfo.salePriceCent |capitalize}}</i></p>
              </dt>
              <dd>去拼团</dd>
          </dl>
      </div>
  </router-link>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name: "commodity",
  props:{
      itemInfo:{
          type:Object,
          default:{}
      }
  },
  data() {
    return {
        
    };
  },
  created() {
  },
  computed: {
    ...mapState(['commonStore'])
  },
  methods: {
  },
  components:{
  },
  filters: {
    capitalize(value) {
      if (!value) return "0";
      return parseFloat(value / 100)
        .toFixed(2)
        .toString()
    },
  },
  mounted() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.commodity{
    width: 335px;
    height: 150px;
    box-sizing: border-box;
    padding: 5px;
    display: flex;
    background: white;
    margin-bottom: 10px;
    >img{
        width: 140px;
        height: 140px;
        flex: none;
    }
    .commodityRight{
        flex: 1;
        display: flex;
        flex-direction: column;
        font-size: 14px;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 10px 0 0px 10px;
        font-family: "PingFang SC";
        >div:nth-child(1){
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: 20px;
            word-wrap: break-word;
            word-break:break-all;
        }
        >div:nth-child(2){
            color: $pink;
        }
        dl{
            display: flex;
            justify-content: space-between;
            dt{
                p:nth-child(1){
                    font-size: 18px;
                    color: $pink;
                    line-height: 20px;
                    font-weight: bold;
                }
                p:nth-child(2){
                    font-size: 10px;
                    color: $lightGray;
                    i{
                        text-decoration: line-through;
                    }
                }
            }
            dd{
                width: 90px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                color: white;
                background: $pink;
                border-radius: 5px;
            }
        }

    }
}
</style>
