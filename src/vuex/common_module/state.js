
const state = {
    footerState: {
        'home': false,
        'cart': false,
        'nianhuo': false
    },
    imgUrlPrefix: '',
    _csrf_token_: '',
    redirectUrl: '/',
    submit_order_data: [],
    order_detail_info: {},
    invoice_info: {},
    receiver_data: {},
    create_order_info: [],
    flowPhonenum: '',
    //详情页—拼团-显示参与Ta的拼团状态
    particpateTuanState:false,
    //详情页-拼团-显示更多拼团状态
    morePintuanListState:false,
    //详情页-参与Ta的拼团-展示信息
    particpateTuanId:null,
    //是否是参与别人拼团的订单
    orderParticpateTuanId:null,
    sumPayFeeCent:0,
    submitflag:false,
    payflag:false,
}

export default state;