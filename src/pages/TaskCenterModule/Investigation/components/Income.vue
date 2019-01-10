<template>
    <div class="income">
        <div class="external">
            <div class="external_title">基本信息</div>
            <ul class="inherent">
                <li>
                    <span>年收入*</span>
                    <select name="" id="">
                        <option value="">sauron</option>
                        <option value="">sauron</option>
                        <option value="">sauron</option>
                        <option value="">sauron</option>
                    </select>
                </li>
                <li>
                    <span>消费占月收入比重*</span>
                    <select name="" id="">
                        <option value="">sauron</option>
                        <option value="">sauron</option>
                        <option value="">sauron</option>
                        <option value="">sauron</option>
                    </select>
                </li>
                <li>
                    <span>每月网上消费金额*</span>
                    <select name="" id="">
                        <option value="">sauron</option>
                        <option value="">sauron</option>
                        <option value="">sauron</option>
                        <option value="">sauron</option>
                    </select>
                </li>
            </ul>
        </div>
        
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
.income{
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
                    background: #F5F6F8;
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
</style>