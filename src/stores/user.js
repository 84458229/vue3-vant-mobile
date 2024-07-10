import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useStore = defineStore('user', {
  state: () => ({
    token: null,
    iphone: null
  }),
  // persist: {  本地存储
  //   enabled: true,
  //   strategies: [
  //     {
  //       key: 'token',
  //       storage: localStorage
  //     }
  //   ]
  // },
  actions: {
    setTookie(token) {
      Cookies.set('Authorization', token, { expires: 7 }) // 写入token 设置有效期7天
      this.token = token
    },
    getTookie() {
      return this.token
    },
    clearTookie() {
      Cookies.remove('Authorization')
      this.token = null
    },
    setIphone(iphone) {
      this.iphone = iphone
    }
  }
})
