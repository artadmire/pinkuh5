<template>
  <keep-alive>
  <div class="home">
      <Download></Download>
      <Title></Title> 
      <div class="home_content">
          <Swiper></Swiper>
          <!-- 保证 -->
          <ul class='promiseDes'>
            <li v-for='(item,index) in platformPromise' :key='index'>
              <i></i>{{item}}
            </li>
          </ul> 
          <!-- 模板 -->
          <section class="home_module" v-for='(item,index) in advertisement' :key='index'>
            <!-- 标题模块 -->
            <div class="module_title" v-if='item.templateId==5' >
              <p>{{item.data.title}}</p>
              <p>{{item.data.subtitle}}</p>
            </div>
            <!-- 模块1 -->
            <div class="module1" v-else-if='item.templateId==1' >
              <SchemeSimple  :url='item.data.link' :urlPrefix='imgUrl' :img='item.data.img' size='@!1200' />
            </div>
            <!-- 模块2 -->
            <div class="module2" v-else-if='item.templateId==4' >
               <SchemeSimple v-for='(itit,index) in item.data.items' v-if="index<2" :url='itit.url' :img='itit.img' :urlPrefix='imgUrl' size='@!400' :key='index'/>
            </div>
            <!-- 模块3 -->
            <div class="module3" v-else-if='item.templateId==7' >
                 <div>
                   <SchemeSimple v-for='(itit,index) in item.data.items' v-if="index==0" :url='itit.url' :img='itit.img' :urlPrefix='imgUrl' size='@!400' :key='index'/>
                 </div>
                 <div>
                    <SchemeSimple v-for='(itit,index) in item.data.items' v-if="index==1" :url='itit.url' :img='itit.img' :urlPrefix='imgUrl' size='@!400' :key='index'/>
                     <SchemeSimple v-for='(itit,index) in item.data.items' v-if="index==2" :url='itit.url' :img='itit.img' :urlPrefix='imgUrl' size='@!400' :key='index'/>
                 </div>
            </div>
            <!-- 模块4 -->
            <div class="module4" v-else-if='item.templateId==6' >
              <SchemeSimple v-for='(itit,index) in item.data.items' v-if="index<3" :url='itit.url' :img='itit.img' :urlPrefix='imgUrl' size='@!400' :key='index'/>
            </div>
            <!-- 模块5 -->
            <div class="module5" v-else-if='item.templateId==10'>
                <!-- 分期 1分购 流量充值 分类 -->

                <SchemeSimple v-for='(itit,index) in item.data.items'   :key='index' v-if="index<4" :url='itit.url' :img='itit.img' :urlPrefix='imgUrl' size='@!400' :title='itit.title' /> 
            </div>
            <!-- 模块6 -->
            <div class="module6" v-else-if='item.templateId==12' >
              <SchemeSimple  :url='item.data.link' :urlPrefix='imgUrl' :img='item.data.img' size='@!1200' />
            </div>
          </section>
          
          <!-- 甄选大牌 -->
          <!-- <dl class="brandWall">
            <dt>
              <div>
                <p>甄选大牌</p>
                <p>千家品牌 尽在爆好货</p>
              </div>
              <div @click='changeBrand'>
                <i :class="{rotate:rotateState}"></i>换一换
              </div>
            </dt>
            <dd>
              <SchemeSimple v-for='(itit,index) in brandWallArr'   :url='itit.targetUrl' :img='itit.icon' :urlPrefix='imgUrl' size='@!400' :key='index'/>
            </dd>
            <div class="ceng"></div>
            <div class="ceng"></div>
          </dl> -->


          <!-- 品牌精选 -->
          <div class="brand">
            <h2>
              <span>- 品牌精选 -</span>
            </h2>
            <div class="brand_list" v-if="getBrandSelectData.length">
              <BrandItem v-for="(item,index) in getBrandSelectData" :key='index' :item='item'/>
            </div>
          </div>
      </div>
      <Footer></Footer>
  </div>
  </keep-alive>
</template>

<script>
import { mapState,mapMutations} from 'vuex';
import BrandItem from './components/BrandItem'
import Swiper from "@/pages/common_components/Swiper";
import { Toast } from "mint-ui";
export default {
  name: "Home",
  data() {
    return {
      name: "suolun",
      bannerArr: [],
      page: 1,
      bool: 1,
      getBrandSelectData: [],
      imgUrl: "",
      rotateState: false,
      // brandWallArr: [],
      advertisement: [],
      brand_wall_page: 1,
      brand_wall_all_page: 1,
      platformPromise: [],
      pageCount: 1
    };
  },
  created() {
    console.log(this.commonStore)
    console.log("%c观火数据", "color:red;text-shadow: 2px 5px 3px pink;");
    //修改footer组件底部的状态信息
    this.newFooterState({
      tab1: true,
      tab2: false,
      tab3:false,
      tab4: false
    })
    window.localStorage.footerState = JSON.stringify({
      tab1: true,
      tab2: false,
      tab3: false,
      tab4:false,
    });
    //修改
    this.imgUrl = this.commonStore.imgUrlPrefix
      ? this.commonStore.imgUrlPrefix
      : localStorage.imgUrlPrefix;
    this.platformPromise = global.platformPromise;
    this.getBrandSelect(this.page);
    this.getAdvertisement();
    // this.get_brand_wall(this.brand_wall_page);
  },
  computed: {
    ...mapState(['commonStore'])
  },
  methods: {
    ...mapMutations(['newFooterState']),
    //品牌精选列表
    getBrandSelect(page) {
      if (this.page == this.bool && this.page <= this.pageCount) {
        this.bool = false;
        this.axiosFun({
          config: {
            url: this.$api + "/h5/home/session_list",
            params: {
              currentPage: page,
              pageSize: 3
            }
          },
          deal: {
            isIndicator: false
          },
          onSuccess: res => {
            this.pageCount = res.data.value.pageCount;
            this.page++;
            this.bool = this.page;
            if (res.data.value.values.length) {
              // this.getBrandSelectData = res.data.value.values;
              res.data.value.values.forEach(item => {
                this.getBrandSelectData.push(item);
              });
            }
          }
        });
      }
    },
    //分页
    nextpage() {
      // console.log(this.GoodsData)
      window.onload = window.onscroll = () => {
        let top = document.documentElement.scrollTop || document.body.scrollTop;
        //文本高度
        let textHeight = document.body.scrollHeight;
        //屏幕高度
        let clientHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        //热卖商品高度
        //去掉热卖商品后高度取消
        if (textHeight - top - clientHeight < clientHeight / 2) {
          this.getBrandSelect(this.page);
        }
      };
    },
    // 获取广告
    getAdvertisement() {
      this.axiosFun({
        config: {
          url: this.$api + "/h5/ads/query",
          params: {
            positionId: 6,
            pageSize: 100,
            currentPage: 1
          }
        },
        onSuccess: res => {
          // console.log(res.data.value.values);
          let arr = [];
          res.data.value.values.forEach(item => {
            arr.push({
              data: JSON.parse(item.data),
              templateId: item.templateId
            });
          });
          this.$set(this, "advertisement", arr);
        }
      });
    },
    //获取品牌墙
    // get_brand_wall(currentPage) {
    //   this.axiosFun({
    //     config: {
    //       url: this.$api + "/h5/home/brand_wall",
    //       params: {
    //         currentPage: currentPage,
    //         pageSize: 10
    //       }
    //     },
    //     deal: {
    //       isIndicator: false
    //     },
    //     onSuccess: res => {
    //       this.$set(this, "brand_wall_all_page", res.data.value.pageCount);
    //       this.$set(this, "brandWallArr", res.data.value.values);
    //       // console.log(this.brandWallArr)
    //       setTimeout(() => {
    //         this.$set(this, "rotateState", false);
    //       }, 1000);
    //     }
    //   });
    // },
    changeBrand() {
      this.$set(this, "rotateState", true);

      if (this.brand_wall_page < this.brand_wall_all_page) {
        this.brand_wall_page++;
      } else {
        this.brand_wall_page = 1;
      }
      // console.log(this.brand_wall_page)
      // this.get_brand_wall(this.brand_wall_page);
    }
  },
  
  mounted() {
    // this.nextpage();
  },
  activated() {
    this.nextpage();
  },
  components: {
    Swiper,BrandItem
  },
  destroyed() {
    window.onscroll = () => {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
@import "~@/common/css/var.scss";
@import "~@/common/css/home.scss";
</style>






