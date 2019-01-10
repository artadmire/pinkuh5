global = extend({
  csrfToken: '',
  imgUrlPrefix: '',
  userAgreementUrl: '',
  defaultFlux: '',
  preOrderNotice: '',
  platformPromise: [],
  flowPhonenum: '',
  // 进入订单前的一个页面
  preOrderPreUrl:null,
  appDownloadUrl:null,
  h5AssetUrlPrefix:null,
  // 首屏加载时间
  firstLoadTime:0
}, global)


function extend(destination, source) {
  for (var property in source)
    destination[property] = source[property];
  return destination;
}
