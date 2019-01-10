import {isWeiXin} from '@/util'
import wx from 'weixin-js-sdk'
import commonApi from "./commonApi";

/**
 * @msg: 
 * @param {
 *  url:
 *  share:{
 *      title:'',
 *      desc: '',
 *      imgUrl:'',
 *      link:''
 *  }
 * } 
 * @return: 
 */
export default function wechatPublicShare(params){
    const default_share_img = require('@/assets/icon_40pt@2x.png');
    let new_params = {
        url:params.url?params.url:'',
        share:{
            title:params.share.title?params.share.title:'看看商品就能赚钱，真现金哦！提现10分钟到账',
            desc:params.share.desc?params.share.desc:'每天都能赚钱，每天都能提现！',
            imgUrl:params.share.imgUrl?params.share.imgUrl:default_share_img,
            link:params.share.link?params.share.link:params.url
        },
        isVerification:params.isVerification
    }
    if(isWeiXin()){
        get_oa_config(new_params);
    }
}
/**
 * @msg: 获取微信公众号分享的配置接口
 * @param {params}  当前页面的url(当前网页的URL，不包含#及其后面部分)
 * @return: 
 */
async function get_oa_config(params){
    let share = params.share || {};
    if(!params.isVerification){
        const wip = await commonApi.get_oa_config(params.url);
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: wip.value.appId, // 必填，公众号的唯一标识
            timestamp: wip.value.timestamp , // 必填，生成签名的时间戳
            nonceStr:  wip.value.nonceStr, // 必填，生成签名的随机串
            signature:  wip.value.signature,// 必填，签名
            jsApiList: ['updateAppMessageShareData','updateTimelineShareData',] // 必填，需要使用的JS接口列表
        });
    }
    // wx.checkJsApi({
    //     jsApiList: ['updateTimelineShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    //     success: function(res) {
    //       console.log(res)
    //     // 以键值对的形式返回，可用的api值true，不可用为false
    //     // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
    //     }
    // });
    wx.ready(function(){
      wx.updateAppMessageShareData({
        title:share.title,
        desc:share.desc,
        link:share.link,
        imgUrl:share.imgUrl
      });
    //   alert(JSON.stringify(share))
      wx.updateTimelineShareData({
        title:share.title,
        link:share.link,
        imgUrl:share.imgUrl
      })
    })
    wx.error((res)=>{
      console.log(res)
    })
}