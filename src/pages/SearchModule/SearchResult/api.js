import {
    axiosFun
  } from '@/common/js/public';
import root from '@/api'
const api ={
    getSearchItem_list:(keyword,currentPage)=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    url: root.data + "/h5/search/item_list",
                    params:{
                        keyword,
                        pageSize:6,
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