import {
    axiosFun
  } from '@/common/js/public';
import root from '@/api'
const api ={
    //获取邀请者信息
    getInvitedinfo: (invitationCode)=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    method:'get',
                    url: root.data + "/h5/mission/invitation?invitationCode="+invitationCode,
                },
                onSuccess:(res)=>{
                    resolve(res.data)
                }
            })
        })
    },
    //获取提醒者信息
    getReminderinfo: (invitationCode)=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    method:'get',
                    url: root.data + "/h5/mission/reminder?invitationCode="+invitationCode,
                },
                onSuccess:(res)=>{
                    resolve(res.data)
                }
            })
        })
    },
    //发送手机号
    postTelphone: (obj)=>{
       var { telephone,invitationCode,codes } = obj
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    method:'post',
                    url:root.data + "/h5/mission/accept_invitation?phone="+telephone+"&invitationCode="+invitationCode
                },
                deal:{
                    toastShow:false
                },
                onSuccess:(res)=>{
                    resolve(res.data)
                },
                onFailed:(res)=>{
                    resolve(res.data)
                }
            })
        })  
    },
    //确认验证码是否正确
    confirmCode:(formData)=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    method:'post',
                    url: root.data + "/h5/users/login_by_code",
                    data:formData
                },
                deal:{
                    toastShow:false
                },
                onSuccess:(res)=>{
                    resolve(res.data)
                },
                onFailed:(res)=>{
                    resolve(res.data)
                }
            })
        })
    },

    // 有奖抽查
    edit_preference:(obj,func)=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    method:'post',
                    url: root.data + "/h5/users/edit_preference",
                    data:obj
                },
                deal:{
                    backToLogin:true,
                    backToLoginFun:func
                },
                onSuccess:(res)=>{
                    resolve(res.data)
                },
                onFailed:(res)=>{
                    resolve(res.data)
                }
            })
        })
    },
    //领取优惠券
    applyCoupon:(formData)=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    method:'post',
                    url: root.data + "/h5/coupon/apply",
                    data:formData
                },
                onSuccess:(res)=>{
                    resolve(res.data)
                },
                onFailed:(res)=>{
                    resolve(res.data)
                }
            })
        })
    },
    //领取优惠券确认验证码
    applyCouponConfirm:(formData)=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    method:'post',
                    url: root.data + "/h5/coupon/apply",
                    data:formData
                },
                onSuccess:(res)=>{
                    resolve(res.data)
                },
                onFailed:(res)=>{
                    resolve(res.data)
                }
            })
        })
    },
}
export default api;