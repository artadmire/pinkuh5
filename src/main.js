// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import _ from 'lodash'
import Vuex from 'vuex'
import store from '@/vuex'
import axios from 'axios'
import 'lib-flexible'
import Header from '@/pages/common_components/header'
import Title from '@/pages/common_components/Title'
import Footer from '@/pages/common_components/footer'
import GoodsList from '@/pages/common_components/GoodsList'
import Download from '@/pages/common_components/Download'
import Scheme from '@/pages/common_components/Scheme'
import SchemeSimple from '@/pages/common_components/SchemeSimple'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import api from '@/api'
import VueLazyLoad from 'vue-lazyload'
import Mint from 'mint-ui';
// import { Navbar, TabItem } from 'mint-ui';
// import { TabContainer, TabContainerItem } from 'mint-ui';
import { Toast} from 'mint-ui';
import { axiosFun } from './common/js/public';
import 'mint-ui/lib/style.css';
import './global'
import pk from '@/util/pk.js'
import VConsole from 'vconsole/dist/vconsole.min.js'
import onerror from '@/util/onerror.js'

import netWorkError from '@/util/netWorkError'
if(process.env.NODE_ENV==='development'){
  var vConsole = new VConsole();
}
// Vue.config.devtools = true;
Vue.use(Mint);

// Vue.component(Navbar.name, Navbar);
// Vue.component(TabItem.name, TabItem);
// Vue.component(TabContainer.name, TabContainer);
// Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component('Header', Header);
Vue.component('Title', Title);
Vue.component('Footer', Footer);
Vue.component('GoodsList', GoodsList);
Vue.component('Download', Download);
Vue.component('Scheme', Scheme);
Vue.component('SchemeSimple', SchemeSimple);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$api = api.data
Vue.prototype.axiosFun = axiosFun;
Vue.use(Vuex)
// swiper 插件
Vue.use(VueAwesomeSwiper)
//图片懒加载
Vue.use(VueLazyLoad, {
  preLoad:0.5,
  error: '@/assets/homepage_placeholder1@3x.png',
  loading: '@/assets/loading.gif'
})
global.firstLoadTime = new Date().getTime();
Vue.filter('transMoney0', function (value) {
  if (!value) return '0'
  return parseFloat(value / 10).toFixed(1)
})
Vue.filter('transMoney00', function (value) {
  if (!value) return '0'
  return parseFloat(value / 100).toFixed(2)
})
Vue.filter('transMoney', function (value) {
  if (!value) return '0'
  return parseFloat(value / 100)
})
Vue.filter('time', (value) => {
  let aTime = new Date(value),
    nowTime = new Date(),
    countDownTime = aTime - nowTime,
    second = parseInt(countDownTime / 1000) % 60,
    min = (parseInt(countDownTime / 1000) - second) / 60 % 60,
    hour = ((parseInt(countDownTime / 1000) - second) / 60 - min) / 60 % 24,
    day = (((parseInt(countDownTime / 1000) - second) / 60 - min) / 60 - hour) / 24;
  return (day > 0 ? day + '天' : '') + (hour < 10 ? '0' + hour : hour) + ':' + (min < 10 ? '0' + min : min) + ':' + (second < 10 ? '0' + second : second)
})

onerror();
const errorHandler = (error, vm)=>{
  console.error('抛出全局异常');
  console.error(vm);//报错的组件
  console.error(error);
  console.error(info,777);
}
Vue.config.errorHandler = errorHandler;
//Vue.prototype.$throw = (error)=> errorHandler(error,this);

axios.get(api.data + '/h5/misc/config').then((res) => {
  // console.log('global');
  store.commit('newImgUrlPrefix', res.data.value.imgUrlPrefix + '/');
  // console.log(store)
  window.localStorage.imgUrlPrefix = res.data.value.imgUrlPrefix + '/';
  global.csrfToken = res.data.value.csrfToken;
  global.userAgreementUrl = res.data.value.userAgreementUrl;
  global.preOrderNotice = res.data.value.preOrderNotice;
  global.platformPromise = res.data.value.platformPromise;
  // _csrf_token_ 注释
  global.defaultFlux = res.data.value.defaultFlux;
  global.appDownloadUrl = res.data.value.appDownloadUrl;

  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  axios.defaults.headers.post['_csrf_token_'] = global.csrfToken;
 
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
      App
    }
  })
}).catch(error => {
  console.log(error.response)
  let instance = Toast('请检查网络后,刷新重试');
  if(!error.response){
     location.reload();
  }else{
    setTimeout(() => {
      instance.close();
      netWorkError();
    }, 2000);
  }
})






/* eslint-disable no-new */
