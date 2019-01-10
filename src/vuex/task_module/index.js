import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'

const task_module ={
    state,actions,mutations
}

export default task_module;