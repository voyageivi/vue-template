/**
 * ================================================================================
 * 过滤器
 * ================================================================================
 */


/**
 * 格式化价格（DB存储时以‘分’为单位，显示时以‘元’为单位）
 * @param price
 * @returns {string}
 */
export const formatPrice = price => {
  return parseFloat(price / 100).toFixed(2)
};


/**
 * 格式化最大数量
 *
 * @param num 具体数值
 * @param maxNum 最大数值
 *    为空值则默认为 100 000
 * @returns {string} 格式化后的数值
 */
export const formatMaxNum = (num, maxNum) => {
  if (!maxNum) {
    maxNum = 100000
  }
  if (num > maxNum) {
    return maxNum + '+';
  } else {
    return num + '';
  }
}
export const filterReqData = (reqDataObj, recurse) => {
  for (let i in reqDataObj) {
    if (!(i === 'pageIndex')) {
      if (
        reqDataObj[i] === '' ||
        reqDataObj[i] === 0 ||
        reqDataObj[i] === null
      ) {
        delete reqDataObj[i]
      } else if (reqDataObj[i] === '0') {
        reqDataObj[i] = parseInt(reqDataObj[i])
      } else if (recurse && typeof reqDataObj[i] === 'object') {
        filterReqData(reqDataObj[i], recurse)
      }
    }
  }
}
export const parseParam = function (data) {
  let _result = []
  for (var key in data) {
    var value = data[key]
    if (value.constructor === Array) {
      value.forEach(function (_value) {
        _result.push(key + '=' + _value)
      })
    } else {
      _result.push(key + '=' + value)
    }
  }
  return _result.join('&')
};
export const timeForMat = function (count) {
  // 拼接时间
  let time1 = new Date()
  time1.setTime(time1.getTime())
  let Y1 = time1.getFullYear()
  let M1 =
    time1.getMonth() + 1 > 10
      ? time1.getMonth() + 1
      : '0' + (time1.getMonth() + 1)
  let D1 = time1.getDate() > 10 ? time1.getDate() : '0' + time1.getDate()
  let timer1 = Y1 + '-' + M1 + '-' + D1 // 当前时间
  let time2 = new Date()
  time2.setTime(time2.getTime() - 24 * 60 * 60 * 1000 * (count - 1))
  let Y2 = time2.getFullYear()
  let M2 =
    time2.getMonth() + 1 > 10
      ? time2.getMonth() + 1
      : '0' + (time2.getMonth() + 1)
  let D2 = time2.getDate() >= 10 ? time2.getDate() : '0' + time2.getDate()
  let timer2 = Y2 + '-' + M2 + '-' + D2 // 之前的7天或者30天
  return {
    dayEnd: timer1,
    dayStart: timer2
  }
};
export const validateEmail = function (email) {
  let regEmail = new RegExp(
    /^[A-Z0-9a-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd0-9]+[-.])+[A-Za-zd]{2,5}$/
  )
  return regEmail.test(email)
};
export const validateTemplate = function (template) {
  let regTemplate = new RegExp(/^[0-9a-zA-Z`~!@$%^&*_+<>{}]+$/gi)
  return regTemplate.test(template)
};
export const deepClone = function (data) {
  let that = this
  let t = that.typeObj(data)
  let o
  let i
  let ni
  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }
  if (t === 'array') {
    for (i = 0, ni = data.length; i < ni; i++) {
      o.push(that.deepClone(data[i]))
    }
    return o
  } else if (t === 'object') {
    for (i in data) {
      o[i] = that.deepClone(data[i])
    }
    return o
  }
}
export const typeObj = function (obj) {
  let toString = Object.prototype.toString
  let map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
};
export const extendObj = {}
extendObj.extend = function (destination, source) {
  // 一个静态方法表示继承, 目标对象将拥有源对象的所有属性和方法
  for (var property in source) {
    destination[property] = source[property] // 利用动态语言的特性, 通过赋值动态添加属性与方法
  }
  return destination // 返回扩展后的对象
};
extendObj.extend(extendObj, {
  inspect: function (object) {
    // 一个静态方法, 传入一个对象, 返回对象的字符串表示
    try {
      if (object === undefined) return 'undefined'; // 处理undefined情况
      if (object === null) return 'null'; // 处理null情况
      // 如果对象定义了inspect方法, 则调用该方法返回, 否则返回对象的toString()值
      return object.inspect ? object.inspect() : object.toString()
    } catch (e) {
      if (e instanceof RangeError) {
        return '...';
      } // 处理异常情况
      throw e
    }
  },
  keys: function (object) {
    // 一个静态方法, 传入一个对象, 返回该对象中所有的属性, 构成数组返回
    var keys = []
    for (var property in object) {
      keys.push(property) // 将每个属性压入到一个数组中
    }
    return keys
  },
  values: function (object) {
    // 一个静态方法, 传入一个对象, 返回该对象中所有属性所对应的值, 构成数组返回
    var values = []
    for (var property in object) values.push(object[property]) // 将每个属性的值压入到一个数组中
    return values
  },
  clone: function (object) {
    // 一个静态方法, 传入一个对象, 克隆一个新对象并返回
    return extendObj.extend({}, object)
  }
})
