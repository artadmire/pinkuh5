import  './PKBridge'
const pk ={

    authorize: (success, failed)=>{
        PKBridge.callHandler('authorize',{scope:'userInfo'}, (response)=>{
            if (response.succ && success) {
                success(response.data.code)
            } else if(failed) {
                failed(response.error)
            }
        })
    },
    navigateTo(params,success,failed){
        let newParams = {url:params.url};
        PKBridge.callHandler('navigateTo',newParams,(response)=>{
            if(response.succ && success){
                console.log("跳转成功")
                success();
            }else if(failed){
                console.log("跳转失败");
                failed('跳转失败,errorCode:'+response.ret)
            }
        })
    },
    redirectTo(params,success,failed){
        let newParams = {url:params.url};
        PKBridge.callHandler('navigateTo',newParams,(response)=>{
            if(response.succ&& success){
                success();
            }else if(failed){
                failed('跳转失败,errorCode:'+response.ret)
            }
        })
    },
    getEnvironment(success,failed){
        PKBridge.callHandler('getEnvironment',(response)=>{
            console.log(response)
            if(response.ret == 1 && success){
                success(response);
            }else if(failed){
                failed('获取环境失败,errorCode:'+response.ret)
            }
        }) 
    },
    navigateBack(success,failed){
        PKBridge.callHandler('navigateBack',(response)=>{
            if(response.succ && success){
                success();
            }else if(failed){
                failed('跳转失败,errorCode:'+response.ret)
            }
        })
    },
    share(params, success, failed) {
        let newParams = {
            "title":params.title,
            'content':params.content,
            'imgUrl':params.imgUrl,
            'linkUrl':params.linkUrl,
            'miniProgramPath':params.miniProgramPath,
            'displayTitle':params.displayTitle,
            'displayTitleColor':params.displayTitleColor,
            'targetType':params.targetType,
            'targetId':params.targetId
        }
        PKBridge.callHandler('share', newParams, (response)=>{
            if (response.succ && success) {
                success()
            } else if(failed){
                failed('分享失败,errorCode:'+response.ret)
            }
        })
    },
    reportException(params,success,failed){
        let newParams = {
            tag:params.tag,
            exception:params.exception+'=>h5',
            callStack:params.callStack
        };
       
        PKBridge.callHandler('reportException',newParams,(response)=>{
            console.log(response)
            if(response.succ&&success){
                console.log(newParams,"999")
                success()
            }else if(failed){
                failed();
            }
        })
    },
    commitCustomEvent(params,success,failed){
        let newParams = {
            eventName:params.eventName,
            params:params.params,
        }
        PKBridge.callHandler('commitCustomEvent', newParams, (response)=>{
            if (response.succ && success) {
                success()
            } else if(failed){
            }
        })
    },
    enterPageEvent(params,success,failed){
        let newParams = {
            pageName : params.pageName,
        }
        PKBridge.callHandler('enterPageEvent',newParams,(response)=>{
            if (response.succ && success) {
                success()
            } else if(failed){
            }
        })
    },
    leavePageEvent(params,success,failed){
        let newParams = {
            pageName:params.pageName
        }
        PKBridge.callHandler('leavePageEvent',newParams,(response)=>{
            if (response.succ && success) {
                success()
            } else if(failed){
            }
        })
    },
    commitPerformanceEvent(p,success,failed){
        let newParams = {
            eventName:p.eventName,
            params:p.params,
            duration:p.duration
        }
        PKBridge.callHandler('commitPerformanceEvent',newParams,(response)=>{
            if (response.succ && success) {
                success()
            } else if(failed){
            }
        })
    },
    commitCustomEvent(params,success,failed){
        let newParams = {
            eventName:params.eventName
        }
        PKBridge.callHandler('commitCustomEvent',newParams,(response)=>{
            if (response.succ && success) {
                success()
            } else if(failed){
            }
        })
    },
    getWebContainerStatus(success,failed){
        PKBridge.callHandler('getWebContainerStatus',(response)=>{
            
            if(response.succ&&success){
                success(response)
            }else if(failed){
            }
        })
    },
    getLogWrite(params,success,failed){
        let newParams = {
            'tag':params.tag,
            'errorLog':params.errorLog,
            'content':params.content
        }
        PKBridge.callHandler('logWrite',newParams,(response)=>{
            if(response.succ&&success){
                success(response)
            }else if(failed){
            }
        })
    },
    addLisenter(event, callback){
        PKBridge.addLisenter(event, callback);
    },
}

export default pk;