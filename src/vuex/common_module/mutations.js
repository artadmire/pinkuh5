const mutations = {
    newImgUrlPrefix(state, msg) {
        state.imgUrlPrefix = msg
    },
    new_csrf_token_(state, msg) {
        state.new_csrf_token_ = msg
    },
    newRedirectUrl(state, msg) {
        state.redirectUrl = msg
    },
    newSubmit_order_data(state, obj) {
        state.submit_order_data = obj
    },
    newInvoice_info(state, obj) {
        state.invoice_info = obj
    },
    newReceiver_data(state, obj) {
        state.invoice_info = obj
    },
    newCreate_order_info(state, obj) {
        state.orderId = obj
    },
    newFooterState(state, obj) {
        state.footerState = obj
    },
    newFlowPhonenum(state, obj) {
        state.flowPhonenum = obj
    },
    newParticpateTuanState(state,obj){
        state.particpateTuanState = obj
    },
    newMorePintuanListState(state,obj){
        state.morePintuanListState = obj
    },
    newParticpateTuanId(state,obj){
        state.particpateTuanId = obj
    },
    newOrderParticpateTuanId(state,obj){
        state.orderParticpateTuanId = obj
    },
    newOrdersumPayFeeCent(state,meg){
        state.sumPayFeeCent = meg
    },
    newSubmitflag(state,meg){
        state.submitflag = meg
    },
    newPayflag(state,meg){
        state.payflag = meg
    }
}
export default mutations;