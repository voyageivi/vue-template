import config from '../../config';
import $ from 'jquery';

const UPLOAD_BASE_URL = config.UPLOAD_BASE_URL

const GLOBAL = {
  // 去除首尾空格
  trimStr(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  },
  // 去除首尾空格
  trimStrValidate(str) {
    return (
      Object.prototype.toString.call(str) === '[object String]' &&
      GLOBAL.trimStr(str) === ''
    )
  },

  // 验证数字
  isNumber(arg) {
    let reg = /^\d+$/g
    return reg.test(arg)
  },

  // 针对主体框架进行js样式布局
  layoutMain() {
    function fixFoot() {
      let winH = $(window).height()
      let topFootHeight =
        $('#js-topBox').outerHeight() + $('#js-footBox').outerHeight()
      var dH = null

      if (winH >= topFootHeight) {
        dH = winH - topFootHeight
        $('#js-mainContWrapper').css('min-height', dH)
      }
    }

    function toggleLeftAsideClass() {
      let winW = $(window).width()
      let $app = $('#app')

      // 如果是中等屏幕以上（桌面显示器）
      if (winW >= 992) {
        $app.removeClass('hide-left-aside')
      } else {
        $app.addClass('hide-left-aside')
      }
    }

    fixFoot()
    toggleLeftAsideClass()

    $(window).resize(function () {
      fixFoot()
      toggleLeftAsideClass()
    })
  },

  toggleAside() {
    var $app = $('#app')
    if ($app.hasClass('hide-left-aside')) {
      $app.removeClass('hide-left-aside')
    } else {
      $app.addClass('hide-left-aside')
    }
  },

  /**
   * [uploadUrl 上传接口路径定义]
   * @return {[string]} [返回上传请求的地址（路径+参数） 所组成的字符串]
   */
  uploadUrl: function (paramsStr) {
    if (paramsStr) {
      // 上传图片或者icon
      return UPLOAD_BASE_URL + 'upload/static' + '?' + paramsStr
    } else {
      // 上传游戏下载包
      return UPLOAD_BASE_URL + 'upload/source';
    }
  }
}

export default GLOBAL
