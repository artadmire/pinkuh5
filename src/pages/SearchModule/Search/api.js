import {
    axiosFun
  } from '@/common/js/public';
import root from '@/api'
const api ={
    getHot_words:()=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    url: root.data + "/h5/search/hot_words",
                },
                onSuccess:(res)=>{
                    resolve(res.data.value)
                }
            }) 
        })
    },
    
}
export default api;