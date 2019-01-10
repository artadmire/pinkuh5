import {
    axiosFun
  } from '@/common/js/public';
import root from '@/api'
import pk from '@/util/pk.js'
const api ={
    postLoginByTempAuthCode:(code)=>{
        let params = new FormData();
        params.append("tempAuthCode", code);
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    method:'post',
                    url: root.data + "/h5/users/login_by_temp_auth_code",
                    data:params
                },
                deal: {
                    isIndicator: false
                },
                onSuccess:(res)=>{
                    
                    pk.getLogWrite(
                        {
                            'tag':'h5',
                            'errorlog':false,
                            'content':'h5 method post login by tempAuthCode success,phone='+res.data.value.phone
                        },
                        (response)=>{

                        },
                        (error)=>{

                        }
                    )
                    resolve(res.data)
                },
                onFailed:(res)=>{
                    if(res.data&&res.data.errorCode){
                         if(res.data.errorCode.code == 2901){
                           setTimeout(()=>{
                                pk.navigateTo(
                                    {
                                        url:'pinkumall://default/mall_home'
                                    }
                                )
                           },1500)
                         }
                    }
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