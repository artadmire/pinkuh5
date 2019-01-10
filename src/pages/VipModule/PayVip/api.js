import {
    axiosFun
  } from '@/common/js/public';
import root from '@/api'
const api ={
    
    vipBuy:(data)=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    method:'post',
                    url: root.data + "/h5/vip/buy",
                    data:data
                },
                onSuccess:(res)=>{
                    resolve(res.data)
                }
            })
        })
    },

}
export default api;