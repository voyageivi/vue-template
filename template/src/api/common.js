/**
  * 检查api响应是否正确
  * @param res
  * @returns {*}
  */
 export function checkResponse (res) {
  window.console.log('响应拦截器(checkResponse)：==========', res);
  res = res || {};
  let resultCode = parseInt(res.data.code) || 0;
  if (resultCode === 0) {
    return Promise.resolve(res.data);
  } else {
    var error = new Error();
    error.resultCode = resultCode;
    error.resultMessage = res.data.message;
    return Promise.reject(error);
  }
}
/**
  * 请求错误处理(如果为服务器返回的则使用统一的处理，其余错误请自己处理)
  * @param error
  * @param handleFunc)
  */
export function handleError (error, handleFunc) {
  if ((handleFunc && typeof handleFunc === 'function')) {
    handleFunc(error);
  }
}
