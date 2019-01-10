const mutations = {
    changeHunterInfo(state,data){
        state.hunterInfo = data;
    },
    changeHunterType(state,data){
        state.hunterType = data;
    },
    changeBountyRightsIndex(state,data){
        state.bountyRightsIndex = data;
    },
    changeBountyRightsState(state,data){
        state.bountyRightsState = data
    },
    changeRightsIndex(state,data){
        state.rightsIndex = data;
    },
    changeAgreementStatus(state,data){
        state.agreementStatus = data;
    },
    changeNoticeHunterHomeRefresh(state,data){
        state.noticeHunterHomeRefresh = data
    },
    changeJionHunterToastStatus(state,data){
        state.jionHunterToastStatus = data
    },
    changebountyincomStatus(state,data){
        state.bountyincomstate = data
    },
    changehunterincomeinfo(state,data){
        state.hunterincomeinfo = data
    },
    changemaxDistance(state,data){
        state.maxDistance = data
    }
    
}
export default mutations;
