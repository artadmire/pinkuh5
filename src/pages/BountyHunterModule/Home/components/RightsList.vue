<template>

    <div class="rights_list">
        <h5>您的专属权益</h5>
        <div class="rights_list_box">
             <ul class="rights_list_tab" :style="{left:left+'px'}">
                <li v-for='(item,index) in hunterStore.bountyRightsList' v-show='(index!=4 && index!= 7 && index != 1 && index != 0 && index != 5)||Simplified!=1' :key='index' :class="{active:rightsActiveIndex==index}" @click='changeRightsTab(index)'>
                    <div v-if='index==2'>
                        <img v-if='rightsActiveIndex==index' src="@/assets/rights_hunter_1_selected_h5_icon.png" alt="">
                        <img v-else src='@/assets/rights_hunter_1_unselected_h5_icon.png' alt="">
                    </div>
                    <div v-else-if='index==3'>
                        <img v-if='rightsActiveIndex==index' src="@/assets/rights_hunter_2_selected_h5_icon.png" alt="">
                        <img v-else src='@/assets/rights_hunter_2_unselected_h5_icon.png' alt="">
                    </div>
                    <div v-else-if='index==5'>
                        <img v-if='rightsActiveIndex==index' src="@/assets/rights_hunter_3_selected_h5_icon.png" alt="">
                        <img v-else src='@/assets/rights_hunter_3_unselected_h5_icon.png' alt="">
                    </div>
                    <div v-else-if='index==8'>
                        <img v-if='rightsActiveIndex==index' src="@/assets/rights_hunter_4_selected_h5_icon.png" alt="">
                        <img v-else src='@/assets/rights_hunter_4_unselected_h5_icon.png' alt="">
                    </div>
                    <div v-else-if='index==4'>
                        <img v-if='rightsActiveIndex==index' src="@/assets/rights_hunter_5_selected_h5_icon.png" alt="">
                        <img v-else src='@/assets/rights_hunter_5_unselected_h5_icon.png' alt="">
                    </div>
                    <div v-else-if='index==7'>
                        <img v-if='rightsActiveIndex==index' src="@/assets/rights_hunter_6_selected_h5_icon.png" alt="">
                        <img v-else src='@/assets/rights_hunter_6_unselected_h5_icon.png' alt="">
                    </div>
                    <div v-else-if='index==1'>
                        <img v-if='rightsActiveIndex==index' src="@/assets/rights_hunter_7_selected_h5_icon.png" alt="">
                        <img v-else src='@/assets/rights_hunter_7_unselected_h5_icon.png' alt="">
                    </div>
                    <div v-else-if='index==6'>
                        <img v-if='rightsActiveIndex==index' src="@/assets/rights_hunter_8_selected_h5_icon.png" alt="">
                        <img v-else src='@/assets/rights_hunter_8_unselected_h5_icon.png' alt="">
                    </div>
                    <div v-else-if='index==0'>
                        <img v-if='rightsActiveIndex==index' src="@/assets/rights_hunter_9_selected_h5_icon.png" alt="">
                        <img v-else src='@/assets/rights_hunter_9_unselected_h5_icon.png' alt="">
                    </div>
                    <p>{{item.title}}</p>
                    <i :class="{active:rightsActiveIndex==index}"></i>
                </li>
            </ul>
        </div>
       
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
    data(){
        return{
            rightsActiveIndex:0,
            left:0,
            Simplified:0
        }
    },
    created(){
        this.rightsActiveIndex = this.hunterStore.rightsIndex;
        
    },
    computed: {
      ...mapState(['hunterStore'])  
    },
    methods: {
        ...mapMutations(['changeRightsIndex']),
        changeRightsTab(index){
            this.rightsActiveIndex = index;
            this.changeRightsIndex(index);
            // 调整active位置是不是在中间
            // if(index<7&&index>2){
            //      this.left = -70*(index-2);
            // }
           
        }
    },
    mounted () {
        let rights_list_tab_Ul = document.getElementsByClassName('rights_list_tab')[0],
            rights_list_tab_LI = rights_list_tab_Ul.getElementsByTagName('li');
        rights_list_tab_Ul.style.width =rights_list_tab_LI[0].clientWidth*rights_list_tab_LI.length+'px';
        this.Simplified = this.$route.query.Simplified;
        console.log('Simplified=',this.Simplified);
        if(this.Simplified){
            this.changeRightsTab(2);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.rights_list{
    width: 100%;
    box-sizing: border-box;
    color: white;
    font-weight: normal;
    display: flex;
    flex-direction: column;
    h5{
        padding: 0 20px;
        font-size: 18px;
        height: 30px;
    }
    >.rights_list_box{
        overflow-x: scroll;
        ul.rights_list_tab{
            overflow: hidden;
            display: flex;
            position: relative;
            li{
                flex: none;
                width: 70px;
                height: 90px;
                // margin: 10px 20px 0 0;
                box-sizing: border-box;
                display: flex;
                // justify-content: center;
                align-items: center;
                flex-direction: column;
                position: relative;
                img{
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-top: 8px;
                }
                p{
                    line-height: 15px;
                    padding: 0 10px;
                    margin-top: 8px;
                    text-align: center;
                    font-size: 12px;
                }
                i.active{
                    position: absolute;
                    bottom: -2px;
                    left: 50%;
                    margin-left: -10px;
                    width:0px;
                    height:0px;
                    border-top:10px solid rgba(0,0,0,0);
                    border-right:10px solid  rgba(0,0,0,0);
                    border-bottom:10px solid white;
                    border-left:10px solid  rgba(0,0,0,0);
                }
                
            }
            li.active{
                color: $HunterThemeColor;
                img{
                    margin-top: 0;
                    width: 50px;
                    height: 50px;
                }
            }
        }
        .rights_list_tab::-webkit-scrollbar{
            display: none;
        }
    }
    >.rights_list_box::-webkit-scrollbar{
        display: none;
    }
    
}
</style>
