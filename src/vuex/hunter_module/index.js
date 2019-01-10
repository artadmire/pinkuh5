import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'

const hunter_module ={
    state,actions,mutations
}

export default hunter_module;