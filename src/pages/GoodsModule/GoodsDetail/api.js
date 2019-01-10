import {
    axiosFun
  } from '@/common/js/public';
import root from '@/api'
const api ={
     getTuanDetail: (id)=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    url: root.data + "/h5/pintuan/tuan_detail",
                    params:{
                        id:id
                    }
                },
                onSuccess:(res)=>{
                    resolve(res.data)
                }
            })
        })
    },
    getTuanList: (itemId)=>{
       return new Promise((resolve,reject)=>{
           axiosFun({
               config:{
                   url: root.data + "/h5/pintuan/tuan_list",
                   params:{
                       size:10,
                       itemId:itemId
                   }
               },
               onSuccess:(res)=>{
                   resolve(res.data)
               }
           })
       })
   }
}
export default api;