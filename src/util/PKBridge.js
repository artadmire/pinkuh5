;
(function () {
  //非app环境下，不执行
  // if (!window.webkit && !window.WVJBInterface) {
  //   console.log(111)
  //   return;
  // } 
  // else {
    var responseCallbacks = {}; // 标记此次js调用Native的逻辑，完成之后，接收native发送给js的数据
    var messageHandlers = {};
    var eventObservers = {};
    var uniqueId = 1;


    function _doSend(message, responseCallback) {
      //判断ios和安卓，需不需要callback
      if (responseCallback) {
        var callbackId = 'cb_' + (uniqueId++) + '_' + new Date().getTime();
        responseCallbacks[callbackId] = responseCallback;
        message['callbackId'] = callbackId;
      }
      if (isIOS()) {
        var msg = message || {};
        console.log(window.webkit);
        window.webkit.messageHandlers.PKBridge.postMessage(msg)

      } else {
        let newParams = {
          'handlerName': message.method,
          'data': message.params,
          'callbackId': message.callbackId
        }
        window.WVJBInterface.notice(JSON.stringify(newParams))
      }

    }
    //判断是不是IOS
    function isIOS() {
      return navigator.userAgent.match(/iPhone|iPod|iPad/i);
    }
    
    var bridge = {

      addLisenter(event, callback) {
        var callbacks = eventObservers[event];
        if (!callbacks) {
          callbacks = [];
          eventObservers[event] = callbacks;
        }
        eventObservers[event].push(callback);
      },

      registerHandler: function (handlerName, handler) {
        messageHandlers[handlerName] = handler;
      },

      callHandler(handlerName, data, responseCallback) {
        console.log(window)
        if (arguments.length == 2 && typeof data == 'function') {
          responseCallback = data;
          data = null;
        }
        _doSend({
          method: handlerName,
          params: data
        }, responseCallback);
      },
      disableJavascriptAlertBoxSafetyTimeout(disable) {
        this.callHandler("_disableJavascriptAlertBoxSafetyTimeout", disable !== false)
      },
      hasNativeMethod(name, responseCallback) {
        this.callHandler('_hasNativeMethod', name, responseCallback);
      },
      // response newJSON format
      // {
      //   callbackId:'1',
      //   succ:true,
      //   // succ:false
      //   error:null,
      //   error:{
      //     code:'1',
      //     message:''
      //   },
      //   data:{
      //   }
      // }
      //和ios约定方法
      nativeCallbackToJS(json) {
        console.log('json')
        let formatJson = JSON.parse(json);
        let newJson = {
          callbackId: formatJson.callbackId,
          succ: formatJson.succ,
          error: formatJson.error,
          data: formatJson.data
        }
        this.__handleCallback(newJson);
      },
      //和安卓约定方法
      _handleMessageFromJava(response) {
        if (response.type == 2) {
          let newJson = {
            event: JSON.parse(response.responseData).event,
            callbackId: JSON.parse(response.responseData).callbackId,
          }
          this.__nativeEmitEventToJS(newJson)
        } else {
          let newJson = {
            callbackId: response.responseId,
            succ: JSON.parse(response.responseData).ret == 1 ? true : false,
            error: {
              code: JSON.parse(response.responseData).ret
            },
            data: JSON.parse(response.responseData).data
          }
          this.__handleCallback(newJson)
        }

      },
      __handleCallback(response) {
        if (response.callbackId) {
          var responseCallback = responseCallbacks[response.callbackId];
          responseCallback(response);
          delete responseCallbacks[response.callbackId];
        }
        //
      },

      nativeEmitEventToJS(json) {
        // console.log(json)
        this.__nativeEmitEventToJS(JSON.parse(json));
      },
      __nativeEmitEventToJS(json) {
        var callbacks = eventObservers[json.event];
        if (!callbacks) {
          callbacks = [];
          eventObservers[json.event] = callbacks;
        }
        callbacks.forEach((callback) => {
          callback();
        });
        var handler = messageHandlers[json.event];
        if (!handler) {
          // console.log("WebViewJavascriptBridge: WARNING: no handler for message from java");
        } else {
          handler(json.callbackId);
        }
      },


    };

    

    bridge.registerHandler('logout', function (callbackId) {
      callbackId(JSON.stringify({
        logoutState: true
      }))
    })


    var callbacks = window.WVJBCallbacks;
    delete window.WVJBCallbacks;
    if (callbacks) {
      for (var i = 0; i < callbacks.length; i++) {
        callbacks[i](bridge);
      }
    }
    window.PKBridge = bridge;
  // }
})();
