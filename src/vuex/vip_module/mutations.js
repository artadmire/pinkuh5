const mutations = {
    changevipInfo(state,data){
        state.vipInfo = data;
    },
    changevipType(state,data){
        state.vipType = data;
    },
    changevipRightsIndex(state,data){
        state.vipRightsIndex = data;
    },
    changevipRightsState(state,data){
        state.vipRightsState = data
    },
    changeRightsIndex(state,data){
        state.rightsIndex = data;
    },
    changevipAgreementStatus(state,data){
        state.agreementStatus = data;
    },
    changeNoticevipHomeRefresh(state,data){
        state.noticevipHomeRefresh = data
    },
    changeJionvipToastStatus(state,data){
        state.jionvipToastStatus = data
    }
}
export default mutations;