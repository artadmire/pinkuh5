import {
    axiosFun
  } from '@/common/js/public';
import root from '@/api'
const api ={
    getAdvertisement: ()=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    url: root.data + "/h5/ads/query",
                    params:{
                        positionId: 6,
                        pageSize: 100,
                        currentPage: 1
                    }
                },
                onSuccess:(res)=>{
                    resolve(res.data)
                }
            })
        })
    },
    getBrandSelect: (page)=>{
       return new Promise((resolve,reject)=>{
           axiosFun({
               config:{
                   url: root.data + "/h5/home/session_list",
                   params:{
                        currentPage: page,
                        pageSize: 3
                   }
               },
               deal: {
                isIndicator: false
               },
               onSuccess:(res)=>{
                   resolve(res.data)
               }
           })
       })
   },
   get_brand_wall: (currentPage)=>{
    return new Promise((resolve,reject)=>{
        axiosFun({
            config:{
                url: root.data + '/h5/home/brand_wall',
                params:{
                    currentPage: currentPage,
                    pageSize: 10
                }
            },
            deal: {
             isIndicator: false
            },
            onSuccess:(res)=>{
                resolve(res.data)
            }
        })
    })
}
}
export default api;