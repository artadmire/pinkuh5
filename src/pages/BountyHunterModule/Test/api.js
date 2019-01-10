import {
    axiosFun
  } from '@/common/js/public';
import root from '@/api'
const api ={
    
    getAddress:(errorObj)=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    url: root.data + "/h5/users/address/lists",
                },
                onSuccess:(res)=>{
                    resolve(res.data)
                },
                onError(status){
                    errorObj.error(status)
                }
            })
        })
    },
    add_form:(errorObj)=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    method:'post',
                    url: root.data + "/smart/push/add_form",
                    data:{
                        "formId": "12312321213",//formId或者payId
                        "formType":1 ,
                        "targetId": 1,
                        "targetType": 1,//1 订单ID
                    }
                },
                onSuccess:(res)=>{
                    resolve(res.data)
                },
                onError(status){
                    errorObj.error(status)
                }
            })
        })
    },
    get_oa_config:(url)=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    url: root.data + "/h5/wechat/oa/config",
                    params:{
                        url:url
                    }
                },
                onSuccess:(res)=>{
                    resolve(res.data)
                },
                onError(status){
                    errorObj.error(status)
                }
            })
        })
    },
}
export default api;