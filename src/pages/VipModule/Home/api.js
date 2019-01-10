import {
    axiosFun
  } from '@/common/js/public';
import root from '@/api'
import pk from '@/util/pk.js'
const api ={
    // 个人信息
    getHome: ()=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    method:'get',
                    url: root.data + "/h5/vip/home",
                },
                onSuccess:(res)=>{
                    resolve(res.data);
                },
                onFailed(error){
                    resolve(error.response.status);
                    if(error.response.status==401){
                        sessionStorage.clear();
                        location.reload();
                    }
                },
                // onError(status){
                //     errorObj.error(status)
                // }
            })
        })
    },
    
    // 本月返现精品类目
    getCashBackGoodsCategories:()=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    method:'get',
                    url: root.data + "/h5/categories/group_all?type=5",
                },
                onSuccess:(res)=>{
                    resolve(res.data)
                }
            })
        })
    },
    
    // 本月返现精品列表
    getCashBackGoodsList:(config)=>{
        let {currentPage,pageSize,groupId} = config
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    method:'get',
                    url: root.data + "/h5/vip/item_list",
                    params:{
                        currentPage,
                        pageSize,
                        groupId
                    }
                },
                onSuccess:(res)=>{
                    resolve(res.data)
                }
            })
        })
    },
    

}
export default api;