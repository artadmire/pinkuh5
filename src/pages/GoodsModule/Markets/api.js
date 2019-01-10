import {
    axiosFun
  } from '@/common/js/public';
import root from '@/api'
const api ={
    getGroup_all:()=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    url: root.data + "/h5/categories/group_all",
                },
                onSuccess:(res)=>{
                    resolve(res.data.value)
                }
            }) 
        })
    },
    getGroup_brand_list:(groupId,currentPage)=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    url: root.data + "/h5/home/session_list",
                    params:{
                        groupId,
                        pageSize:2,
                        currentPage
                    }
                },
                onSuccess:(res)=>{
                    resolve(res.data.value)
                }
            }) 
        })
    },
    
}
export default api;