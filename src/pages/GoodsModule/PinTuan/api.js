import {
    axiosFun
  } from '@/common/js/public';
import root from '@/api'
const api ={
    getQuery:()=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    url: root.data + "/h5/ads/query",
                    params:{
                        positionId:13,
                        pageSize:3,
                        currentPage:1
                    }
                },
                onSuccess:(res)=>{
                    resolve(res.data.value)
                }
            }) 
        })
    },
     getPintuanGroups: ()=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    url: root.data + "/h5/pintuan/groups",
                },
                onSuccess:(res)=>{
                    resolve(res.data.value)
                }
            })
        })
    },
    getPintuanItemList:(obj)=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    url:root.data+'/h5/pintuan/item_list',
                    params:{
                        groupName:obj.groupName,
                        pageSize:10,
                        currentPage:obj.currentPage
                    }
                },
                onSuccess:(res)=>{
                    resolve(res.data.value)
                }
            })
        })
    }
}
export default api;