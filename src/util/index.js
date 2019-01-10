
//获取cookie、
export function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};

//删除cookie
export function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

export function isEmail(str) {
  var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  return reg.test(str);
}

export function formatTime(time) {
  // console.log(time)
  // 解决ios微信不能识别 2018-12-31 格式，需要转化成 2018/12/31
  time = time.replace(/\-/g, '/');
  let a = new Date(time) - new Date();
  let hours = parseInt(a / (1000 * 3600));
  let min = parseInt(a / (1000 * 60)) % 60;
  let second = parseInt(a / (1000)) % 60;
  let millSec = parseInt(a / 100) % 10
  return (hours < 10 ? ('0' + hours) : hours) + ':' + (min < 10 ? ('0' + min) : min) + ':' + (second < 10 ? ('0' + second) : second) + '.' + millSec;
}
//判断手机号
export function checkMobile(str) {
  var re = /^1\d{10}$/
  return (re.test(str))

}
//手机号自动加空格 137 3385 5404
export function Mobile(str) {
  var value = str.replace(/\s*/g, "")
  var result = []
  for (var i = 0; i < value.length; i++) {
    if (i == 3 || i == 7) {
      result.push(" " + value.charAt(i));
    } else {
      result.push(value.charAt(i));
    }
  }
  return value = result.join('')

}
export function isapp() {
  var ua = navigator.userAgent.toLowerCase();
  if (/^.+(Mobile\/\w+)\s?$/i.test(ua)) {
    // IOS端APP
    return "APP";
  } else if (ua.match(/MicroMessenger/i) && ua.match(/MicroMessenger/i)[0].toLowerCase() === "micromessenger") {
    return "weixin";
    // IOS端浏览器
  }else if(ua.match(/QQ\/[0-9]/i)){
    return "QQ"
  }else {
    return "浏览器"
  }

}
export function Source() {
  if (ua.match(/MicroMessenger/i) && ua.match(/MicroMessenger/i)[0].toLowerCase() === "micromessenger") {
    return "weixin";
  } else {
    // ,//是否web应该程序，没有头部与底部
    return "app";
  }
}

export function Godownload(Aitem) {
  var browser = {
    versions: function () {
      var u = navigator.userAgent
      return { //移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
      };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  }

  if (browser.versions.mobile) { //判断是否是移动设备打开。browser代码在下面
    var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
    if (browser.versions.ios) {
      //是否在IOS浏览器打开
      Aitem.setAttribute("href",
        "https://itunes.apple.com/app/apple-store/id1311119937?pt=118775821&ct=h5&mt=8")
    }
    if (browser.versions.android) {
      // location.href = 'http://static.pinkumall.com/app/android/pinku.apk?from=download_page'
      //是否在安卓浏览器打开
      Aitem.setAttribute("href",
        "http://a.app.qq.com/o/simple.jsp?pkgname=com.pinku")
    }
  } else {
  }

}

//从url中截取参数
export function mapObj(Url) {
  let arr = Url.split("?")
  var str = arr[arr.length - 1]
  arr = str.split("&")
  console.log(arr)
  var obj = {}
  for (var i = 0; i < arr.length; i++) {
    var newArr = arr[i].split("=")
    console.log(newArr)
    obj[newArr[0]] = newArr[1]
  }
  //console.log(obj)
  //console.log(arr)
  return obj
}

export function addEvent(obj, type, fn) {
  if (obj.attachEvent) { //ie
    obj.attachEvent('on' + type, function () {
      fn.call(obj);
    })
  } else {
    obj.addEventListener(type, fn, false);
  }
}

export function locationSearch(value) {
  let res;
  const search = location.href.split('?')[1];
  if (search) {
    search.split('&').forEach((item, index) => {
      if (value == item.split('=')[0]) {
        res = decodeURI(item.split('=')[1])
      }
    })
  }
  return res;
}

export function isNativeHybird(func) {

  if ((window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.PKBridge) || window.WVJBInterface) {
    console.log(window.webkit.messageHandlers)
    console.log(window.WVJBInterface)
    if (func) {
      func();
    }
  }
}

export function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}