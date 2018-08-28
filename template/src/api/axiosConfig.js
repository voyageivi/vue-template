import * as axios from 'axios';
import config from '../config';

axios.defaults.baseURL = config.API_BASE_URL;

export function createInstance (baseURL) {
  /**
   * axios实例：用于定制请求
   */
  let instance = axios.create({
    method: 'post', // 默认请求方法
    baseURL: baseURL,
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
  return instance;
}
