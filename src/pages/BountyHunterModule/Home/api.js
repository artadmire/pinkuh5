import {
    axiosFun
  } from '@/common/js/public';
import root from '@/api'

const api ={
    // 个人信息
    getHome: (errorObj)=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    method:'get',
                    url: root.data + "/h5/hunter/home",
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
                onError(status){
                    errorObj.error(status)
                }
            })
        })
    },
    // 获取话费券列表
    getFareCouponList:()=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    method:'get',
                    url: root.data + "/h5/hunter/fare_coupon_list",
                },
                onSuccess:(res)=>{
                    resolve(res.data)
                }
            })
        })
    },
    // 获取优惠券列表
    getCashCouponList:()=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    method:'get',
                    url: root.data + "/h5/hunter/cash_coupon_list",
                },
                onSuccess:(res)=>{
                    resolve(res.data)
                }
            })
        })
    },
    // 收益列表
    getIncome:()=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    method:'get',
                    url: root.data + "/h5/hunter/income",
                },
                onSuccess:(res)=>{
                    resolve(res.data)
                }
            })
        })
    },
    // 爆品列表
    getRecommendItemList:(currentPage)=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    method:'get',
                    url: root.data + "/h5/hunter/recommend_item_list",
                    params:{
                        currentPage:currentPage,
                        pageSize:6
                    }
                },
                onSuccess:(res)=>{
                    resolve(res.data)
                }
            })
        })
    },
    //猎人优惠券领取
    getFetchHunterPacakge:(id)=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    method:'post',
                    url: root.data + "/h5/coupon/apply_hunter_package?id="+id,
                    
                },
                // deal:{
                //     toastShow:true
                // },
                onSuccess:(res)=>{
                    resolve(res.data)
                },
                onFailed:(error)=>{
                    resolve(error.data);
                }
            })
        })
    },
    //获取赏金猎人收入明细
    getHunterIncom:()=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    method:'get',
                    url: root.data + "/h5/hunter/hunter_benefit",
                    
                },
                onSuccess:(res)=>{
                    
                    resolve(res.data)
                },
                onFailed:(error)=>{
                    
                    resolve(error.data);
                },
                
            })
        })
    },

}
export default api;