import ajax from './ajax';
// import config from '../config';
// import Constatnt from '../constant';

/**
 * 在正确响应后，对数据进行操作（不同数据的处理方式不同）
 * @param res
 * @param successCallback 正确响应后的操作
 * @returns {Promise.<T>}
 */

export default {
  ajax: ajax,
  // ================================================================================
  // 辅助方法
  /**
   * 检查api响应是否正确
   * @param res
   * @returns {*}
   */
  checkResponse: function (res) {
    return ajax.checkResponse(res || {});
  },

  /**
   * 是否为服务器api请求返回的结果码
   * @param resultCode
   * @returns {boolean}
   */
  isServerResultCode: function (resultCode) {
    resultCode = parseInt(resultCode || 0);
    return resultCode === -900 || resultCode < 0;
  },

  /**
   * 请求错误处理(如果为服务器返回的则使用统一的处理，其余错误请自己处理)
   * @param error
   * @param handleFunc)
   */
  handleError: function (error, handleFunc) {
    if ((!handleFunc || typeof handleFunc !== 'function') || (error && this.isServerResultCode(error.resultCode))) {
      return ajax.handleError(error);
    } else {
      handleFunc(error);
    }
  },
};
