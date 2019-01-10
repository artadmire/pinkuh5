
import axios from 'axios'
import {
  Toast,
  Indicator
} from 'mint-ui';
import pk from '@/util/pk.js'
import netWorkError from '@/util/netWorkError'
import {isNativeHybird} from '@/util'
// options目前数据结构为,please readme
// {
// 	// 配置的一些参数，必须
// 	config:{
// 		//method属性默认为get，非必须
// 		method:'get',
// 		//url为必传参数
// 		url:'xxxxx',

// 	},
//  配置是否出现转菊花，登录是否会到登录页面
//  deal:{
// 	// isIndicator为非必须
// 		isIndicator:true,
// 	// backToLogin为非必须
// 		backToLogin:false,
//    toastShow:true
// 	}
// 	// 成功回调，非必须
// 	onSuccess:()=>{

// 	},
// 	// 失败回调，非必须
// 	onFailed:()=>{

// 	},
//  onError:()=>{
      
//  }
// }
export function axiosFun(options) {
  let defaultOptions = {
      config:{
          //默认方法get
          timeout: 10000,
          method: 'get'
      },
      deal:{
          //是否出现转菊花
          isIndicator: true,
          //是否会有提示信息
          toastShow:true,
          //是否会到登录页面
          backToLogin: false,
          backToLoginFun: undefined
      }
  }
  options = _.defaultsDeep(options,defaultOptions);
  let timer;
  timer = setTimeout(()=>{
    if(options.deal.isIndicator){
      Indicator.open();
    }
  },300)

  axios(options.config).then(res => {
    clearTimeout(timer);
    Indicator.close();
    if (res.data.succ) {
      if (options.onSuccess) {
        options.onSuccess(res);
      }
    } else {
      if(options.onFailed){
        options.onFailed(res)
      }
      if(options.deal.toastShow){
        Toast(res.data.errorCode.message);
      } 
    }
  }).catch(error => {
    clearTimeout(timer);
    Indicator.close();
    if (error.response) {
      if(options.onError){
        options.onError(error.response.status);
      }
      //检测status状态码
      if (error.response.status == 401) {
        //两种情况，1、强制登录 2、提交订单页面只是toast
        if(!options.deal.backToLogin){
         
          Toast('登录信息失效，请重新登录')
        }
        if (options.deal.backToLogin) {
          options.deal.backToLoginFun()
        }
      } else if (error.response.status >= 400) {
        //先判断返回data 默认 '系统繁忙，请稍后再试'
        error.response.data ? Toast(error.response.data.errorCode.message) : Toast('系统繁忙，请稍后再试');
        isNativeHybird(
          ()=>{
            let exception = {
              url:error.config.url,
              status:error.response.status,
              statusText:error.response.statusText
            }
            pk.reportException({
              tag:'h5',
              exception: JSON.stringify(exception)
            },()=>{console.log('上报成功')},()=>{console.log("上报失败")})
          }
        )
      }
      if (options.onFailed) {
        options.onFailed(error);
      }
    } else {
      netWorkError();
      Toast('网络貌似出现了问题，请稍候重试');
    }
    setTimeout(() => {
      if(options.deal.isIndicator){
        !options.deal.backToLogin;
      }
    }, 2000);


  })
}

