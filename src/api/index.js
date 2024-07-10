import request from '@/utils/axios'

// 获取token
export function getToken() {
  return request.post('/getToken')
}
/**
 * 获取用户是否第一次登录信息
 * @param {string} sdtCode 授权编码
 * @returns
 */
export function getFirstLogin(sdtCode) {
  return request.post('/firstLogin', { sdtCode })
}

/**
 * 获取手机验证码
 * @param {string} a0177 身份证号
 * @param {String} a0101 姓名
 * @param {String} phone 手机号
 * @returns
 */
export function getPhoneCode({ a0177, a0101, phone }) {
  return request.post('/api/user/sendVerificationCode', {
    a0177,
    a0101,
    phone,
  })
}

/**
 * 第一次身份验证
 * @param {*} param0
 * @returns
 */
export function saveUser({ a0177, a0101, verificationCode }) {
  return request.post('/api/user/saveUserData', { a0177, a0101, verificationCode })
}

// 获取登录人基本信息
export function getUserInfo() {
  return request.post('/api/user/getEmpInfo')
}
