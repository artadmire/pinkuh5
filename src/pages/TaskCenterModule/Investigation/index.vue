<template>
    <div class="investigation">
        <img src="~@/assets/task_form_bg_pic.png" alt="">
        <div class="baseinfo">
            <div class="external">
                <div class="external_title">基本信息</div>
                <div class="desc">用于个性化服装类产品的推荐 （*为必填）</div>
                <ul class="content">
                    <li>
                        <span>身高*</span>
                        <input type="tel" v-model="preference.height"   oninput="value=value.replace(/[^\d]|^[0]/g,'').slice(0,3)">
                        <i>cm</i>
                    </li>
                    <li>
                        <span>体重*</span>
                        <input type="tel" v-model="preference.weight" oninput="value=value.replace(/[^\d]|^[0]/g,'').slice(0,3)">
                        <i>kg</i>
                    </li>
                    <li>
                        <span>胸围</span>
                        <input type="tel" v-model="preference.bust" oninput="value=value.replace(/[^\d]|^[0]/g,'').slice(0,5)">
                        <i>cm</i>
                    </li>
                    <li>
                        <span>腰围</span>
                        <input type="tel" v-model="preference.waistline" oninput="value=value.replace(/[^\d]|^[0]/g,'').slice(0,5)">
                        <i>cm</i>
                    </li>
                    <li>
                        <span>肩宽</span>
                        <input type="tel" v-model="preference.shoulderWidth" oninput="value=value.replace(/[^\d]|^[0]/g,'').slice(0,5)">
                        <i>cm</i>
                    </li>
                    <li>
                        <span>臀围</span>
                        <input type="tel" v-model="preference.hipline" oninput="value=value.replace(/[^\d]|^[0]/g,'').slice(0,5)">
                        <i>cm</i>
                    </li>
                </ul>
            </div>
            <ul class="inherent">
                <li>
                    <span>婚姻*</span>
                    <div id="maritalStatus">
                        <input type="radio" name="hunyin" v-model="preference.maritalStatus" value="1"> 已婚 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" name='hunyin' v-model="preference.maritalStatus" value="2"> 未婚
                    </div>
                </li>
                <li>
                    <span>职业*</span>
                    <select name="" id="profession" v-model="preference.profession">
                        <option value="0">请选择</option>
                        <option value="1">教师</option>
                        <option value="2">警察</option>
                        <option value="3">律师</option>
                        <option value="4">网络编辑</option>
                        <option value="5">新媒体运营</option>
                        <option value="6">财务</option>
                        <option value="7">行政</option>
                        <option value="8">人力</option>
                        <option value="9">管培生</option>
                        <option value="10">市场</option>
                        <option value="11">销售</option>
                        <option value="12">客服咨询</option>
                        <option value="13">软件工程师</option>
                        <option value="14">硬件工程师</option>
                        <option value="15">UI设计师</option>
                        <option value="16">网络运营维护</option>
                        <option value="17">网站运营</option>
                        <option value="18">文案策划</option>
                        <option value="19">公关媒介</option>
                        <option value="20">网站编辑</option>
                        <option value="21">产品经理</option>
                        <option value="22">其它</option>
                    </select>
                </li>
                <li>
                    <span>学历*</span>
                    <select name="" id="degree" v-model="preference.degree">
                        <option value="0">请选择</option>
                        <option value="1">高中及以下</option>
                        <option value="2">大专</option>
                        <option value="3">本科</option>
                        <option value="4">硕士</option>
                        <option value="5">博士</option>
                    </select>
                </li>
            </ul>
        </div>
        <div class="income">
            <div class="external">
                <div class="external_title">基本信息</div>
                <ul class="inherent">
                    <li>
                        <span>年收入*</span>
                        <select name="" id="annualIncome" v-model="preference.annualIncome">
                            <option value="0">请选择</option>
                            <option value="1">5万以下</option>
                            <option value="2">5万-10万</option>
                            <option value="3">10万-20万</option>
                            <option value="4">20万-50万</option>
                            <option value="5">50万以上</option>
                        </select>
                    </li>
                    <li>
                        <span>消费占月收入比重*</span>
                        <select name="" id="consumptionProportion" v-model="preference.consumptionProportion">
                            <option value="0">请选择</option>
                            <option value="1">10%以下</option>
                            <option value="2">10%-30%</option>
                            <option value="3">30%-50%</option>
                            <option value="4">50%以上</option>
                        </select>
                    </li>
                    <li>
                        <span>每月网上消费金额*</span>
                        <select name="" id="monetary" v-model="preference.monetary">
                            <option value="0">请选择</option>
                            <option value="1">100元以下</option>
                            <option value="2">101-200元</option>
                            <option value="3">201-300元</option>
                            <option value="4">301-500元</option>
                            <option value="5">501-1000元</option>
                            <option value="6">1001-3000元</option>
                            <option value="7">3001-5000元</option>
                            <option value="8">5001元以上</option>
                        </select>
                    </li>
                </ul>
            </div>
            
        </div>
        <div class="other_select">
            <dl>
                <dt>
                    网购顾虑* <span>（可多选）</span>
                </dt>
                <dd class="col3">
                    <span><input type="checkbox" name='gulv' v-model="preference.misgivings" value="1"> 产品质量</span>
                    <span><input type="checkbox" name='gulv' v-model="preference.misgivings" value="2">网上支付安全</span>
                    <span><input type="checkbox" name='gulv' v-model="preference.misgivings" value="3">配送问题</span>
                    <span><input type="checkbox" name='gulv' v-model="preference.misgivings" value="4">产品售后保障</span>
                </dd>
            </dl>
            <dl>
                <dt>
                    网购时的判断喜好* <span>（可多选）</span>
                </dt>
                <dd class="col5">
                    <span><input type="checkbox" name='xihao' v-model="preference.shoppingPreferences" value="1">品质</span>
                    <span><input type="checkbox" name='xihao' v-model="preference.shoppingPreferences" value="2">价格</span>
                    <span><input type="checkbox" name='xihao' v-model="preference.shoppingPreferences" value="3">质量</span>
                    <span><input type="checkbox" name='xihao' v-model="preference.shoppingPreferences" value="4">口碑</span>
                    <span><input type="checkbox" name='xihao' v-model="preference.shoppingPreferences" value="5">声誉</span>
                </dd>
            </dl>
            <dl>
                <dt>
                    喜欢的促销手段* <span>（可多选）</span>
                </dt>
                <dd class="col5">
                    <span><input type="checkbox" name='shouduan' value="1" v-model="preference.promotions">打折</span>
                    <span><input type="checkbox" name='shouduan' value="2" v-model="preference.promotions">专题</span>
                    <span><input type="checkbox" name='shouduan' value="3" v-model="preference.promotions">返券</span>
                    <span><input type="checkbox" name='shouduan' value="4" v-model="preference.promotions">送礼</span>
                    <span><input type="checkbox" name='shouduan' value="5" v-model="preference.promotions">积分</span>
                    <span><input type="checkbox" name='shouduan' value="6" v-model="preference.promotions">免运费</span>
                    <span><input type="checkbox" name='shouduan' value="7" v-model="preference.promotions">送金币</span>
                </dd>
            </dl>
            <dl>
                <dt>
                    新品上线或促销信息接收方式喜好* <span>（可多选）</span>
                </dt>
                <dd class="col4">
                    <span><input type="checkbox" name='xinxi' value="1" v-model="preference.promotionReceiveWays">手机短信</span>
                    <span><input type="checkbox" name='xinxi' value="2" v-model="preference.promotionReceiveWays">电子邮件</span>
                    <span><input type="checkbox" name='xinxi' value="3" v-model="preference.promotionReceiveWays">电话通知</span>
                    <span><input type="checkbox" name='xinxi' value="4" v-model="preference.promotionReceiveWays">站内通知</span>
                </dd>
            </dl>
            <dl>
                <dt>
                    网购品类偏好* <span>（可多选）</span>
                </dt>
                <dd class="col4">
                    <span><input type="checkbox" name='pianhao' value="1" v-model="preference.categories">服饰</span>
                    <span><input type="checkbox" name='pianhao' value="2" v-model="preference.categories">箱包</span>
                    <span><input type="checkbox" name='pianhao' value="3" v-model="preference.categories">运动户外</span>
                    <span><input type="checkbox" name='pianhao' value="4" v-model="preference.categories">鞋类</span>
                    <span><input type="checkbox" name='pianhao' value="5" v-model="preference.categories">首饰珠宝</span>
                    <span><input type="checkbox" name='pianhao' value="6" v-model="preference.categories">内衣</span>
                    <span><input type="checkbox" name='pianhao' value="7" v-model="preference.categories">儿童服饰</span>
                    <span><input type="checkbox" name='pianhao' value="8" v-model="preference.categories">儿童玩具</span>
                    <span><input type="checkbox" name='pianhao' value="9" v-model="preference.categories">美妆洗护</span>
                    <span><input type="checkbox" name='pianhao' value="10" v-model="preference.categories">居家日用</span>
                    <span><input type="checkbox" name='pianhao' value="11" v-model="preference.categories">小家电</span>
                    <span><input type="checkbox" name='pianhao' value="12" v-model="preference.categories">3C数码</span>
                    <span><input type="checkbox" name='pianhao' value="13" v-model="preference.categories">大家电</span>
                    <span><input type="checkbox" name='pianhao' value="14" v-model="preference.categories">酒类</span>
                    <span><input type="checkbox" name='pianhao' value="15" v-model="preference.categories">零食</span>
                    <span><input type="checkbox" name='pianhao' value="16" v-model="preference.categories">粮油米面</span>
                </dd>
            </dl>
            <dl>
                <dt>
                    上网时段* <span>（可多选）</span>
                </dt>
                <dd class="col1">
                    <span><input type="checkbox" name='shiduan' value="1" v-model="preference.onlineTimes">早上6点-8点</span>
                    <span><input type="checkbox" name='shiduan' value="2" v-model="preference.onlineTimes">上午8点-12点</span>
                    <span><input type="checkbox" name='shiduan' value="3" v-model="preference.onlineTimes">中午12点-下午2点</span>
                    <span><input type="checkbox" name='shiduan' value="4" v-model="preference.onlineTimes">下午2点-6点</span>
                    <span><input type="checkbox" name='shiduan' value="5" v-model="preference.onlineTimes">晚上6点-10点</span>
                    <span><input type="checkbox" name='shiduan' value="6" v-model="preference.onlineTimes">晚上10点-12点</span>
                    <span><input type="checkbox" name='shiduan' value="7" v-model="preference.onlineTimes">凌晨0点-6点</span>
                </dd>
            </dl>
        </div>
        <div id='submit' :class="{submitActive:active}" @click='submitFunc'>确认提交</div>
        <div class="logo"></div>
    </div>
</template>

<script>
import vue from 'vue'
import BaseInfo from './components/baseInfo'
import Income from './components/Income'
import OtherSelect from './components/OtherSelect.vue';
import api from '../api.js'
import { Toast } from "mint-ui";
import { mapMutations, mapState } from 'vuex';
import pk from '@/util/pk.js'
import loginByNative from '@/util/loginByNative.js'
export default {
    props:{
    },
    data(){
        return{
            preference:{
                
            },
            active:false
        }
    },
    created(){
       this.preference = this.taskStore.preference;
       document.title = '设置个人信息';
       loginByNative();
    },
    watch:{
        preference:{
            handler(newValue,oldValue){
                this.checkoutPreference(newValue)
            },
            deep:true
        }
    },
    computed:{
        ...mapState(['taskStore'])
    },
    components:{
        BaseInfo,Income,OtherSelect
    },
    methods: {
        // changes(value){
        //    // alert(1)
        //     this.preference.height = value.replace(/[^\d]/g,'')
        // },
        ...mapMutations(['newRedirectUrl','changePreference']),
        // async postLoginByTempAuthCode(code) {
        //     let wipdata = await api.postLoginByTempAuthCode(code);
        //     window.sessionStorage.accessToken = wipdata.value.phone;
        // },
        async edit_preference(obj){
            let that = this;
            let wip = await api.edit_preference(obj);
            if(wip.succ){
                let instance = Toast("提交成功");
                setTimeout(() => {
                    instance.close();
                    pk.navigateTo(
                        {
                            url:'pinkumall://default/task_center'
                        }
                    )
                }, 2000);
                return;
            }else{
                setTimeout(() => {
                    pk.navigateTo(
                        {
                            url:'pinkumall://default/task_center'
                        }
                    )
                }, 2000);
            }
        },
        checkoutPreference(obj){
            if(
                obj.height&&
                obj.height<=300&&
                obj.height>=50&&
                obj.weight&&
                obj.weight<=999&&
                obj.weight&&
                obj.promotionReceiveWays.length>0&&
                obj.maritalStatus&&
                obj.profession&&
                obj.degree&&
                obj.annualIncome&&
                obj.consumptionProportion&&
                obj.monetary&&
                obj.misgivings.length>0&&
                obj.shoppingPreferences.length>0&&
                obj.promotions.length>0&&
                obj.promotionReceiveWays.length>0&&
                obj.categories.length>0&&
                obj.onlineTimes.length>0
            ){
                this.active = true;
            }else{
                this.active = false;
            }
        },
        submitFunc(){

            if(
               this.active
            ){
                this.changePreference(this.preference)
                this.edit_preference(this.preference);
            }else{
                let instance = Toast("信息不完善或不合理");
                setTimeout(() => {
                    instance.close();
                }, 2000);
                return;
            }
        }
    },
    mounted () {
    },
    destroyed(){
        document.title='爆好货'
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.investigation{
    background: #C3C6FB;
    padding-bottom: 20px;
    >img{
        width: 100%;
    }
}
input{
    text-align: center;
}
select{
    background: url("~@/assets/svg/task_form_sheet_triangle_down_icon.svg") no-repeat  right center #F5F6F8;
    background-size:30px 15px; 
}
.baseinfo{
    width: 335px;
    margin:  0 auto;
    >div,>ul{
        background: white;
        width: 100%;
        box-sizing: border-box;
        border-radius: 6px;
        color: #777EF0;
        font-size: 14px;
    }
    .external{
        margin-top: 20px;
        height: 191px;
        display: flex;
        flex-direction: column;
        align-items: center;
        line-height: 30px;
        padding: 0 10px;
        .external_title{
            text-align: center;
            line-height: 32px;
            font-size: 18px;
            font-weight: bold;
            margin-top: -16px;
            border-radius: 16px;
            color: white;
            width: 140px;
            height: 32px;
            background: linear-gradient(#ABB1FA, #747DF0); /* 标准的语法 */
        }
        .desc{
            font-size: 12px;
        }
        .content{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            font-size: 14px;
            li{
                flex:none;
                width: 152px;
                height: 38px;
                background: #F5F6F8;
                display: flex;
                padding: 0 10px;
                margin-bottom: 10px;
                box-sizing: border-box;
                align-items: center;
                span{
                    flex:none;
                    width: 40px;
                }
                input{
                    flex:none;
                    width: 60px;
                    height: 20px;
                    background: #F5F6F8;
                    border-bottom: 1px solid #DEDEDE;/*no*/
                }
                i{
                    flex:none;
                    padding-left: 5px;
                }
            }
        }
    }
    .inherent{
        height: 154px;
        margin:  20px auto 36px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px;
        >li{
            width: 315px;
            height: 38px;
            line-height: 38px;
            display: flex;
            box-sizing: border-box;
            padding: 0 10px;
            justify-content: space-between;
            span{
                flex:none;
            }
            >div{
                flex: none;
                width: 239px;
                display: flex;
                align-items: center;
                input{
                    width: 12px;
                    height: 12px;
                    border: 1px solid #b2b2b2;/*no*/
                    border-radius: 3px;
                    margin: 0 3px 0 0;
                }
            }
            >select{
                flex:1;
                margin-left: 10px;
                border: 0;
                padding-left: 10px;
                color: #737373;
                ul{
                    background: white;
                    position: relative;
                    box-shadow: 0 0 5px #ccc;
                }
                p{
                    height: 34px;
                    padding: 0 10px;
                    box-sizing: border-box;
                }
                li{
                    width: 100%;
                    box-sizing: border-box;
                    padding: 0 10px;
                    background: white;
                }
                li.active{
                    background: #EAEBFF;
                    color: #777EF0;
                }
            }
        }
    }
}
.income{
    width: 335px;
    margin:  0 auto;
    >div,>ul{
        background: white;
        width: 100%;
        box-sizing: border-box;
        border-radius: 6px;
        color: #777EF0;
        font-size: 14px;
    }
    .external{
        height: 191px;
        display: flex;
        flex-direction: column;
        align-items: center;
        line-height: 30px;
        padding: 0 10px;
        .external_title{
            text-align: center;
            line-height: 32px;
            font-size: 18px;
            font-weight: bold;
            margin-top: -16px;
            border-radius: 16px;
            color: white;
            width: 140px;
            height: 32px;
            background: linear-gradient(#ABB1FA, #747DF0); /* 标准的语法 */
        } 
        .inherent{
            height: 154px;
            margin:  10px auto 10px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            >li{
                width: 315px;
                height: 38px;
                line-height: 38px;
                display: flex;
                box-sizing: border-box;
                padding: 0 10px;
                justify-content: space-between;
                span{
                    flex:none;
                }
                >div{
                    flex: 1;
                    box-sizing: border-box;
                    margin-left: 20px;
                }

                >select{
                    flex:1;
                    border: 0;
                    margin-left: 10px;
                    padding-left: 10px;
                    color: #737373;
                    ul{
                        background: white;
                        position: relative;
                        box-shadow: 0 0 5px #ccc;
                    }
                    p{
                        height: 34px;
                        padding: 0 10px;
                        box-sizing: border-box;
                    }
                    li{
                        width: 100%;
                        box-sizing: border-box;
                        padding: 0 10px;
                        background: white;
                    }
                    li.active{
                        background: #EAEBFF;
                        color: #777EF0;
                    }
                }
            }
        }
    }
    
}
.other_select{
    width: 335px;
    margin: 0 auto;
    border-radius: 6px;
    background: white;
    margin-top: 20px;
    box-sizing: border-box;
    padding: 10px;
    font-size: 14px;
    dl{
        background: #F5F6F8;
        box-sizing: border-box;
        padding: 0 10px;
        margin-bottom: 10px;
        border-radius: 6px;
        dt{
            color: #777EF0;
            line-height: 34px;
            span{
                color: #b2b2b2;
                font-size: 13px;
            }
        }
        dd{
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
            line-height: 30px;
            color: #737373;
            span{
                display: flex;
                align-items: center;
                font-size: 12px;
                input{ 
                    width: 12px;
                    height: 12px;
                    border: 1px solid #b2b2b2;/*no*/
                    border-radius: 3px;
                    margin: 0 3px 0 0;
                }
            }
        }
        .col1{
            span{
                flex:none;
                width: 100%;
            }
        }
        .col2{
            span{
                flex:none;
                width: 50%;
            }
        }
        .col3{
            span{
                flex:none;
                width: 33%;
            }
        }
        .col4{
            span{
                flex:none;
                width: 25%;
            }
        }
        .col5{
            span{
                flex: none;
                width: 20%;
            }
        }
    }
}
#submit{
    display: flex;
    width: 335px;
    margin: 0 auto;
    height: 48px;
    background: #ACB1F8;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    border-radius: 6px;
    margin-top: 40px;
    color: white;
}
.submitActive{
    background: #777EF0 !important;
}
#submit.active{
    background: #777EF0;
}
.logo{
    width: 100px;
    height: 40px;
    background: url('~@/assets/task_form_bottom_logo.png');
    margin:60px auto 0px;
    background-size: 100% 100%;
}
</style>
