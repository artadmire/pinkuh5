
const state = {
    //控制验证码弹框
    tabs:false,
    // 有奖抽查数据
    preference:{
        height:undefined,
        weight:undefined,
        promotionReceiveWays:[],
        bust:undefined,
        waistline:undefined,
        shoulderWidth:undefined,
        hipline:undefined,
        maritalStatus:undefined,
        profession:0,
        degree:0,
        annualIncome:0,
        consumptionProportion:0,
        monetary:0,
        misgivings:[],
        shoppingPreferences:[],
        promotions:[],
        promotionReceiveWays:[],
        categories:[],
        onlineTimes:[]
    },
    //提交按钮是否禁用
    disabled:true,
    isCheckout:true,
    isShare:true,
    phoneNum:''
}

export default state;