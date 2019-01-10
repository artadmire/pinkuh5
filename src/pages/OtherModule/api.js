import {
    axiosFun
  } from '@/common/js/public';
import root from '@/api'
const api ={
    //获取邀请者信息
    getInvitedinfo: (invitationCode)=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    method:'get',
                    url: root.data + "/h5/mission/invitation?invitationCode="+invitationCode,
                },
                onSuccess:(res)=>{
                    resolve(res.data)
                }
            })
        })
    },
    //获取提醒者信息
    getReminderinfo: (invitationCode)=>{
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    method:'get',
                    url: root.data + "/h5/mission/reminder?invitationCode="+invitationCode,
                },
                onSuccess:(res)=>{
                    resolve(res.data)
                }
            })
        })
    },
    //获取中奖结果信息
    getWinninginfo: (id)=>{
        console.log(id)
        // if(!id){
        //     id = -1
        // }
        return new Promise((resolve,reject)=>{
            axiosFun({
                config:{
                    method:'get',
                    url: root.data + "/h5/draw/winning_results?centDrawId="+id,
                },
                onSuccess:(res)=>{
                    resolve(res.data)
                }
            })
        })
    },
}
export default api;