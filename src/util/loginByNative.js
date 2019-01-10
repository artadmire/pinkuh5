import pk from '@/util/pk.js'
import api from '@/util/commonApi.js'
function PKauthorize(errorcb,success,failed) {
    if (window.sessionStorage.accessToken) {
        if(typeof success == 'function' && success){
            success();
        }
    } else {
        pk.authorize(
            code => {
                pk.getLogWrite(
                    {
                        'tag':'h5',
                        'errorlog':false,
                        'content':'h5 method get native code success'
                    },
                    ()=>{

                    },
                    ()=>{

                    }
                )
                postLoginByTempAuthCode(code,success,failed);
            },
            error => {
                if(typeof error == 'function' && error){
                    errorcb(error);
                }
            }
        );
    }
};
async function postLoginByTempAuthCode(code,success,failed) {
    let wipdata = await api.postLoginByTempAuthCode(code);
    if(wipdata.succ){
        window.sessionStorage.accessToken = wipdata.value.phone;
        if(typeof success == 'function' && success){
            success();
        }
    }else{
        if(typeof failed == 'function' && failed){
            failed();
        }
    }
    
};
export default function loginByNative(success,failed,cancel){
    PKauthorize((error) => {
        switch (error.code) {
            case -1:
                if (typeof failed == 'function' && failed) {
                    failed();
                }
                break;
            case 1001:
                if(typeof cancel == 'function' && cancel){
                    cancel();
                }
                break;
            case 1002:
                var flag = true;
                pk.addLisenter("onShow", () => {
                    if (flag) {
                        PKauthorize(null,success,failed);
                        flag = false;
                    }
                });
            break;
            case 2001:
            break;
            default:
            break;
        }
    },success,failed);
}


