<template>
  <div class="categories">
    <h2>品牌分类</h2>

    <div class="categories_content">
        <ul class="categories_content_left">
            <li v-for="(item,index) in group_all" :key='index' :data-id='item.id' :class='{active:item.id==parameter.groupId}' @click='groups_list_change(item.id)'><i>{{item.name}}</i></li>
        </ul>
        <div class="categories_content_right">
            <p>- 强烈推荐 -</p>
            <div class="brandListBox"  @scroll="paperScroll()" ref="brandListBox">
                <ul class="brandList" :data-id='brands_list'>
                    <router-link v-for='(item,index) in brands_list' :key='index' :to='{path:"./special",query:{sessionId:item.sessionId}}'>
                        <img :src="imgUrl+item.logo+'@!200'" alt="">
                        <p>{{item.minDiscountPercentage | transMoney0}}<i>折起</i></p>
                    </router-link>
                </ul>
            </div>
            
        </div>
    </div>


    <Footer></Footer>
  </div>
</template>
  
<script>
import { mapState,mapMutations} from 'vuex';
export default {
  name: "Header",
  data() {
    return {
        imgUrl:'',
        group_all:[],
        brands_list:[],
        id:'',
        //参数
        parameter:{
            groupId:'',
            pageSize:20,
            currentPage:1
        },
        status: 1,
        pageCount:1,
        categoryId:''
    };
  },
  created() {
    this.categoryId = this.$route.query.id;
    this.imgUrl = this.imgUrlPrefix
    ? this.imgUrlPrefix
    : localStorage.imgUrlPrefix;
    this.newFooterState({
      tab1: false,
      tab2: false,
      tab3:true,
      tab4: false
    })
    window.localStorage.footerState = JSON.stringify({
      tab1: false,
      tab2: false,
      tab3:true,
      tab4: false
    });
    this.get_group_all_ajax();
  },
  methods:{
      ...mapMutations(['newFooterState']),
      groups_list_change(id){
            //判断不是相同的id,重置数据;
            
            if(id != this.id){
                this.brands_list = [];
                this.parameter.groupId = id ;
                this.parameter.currentPage = 1;
                this.status = 1;
                this.get_group_brand_list_ajax(this.parameter);
            }
           
      },
      get_group_all_ajax(){
          this.axiosFun({
              config:{
                  url:this.$api+'/h5/categories/group_all',
              }, 
              onSuccess:res=>{
                   //第一次请求列表请求回来
                  this.$set(this,'group_all',res.data.value.groups);
                //先判断有没有带参，若是带的有参数，直接用没有的话，默认取返回值的第一个即可
                if(this.categoryId){
                    // 默认触发一次点击事件就好了
                    this.groups_list_change(this.categoryId);
                }else{
                    this.parameter.groupId = res.data.value.groups[0].id;
                     this.get_group_brand_list_ajax(this.parameter);
                }
               
               
              }
          })
      },
      get_group_brand_list_ajax(obj){

        if(this.status==obj.currentPage&&obj.currentPage<=this.pageCount){
            this.status = false;
            this.axiosFun({
                config:{
                    url:this.$api+'/h5/categories/group_brand_list',
                    params:obj
                },
                onSuccess:res=>{
                    //设置总页数
                    this.pageCount = res.data.value.pageCount;
                    res.data.value.values.forEach((item,index)=>{
                        this.brands_list.push(item);
                    })
                    this.parameter.currentPage++;
                    this.status = this.parameter.currentPage;
                }
            })
        }
        
      },
      paperScroll() {
        
        let top = this.$refs.brandListBox.scrollTop;
        //文本高度
        let textHeight = this.$refs.brandListBox.scrollHeight;
        //屏幕高度
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //热卖商品高度
        // console.log(textHeight - top - clientHeight)
        if (textHeight - top - clientHeight < 100 ) {
            this.get_group_brand_list_ajax(this.parameter);
        }
    },
  },
  mounted(){
      
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
@import "~@/common/css/categories.scss";
</style>
