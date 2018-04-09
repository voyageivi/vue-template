/**
 * uploadImageOption
 * @type {{}}
 */
let uploadImageOption = {}
/**
 * 截取类型
 * @type {number}
 */
uploadImageOption.serviceType = {
  BIG: 3,
  MIDDLE: 2,
  SMALL: 1
}
uploadImageOption.defalutFormat = [
  [],
  [56, 56],
  [128, 128],
  [640, 640]
]
/**
 * 格式化图片地址
 * @param input
 * @param args
 * @returns {*}
 */
uploadImageOption.formatImage = function (input, args) {
  if (!input || typeof input !== 'string') {
    if (typeof input === 'object') {
      if (!input) return '';
      if (input.DomainUrl) {
        input = input.DomainUrl
      } else if (input.__domainUrl) {
        input = input.__domainUrl
      } else {
        return '';
      }
    } else {
      return '';
    }
  }
  if (
    input.substring(0, 4) === 'http' ||
    input.substring(0, 10) === 'data:image' ||
    input.substring(0, 7) === 'imageid' ||
    input.substring(0, 9) === 'blob:http'
  ) {
    return input
  }
  if (args) {
    // 是否为编辑状态：
    var isEdit = args[2] || false
    if (isEdit) {
      let width = args[3] || 0
      let height = args[4] || 0
      return (
        'http://' +
        input +
        '_' +
        width +
        'x' +
        height +
        '_-1x-1_' +
        width +
        'x' +
        height
      )
    } else {
      let width = args[0] || 0
      let height = args[1] || 0
      return (
        'http://' +
        input +
        '_' +
        width +
        'x' +
        height +
        '_-1x-1_' +
        width +
        'x' +
        height
      )
    }
  } else {
    return 'http://' + input
  }
}
/**
 * 获取一个文件
 * @param file
 * @param callback
 * @returns {img}
 */
uploadImageOption.getFile = function (file) {
  if (!/image\/\w+/.test(file.type)) {
    return new Promise(function (resolve, reject) {
      return resolve(false)
    })
  }
  let reader = new FileReader()
  reader.readAsDataURL(file)
  return new Promise(function (resolve, reject) {
    reader.onload = function () {
      return resolve(this.result)
    };
    reader.onerror = function () {
      // 加载出错
      return reject(new Error(false));
    };
    return this
  })
};
export default uploadImageOption
