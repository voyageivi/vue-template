/**
 *  网络请求底层封装：用于定制axios库
 */

import * as axios from 'axios';
import config from '../config';
// import * as $filter from '../filters/index';

// import store from '../store';
// import constant from '../constant';
import router from '../router';

/**
 * 取消请求控制器：在axios的实例化中完成初始化
 * @type {null}
 */
window.axiosCancelControl = null;
axios.defaults.baseURL = config.API_BASE_URL;
/**
 * axios实例：用于定制请求
 */
let instance = axios.create({
  method: 'post', // 默认请求方法
  baseURL: config.API_BASE_URL,
  timeout: config.API_NORMAL_TIMEOUT,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  contentType: 'application/json;charset=UTF-8',
  responseType: 'json',

  onUploadProgress: function (progressEvent) {
    window.console.log('axios on upload progress ==========');
  },
  // transformRequest: [function (data) {
  //   let ret = '';
  //   for (let it in data) {
  //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
  //   }
  //   return ret;
  // }],
  /**
   * 指定取消Token，能够用来取消请求
   */
  cancelToken: new axios.CancelToken(function (cancel) {
    window.axiosCancelControl = cancel;
  })
});
/**
 * get请求
 *
 */
instance.getData = (url, Obj) => {
  if (Obj) {
    return axios.get(url, {
      params: Obj
    });
  } else {
    return axios.get(url);
  }
};
/**
 * 将取消请求控制器关联到axios实例中
 * @type {null}
 */
instance.cancel = function (message) {
  if (window.axiosCancelControl) {
    window.axiosCancelControl(message);
  }
};

/**
 * 请求发送之前的钩子：进行额外参数的封装
 *    应用相关信息：
 *        请求类型： ReqType: ''
 *        应用标识: AppKey： ''
 *    用户登录信息：User:{Id: '', Token: ''}
 */
instance.interceptors.request.use(reqConfig => {
  window.console.log('请求拦截器开始：==========');
  window.console.log(reqConfig);
  // let data = reqConfig.data
  // $filter.filterReqData(data)
  window.console.log(reqConfig);
  return reqConfig;
}, error => {
  window.console.log('请求拦截器(error)：==========');
  return Promise.reject(error);
});

/**
 * 请求处理之前的钩子：进行响应结果的处理
 */
instance.interceptors.response.use(response => {
  window.console.log('响应拦截器(normal)：==========', response);
  // 取出服务器返回的数据
  // let data = response.data;
  // data.paramData = $filter.parseParam(JSON.parse(response.config.data)) || '';
  return response;
}, error => {
  window.console.log('响应拦截器(error)：==========');
  // 抛出错误
  return Promise.reject(error);
});

/**
 * 检查api响应是否正确
 * @param res
 * @returns {*}
 */
instance.checkResponse = function (res) {
  window.console.log('响应拦截器(checkResponse)：==========', res);

  let resultCode = parseInt(res.data.code) || 0;
  if (resultCode === 0) {
    return Promise.resolve(res.data);
  } else {
    var error = new Error();
    error.resultCode = resultCode;
    error.resultMessage = res.data.message;
    return Promise.reject(error);
  }
};

/**
 * 请求错误处理
 * @param error
 */
instance.handleError = function (error) {
  window.console.log('错误处理，当前结果码：' + error);
  let errorMsg = JSON.stringify(error);
  let resultCode = error.resultCode || error.code || 400;
  if (resultCode === 400) {
    // 网络错误
    window.$messageBox({
      message: '网络错误！！！'
    });
    window.console.log(errorMsg);
  } else {
    if (parseInt(resultCode) === 1) {
      window.$messageBox({
        message: '查询参数错误，请重新输入进行查询'
      });
    } else if (resultCode === -900) {
      window.$messageBox({
        message: '请求失败,错误码:' + error.resultCode + '错误信息: ' + errorMsg + ''
      });
    } else if (resultCode === -1001) {
      window.$messageBox({
        message: '账号、密码出错'
      });
    } else if (resultCode === -1002) {
      router.push({
        path: '/login'
      });
    } else if (resultCode === -3) {
      window.$messageBox({
        message: '参数错误'
      });
    } else if (resultCode === -44) {
      window.$messageBox({
        message: '没有找到缓存版本, 请在管理平台刷新配置'
      });
    } else if (resultCode === -77) {
      window.$messageBox({
        message: '指定渠道里面只可以有一个某插件的配置'
      });
    } else if (resultCode === -78) {
      window.$messageBox({
        message: 'apk包解析有问题'
      });
    } else if (resultCode === -79) {
      window.$messageBox({
        message: '更新插件只能更新相同包名的插件'
      });
    } else if (resultCode === -80) {
      window.$messageBox({
        message: '该渠道已存在'
      });
    } else if (resultCode === -81) {
      window.$messageBox({
        message: '版本太小了，新增或修改的插件版本应该比库里面的大'
      });
    } else {
      // 提示错误信息
      window.$messageBox({
        message: '请求失败,错误码:' + error.resultCode + '错误信息:' + errorMsg + ''
      });
    }
  }
};

export default instance;
