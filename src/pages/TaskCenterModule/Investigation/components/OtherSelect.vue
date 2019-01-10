<template>
    <div class="other_select">
        <dl>
            <dt>
                网购顾虑* <span>（可多选）</span>
            </dt>
            <dd class="col3">
                <span><input type="checkbox" name='gulv'> 产品质量</span>
                <span><input type="checkbox" name='gulv'>网上支付安全</span>
                <span><input type="checkbox" name='gulv'>配送问题</span>
                <span><input type="checkbox" name='gulv'>产品售后保障</span>
            </dd>
        </dl>
        <dl>
            <dt>
                网购时的判断喜好* <span>（可多选）</span>
            </dt>
            <dd class="col5">
                <span><input type="checkbox" name='xihao'>品质</span>
                <span><input type="checkbox" name='xihao'>价格</span>
                <span><input type="checkbox" name='xihao'>质量</span>
                <span><input type="checkbox" name='xihao'>口碑</span>
                <span><input type="checkbox" name='xihao'>声誉</span>
            </dd>
        </dl>
        <dl>
            <dt>
                喜欢的促销手段* <span>（可多选）</span>
            </dt>
            <dd class="col5">
                <span><input type="checkbox" name='shouduan'>打折</span>
                <span><input type="checkbox" name='shouduan'>专题</span>
                <span><input type="checkbox" name='shouduan'>返券</span>
                <span><input type="checkbox" name='shouduan'>送礼</span>
                <span><input type="checkbox" name='shouduan'>积分</span>
                <span><input type="checkbox" name='shouduan'>免运费</span>
                <span><input type="checkbox" name='shouduan'>送金币</span>
            </dd>
        </dl>
        <dl>
            <dt>
                新品上线或促销信息的接收方式喜好* <span>（可多选）</span>
            </dt>
            <dd class="col4">
                <span><input type="checkbox" name='xinxi'>手机短信</span>
                <span><input type="checkbox" name='xinxi'>电子邮件</span>
                <span><input type="checkbox" name='xinxi'>电话通知</span>
                <span><input type="checkbox" name='xinxi'>站内通知</span>
            </dd>
        </dl>
        <dl>
            <dt>
                网购品类偏好* <span>（可多选）</span>
            </dt>
            <dd class="col4">
                <span><input type="checkbox" name='pianhao'>服饰</span>
                <span><input type="checkbox" name='pianhao'>箱包</span>
                <span><input type="checkbox" name='pianhao'>运动户外</span>
                <span><input type="checkbox" name='pianhao'>鞋类</span>
                <span><input type="checkbox" name='pianhao'>首饰珠宝</span>
                <span><input type="checkbox" name='pianhao'>内衣</span>
                <span><input type="checkbox" name='pianhao'>儿童服饰</span>
                <span><input type="checkbox" name='pianhao'>儿童玩具</span>
                <span><input type="checkbox" name='pianhao'>美妆洗护</span>
                <span><input type="checkbox" name='pianhao'>居家日用</span>
                <span><input type="checkbox" name='pianhao'>小家电</span>
                <span><input type="checkbox" name='pianhao'>3C数码</span>
                <span><input type="checkbox" name='pianhao'>大家电</span>
                <span><input type="checkbox" name='pianhao'>酒类</span>
                <span><input type="checkbox" name='pianhao'>零食</span>
                <span><input type="checkbox" name='pianhao'>粮油米面</span>
            </dd>
        </dl>
        <dl>
            <dt>
                上网时段* <span>（可多选）</span>
            </dt>
            <dd class="col1">
                <span><input type="checkbox" name='shiduan'>早上6点-8点</span>
                <span><input type="checkbox" name='shiduan'>上午8点-12点</span>
                <span><input type="checkbox" name='shiduan'>中午12点-下午2点</span>
                <span><input type="checkbox" name='shiduan'>下午2点-6点</span>
                <span><input type="checkbox" name='shiduan'>晚上6点-10点</span>
                <span><input type="checkbox" name='shiduan'>晚上10点-12点</span>
                <span><input type="checkbox" name='shiduan'>凌晨0点-6点</span>
            </dd>
        </dl>
    </div>
</template>

<script>
export default {
    props:{
    },
    data(){
        return{
        }
    },
    created(){
       
    },
    methods: {
        
    },
    mounted () {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
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
                    border: 1px solid #b2b2b2;
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
</style>
