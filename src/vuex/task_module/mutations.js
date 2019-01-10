const mutations = {
    changevetycodetabs(state,data){
        state.tabs = data;
    },
    isDisabled(state,data){
        state.disabled = data;
    },

    changePreference(state,data){
        state.preference = data
    },
    isCheckout(state,data){
        state.isCheckout = data
    },
    isShare(state,data) {
            state.isShare = data
    },
    changePhoneNum(state,data) {
        data =  data.split(" ")
        data[1] = "****"
        data=data.join(" ")
        state.phoneNum = data
    }
}
export default mutations;