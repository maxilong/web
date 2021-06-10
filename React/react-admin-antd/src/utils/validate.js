/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 * 判断是否是地址
 */
 export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  return str.trim()
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 是否全小写
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 是否全大写
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 是否是大小写英文
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 * 判断邮箱格式
 */
export function validEmail(email) {
  // 更换邮箱正则，之前的可以输入汉字
  // const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 是否是字符串
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 * 是否是数组
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * @param {string} phone
 * @returns {Boolean}
 * 判断手机格式
 */
export function validPhone(phone) {
  const reg = /^1\d[10]$/
  return reg.test(phone)
}

/**
 * @param {string} identity
 * @returns {Boolean}
 * 判断身份证格式
 */
export function validIdentityCard(identity) {
  const reg = /^[1-9]\d{5}(18|19|20|(3\d)|(4\d))((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return reg.test(identity)
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 是否是英文+数字
 * 大小英文数字及字符 6~8位
 */
export function validPassWorld(str) {
  const reg = /^[A-Za-z0-9\S]{6,8}$/
  return reg.test(str)
}

/**
 * @param {string} phone
 * @returns {Function}
 * 表单验证的正则手机号
 */
export function validFormPhone(rule, value, callback) {
  if (!value) {
    return callback(new Error('手机号不能为空'))
  } else {
    const reg = /^1\d{10}$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的手机号'))
    }
  }
}

/**
 * @param {string} IdCard 身份证号
 * @returns {Function}
 * 表单验证的正则身份证号
 */
export function validFormIdCard(rule, value, callback) {
  if (!value) {
    return callback(new Error('身份证号不能为空'))
  } else {
    const reg = /^[1-9]\d{5}(18|19|20|(3\d)|(4\d))((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的身份证号'))
    }
  }
}

/**
 * @param {string} Telephone 身份证号
 * @returns {Function}
 * 固定电话正则
 */
export function validFormTelephone(rule, value, callback) {
  if (!value) {
    return callback(new Error('电话不能为空'))
  } else {
    const reg = /^((0\d{2,3}-\d{7,8})|(1\d{10}))$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的手机号或者座机号格式为：010-0**0000'))
    }
  }
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 是否是英文+数字
 * 大小英文数字及字符 6~8位
 * /^(?=.*?[A-Z]+)(?=.*?[0-9]+)(?=.*?[A-Z]).*$/ 判断英文大写+数字
 */
export function validAccount(rule, value, callback) {
  if (!value) {
    return callback(new Error('系统账号不能为空'))
  } else {
    const reg = /^[A-Za-z0-9]+$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入字母/数字/字母+数字格式'))
    }
  }
}

/**
 * @param {string} str
 * @returns {Function}
 * 是否是英文和中文
 */
export function validChOrEn(rule, value, callback) {
  if (!value) {
    return callback(new Error('内容不能为空'))
  } else {
    const reg = /^[\u0391-\uFFE5A-Za-z]+$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入中文或英文'))
    }
  }
}

/**
 * @param {string} email
 * @returns {Function}
 * 判断form表单邮箱格式
 */
export function validFromEmail(rule, email, callback) {
  if (!email) {
    return callback(new Error('邮箱不能为空'))
  } else {
    // 更换正则，之前的正则可以输入汉字
    // const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
    if (reg.test(email)) {
      callback()
    } else {
      return callback(new Error('请输入正确的邮箱'))
    }
  }
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 是否是英文+数字
 * 大小英文数字及字符 6~8位
 *  判断英文大写+数字
 */
export function validCardCode(rule, value, callback) {
  if (!value) {
    return callback(new Error('请输入编码'))
  } else {
    // const reg = /^(?=.*[0-9].*)(?=.*[A-Z].*).*$/
    const reg = /^[A-Z,0-9]+$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入大写字母/数字/大写字母+数字格式'))
    }
  }
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 是否是英文+数字
 * 英文+数字及字符 6~20位
 */
export function validPassword(rule, value, callback) {
  if (!value) {
    return callback(new Error('请输入密码'))
  } else {
    const reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,20}$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('密码格式不正确'))
    }
  }
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 是否是英文+数字
 * 大小英文数字及字符 6~20位
 */
export function validStaffPassword(rule, value, callback) {
  if (!value) {
    return callback(new Error('请输入密码'))
  } else {
    const reg = /^(?=.*[a-zA-Z])(?=.*\d).{6,20}$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('密码格式英文大小写+数字6~20位'))
    }
  }
}
