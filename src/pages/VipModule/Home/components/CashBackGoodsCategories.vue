<template>
    <div class="rights_list">
        <h5>黑卡会员专区</h5>
        <div :class="{'rights_list_box':true,'rights_list_box_fixed':fixStatus}"   >
            <ul class="rights_list_tab" >
                <li v-for='(item,index) in goodscategories' :key='index' :class="{active:rightsActiveIndex==index}" @click='changeRightsTab(index,item.id)'>{{item.name}}
                    <!-- <i :class="{active:rightsActiveIndex==index}"></i> -->
                </li>
            </ul>
        </div>
        <div class="rights_list_box" v-if='fixStatus'>
        </div>
        <CashBackGoods  :id="groupId"></CashBackGoods>
    </div>
</template>

<script>
    import {
        mapMutations,
        mapState
    } from 'vuex';
    import api from "@/pages/VipModule/Home/api";
    import CashBackGoods from "./CashBackGoods"
    import {addEvent} from '@/util'
    export default {
        data() {
            return {
                rightsActiveIndex: 0,
                goodscategories: [{id:-1,name:"推荐"}],
                groupId:-1,
                fixStatus:false,
    
            }
        },
        created() {
            this.rightsActiveIndex = this.vipStore.rightsIndex;
            this.getCashBackGoodsCategories()
        },
        components:{ CashBackGoods },
        computed: {
            ...mapState(['vipStore'])
        },
        methods: {
            ...mapMutations(['changeRightsIndex']),
            changeRightsTab(index, id) {
                this.rightsActiveIndex = index;
                this.groupId = id
                //this.$emit('changeID',id)
                //console.log(this.vipStore.id)
                this.changeRightsIndex(index);
            },
            async getCashBackGoodsCategories() {
                var wipdata = await api.getCashBackGoodsCategories();
                console.log(wipdata)
                if (wipdata.succ) {
                    this.goodscategories.push(...wipdata.value.groups) 
                }
    
            },
        },
        mounted() {
            let rights_list_box_top = document.getElementsByClassName('rights_list_box')[0].offsetTop
            addEvent(window,'scroll',()=>{
                let t = document.documentElement.scrollTop||document.body.scrollTop;
                if(t>rights_list_box_top){
                    this.fixStatus = true;
                }else{
                    this.fixStatus = false;
                }
            })
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
    @import "~@/common/css/var.scss";
    .rights_list {
        width: 100%;
        box-sizing: border-box;
        color: #141414;
        font-weight: normal;
        display: flex;
        flex-direction: column;
        background: #F2D8B5;
        h5 {
            padding: 0 20px;
            font-size: 18px;
            height: 30px;
        }
        >.rights_list_box {
            overflow-x: scroll;
            overflow-y: hidden;
            height: 44px;
            width: 375px;
            // padding-bottom: 10px;
            ul.rights_list_tab {
                //overflow: hidden;
                display: flex;
                align-items: center;
                position: relative;
                height: 44px;
                li {
                    flex: none;
                    width: 70px;
                    height: 25px;
                    margin: 0 0px 0 10px;
                    box-sizing: border-box;
                    text-align: center;
                    line-height: 25px;
                    border: 1px solid #141414;/**no**/
                    border-radius: 22px;
                    // justify-content: center;
                    position: relative;
                    i.active {
                        position: absolute;
                        z-index: 99;
                        bottom: -20px;
                        left: 50%;
                        margin-left: -10px;
                        width: 0px;
                        height: 0px;
                        border-top: 10px solid rgba(0, 0, 0, 0);
                        border-right: 10px solid rgba(0, 0, 0, 0);
                        border-bottom: 10px solid white;
                        border-left: 10px solid rgba(0, 0, 0, 0);
                    }
                }
                li:first-child{
                    margin-left: 20px !important;
                }
                li:nth-last-child(1){
                    margin-right: 10px;
                }
                li.active {
                    color: $HunterThemeColor;
                    background: linear-gradient(left, #3E3433, #141414 )
                }
            }
        }
        >.rights_list_box_fixed{
            position: fixed;
            top: 0;
            background: white;
            z-index: 99;
             padding-bottom: 0px;
        }
        .rights_list_box::-webkit-scrollbar{
            display: none;
            opacity: 0;
        }
    }
</style>
