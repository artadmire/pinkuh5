import {
    axiosFun
  } from '@/common/js/public';
import root from '@/api'
const api ={
     saveInvoice: (obj)=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    method:'post',
                    url: root.data + "/h5/users/invoice/edit",
                    data:obj
                },
                onSuccess:(res)=>{
                    resolve(res.data)
                }
            })
        })
    }
}
export default api;