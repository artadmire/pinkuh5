
const state = {
    hunterInfo:{},
    //猎人身份type
    hunterType:0,
    // 未成为赏金猎人,没有赏金,协议的标题的弹框
    bountyRightsIndex:0,
    // 未成为赏金猎人,没有赏金,协议的标题的状态
    bountyRightsState:false,
    // 赏金猎人专属权益的active下标
    rightsIndex:0,
    // 赏金猎人专属权益列表
    bountyRightsList:[
        {
            title:'推广提成',
            desc:'最高20%提成',
            rightContext:['赏金猎人尊享所分享爆款爆品所带来销售的提成,提成比例最高达成交金额的20%;'],
            index:0
        },
        {
            title:'邀请猎人',
            desc:'100%加成',
            rightContext:['普通注册用户邀请好友成为赏金猎人，奖励15.00元/位;赏金猎人邀请好友成为赏金猎人，奖励30.00元/位;'],
            index:1
        },
        {
            title:'话费券',
            desc:'全年60元',
            rightContext:['提供面额不等的话费券，用户自行领取;','话费券可用于移动、联通、电信话费充值，领取后96小时内有效;','每个用户每年领取的话费券面额总计不得超过60.00元.'],
            index:2

        },
        {
            title:'购物券',
            desc:'全年600元',
            rightContext:['提供面额不等的购物券，用户自行领取;','购物券可用于平台购物使用，领取后96小时内有效;','每个用户每年领取的购物券面额总计不得超过600.00元.'],
            index:3
        },
        {
            title:'信用卡奖励',
            desc:'100%加成',
            rightContext:['赏金猎人申请信用卡成功核卡后可获得普通注册用户成功核卡现金奖励的100%加成;'],
            index:4
        },
        {
            title:'金币任务',
            desc:'预计增收200元',
            rightContext:['赏金猎人成功完成金币任务可获得普通注册用户所得金币200%加成;','所得金币，系统于次日自动兑换成零钱，可提现.'],
            index:5
        },
        {
            title:'好友购物提成',
            desc:'最高20%提成',
            rightContext:['赏金猎人尊享所邀请注册好友在爆好货所产生的消费返佣,返佣比例最高达成交金额的20%;'],
            index:6
        },
        {
            title:'白条优先',
            desc:'优先邀请',
            rightContext:['白条为爆好货为优质用户专设的授信产品，为白名单邀请制，赏金猎人享有优先被邀请的资格;','白条授信额度为500.00-20000.00元不等;'],
            index:7
        },
        {
            title:'优先提现',
            desc:'24小时均可提现',
            rightContext:['每日12：00前为赏金猎人专享提现时间;'],
            index:8
        }, 
    ],
    // 付款页同意协议状态
    agreementStatus:false,
    // 赏金猎人购买下单成功后通知赏金猎人主页刷新标志位
    noticeHunterHomeRefresh:false,
    // 不是赏金猎人有佣金的加入赏金猎人toast
    jionHunterToastStatus:false,
    //猎人收入明细
    bountyincomstate:false,
    hunterincomeinfo:[],
    //下拉刷新的最大距离
    maxDistance:0,
    
}

export default state;