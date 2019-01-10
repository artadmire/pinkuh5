import {
    axiosFun
  } from '@/common/js/public';
import root from '@/api'
const api ={
    
    hunterBuy:(data)=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    method:'post',
                    url: root.data + "/h5/hunter/buy",
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