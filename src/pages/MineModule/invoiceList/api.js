import {
    axiosFun
  } from '@/common/js/public';
import root from '@/api'
const api ={
     getInvoiceList: ()=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    url: root.data + "/h5/users/invoice/list",
                },
                onSuccess:(res)=>{
                    resolve(res.data)
                }
            })
        })
    }
}
export default api;