<template>
    <div class="baseinfo">
        <div class="external">
            <div class="external_title">基本信息</div>
            <div class="desc">用于个性化服装类产品的推荐 （*为必填）</div>
            <ul class="content">
                <li>
                    <span>身高*</span>
                    <input type="tel">
                    <i>cm</i>
                </li>
                <li>
                    <span>体重*</span>
                    <input type="tel">
                    <i>kg</i>
                </li>
                <li>
                    <span>胸围</span>
                    <input type="tel">
                    <i>cm</i>
                </li>
                <li>
                    <span>腰围</span>
                    <input type="tel">
                    <i>cm</i>
                </li>
                <li>
                    <span>肩宽</span>
                    <input type="tel">
                    <i>cm</i>
                </li>
                <li>
                    <span>臀围</span>
                    <input type="tel">
                    <i>cm</i>
                </li>
            </ul>
        </div>
        <ul class="inherent">
            <li>
                <span>婚姻*</span>
                <div>
                    <input type="radio"  name="hunyin" > 已婚
                    <input type="radio" name='hunyin'> 未婚
                </div>
            </li>
            <li>
                <span>职业*</span>
                <select name="" id="">
                    <option value="">sauron</option>
                    <option value="">sauron</option>
                    <option value="">sauron</option>
                    <option value="">sauron</option>
                </select>
            </li>
            <li>
                <span>学历*</span>
                <select name="" id="">
                    <option value="">sauron</option>
                    <option value="">sauron</option>
                    <option value="">sauron</option>
                    <option value="">sauron</option>
                </select>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:{
    },
    data(){
        return{
            sauron:'1'
        }
    },
    created(){
       document.title = '设置个人信息'
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
.baseinfo{
    width: 335px;
    margin:  0 auto;
    >div,>ul{
        background: white;
        width: 100%;
        box-sizing: border-box;
        border-radius: 6px;
        color: #C3C6FB;
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
                    width: 70px;
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
                    margin:0 5px;
                    border: 1px solid #ccc;/*no*/
                    border-radius: 3px;
                }
            }
            >select{
                flex:1;
                margin-left: 10px;
                background: #F5F6F8;
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
</style>
