import Vue from 'vue'
import Vuex from 'vuex'
import common_module from './common_module';
import detail_module from './detail_module'
import hunter_module from './hunter_module'
import order_module from './order_module'
import task_module from './task_module'
import vip_module from './vip_module/index';
Vue.use(Vuex)


const store = new Vuex.Store({
  modules :{
    commonStore:common_module,
    detailStore:detail_module,
    hunterStore:hunter_module,
    orderStore :order_module,
    taskStore :task_module,
    vipStore:vip_module
  }
})
export default store
