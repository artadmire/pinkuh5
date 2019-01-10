import {
    axiosFun
  } from '@/common/js/public';
import root from '@/api'
const api ={
    //获取邀请者信息
    getpayStatus: (payId)=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    method:'get',
                    url: root.data + "/h5/orders/pay_status?payId="+payId,
                },
                onSuccess:(res)=>{
                    resolve(res.data)
                }
            })
        })
    },
    
}
export default api;