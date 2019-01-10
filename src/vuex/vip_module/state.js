
const state = {
    vipInfo:{},
    //黑卡身份type
    vipType:0,
    // 未成为赏金猎人,没有赏金,协议的标题的弹框
    bountyRightsIndex:0,
    // 未成为赏金猎人,没有赏金,协议的标题的状态
    bountyRightsState:false,
    // 黑卡精品类目的active下标
    rightsIndex:0,
    // 付款页同意协议状态
    agreementStatus:false,
    //黑卡会员购买下单成功后通知黑卡会员主页刷新标志位
    noticevipHomeRefresh:false,
    // 不是赏金猎人有佣金的加入赏金猎人toast
    jionvipToastStatus:false
}

export default state;