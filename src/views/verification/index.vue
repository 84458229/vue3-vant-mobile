<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Form from './form.vue'
import { getFirstLogin, getToken } from '@/api/index.js'
import { useStore } from '@/stores/user'

const router = useRouter()
const user = useStore()
const loading = ref(true)

// 获取token并且存入本地缓存
async function getTokens() {
  const res = await getToken()
  if (res.state === 1)
    isFirstLogin(res.data)
}

// 判断是否第一次登录 如果是 跳进当前页面 不是的话直接跳进 工资页面
async function isFirstLogin(code) {
  const res = await getFirstLogin(code)
  if (res.state === 1) {
    // 身份验证页面
    user.setTookie(res.data.token)
    user.setIphone(res.data.Mobile)
    loading.value = false
    // 第一次登录
    return false
  }
  else {
    // 已经关联过的
    user.setTookie(res.data)
    // 跳转走到工资页面
    router.push('./wageList')
    // setTimeout(() => {
    //   router.push('./wageList')
    // }, 2000)
  }
}

onMounted(() => {
  getTokens()
})
</script>

<template>
  <van-skeleton title :row="6" :loading="loading">
    <div class="verification">
      <h1>身份验证</h1>
      <div class="content">
        <div class="title">
          身份验证
        </div>
        <div class="text">
          您首次使用山东通工资查询功能，需要进行身 份认证，请输入您的身份证号，并通过山东通预
          留手机号接收验证码，如果手机号有变更，请联系您单位的山东通管理员。
        </div>
      </div>
      <div class="form">
        <Form />
      </div>
    </div>
  </van-skeleton>
</template>

<style lang="less" scoped>
.verification {
  width: 100%;
  background-image: url(../../assets/images/bg.png);
  background-repeat: no-repeat;
  background-size: 100% 866px;
  h1 {
    font-size: var(--font-size-36);
    color: var(--font-color-white);
    text-align: center;
    font-weight: normal;
    margin: 0;
  }
  .content {
    margin-bottom: 29px;
    padding: 0 52px 0 47px;
    .title {
      font-size: var(--font-size-48);
      margin-top: 280px;
      color: #fb9525;
      font-weight: normal;
    }
    .text {
      margin-top: 15px;
      // color: var(--font-color-white);
      // font-size: var(--font-size-32);
      font-weight: 400;
      font-size: 32px;
      color: #FFFFFF;
      line-height: 45px;
    }
  }
  .form {
    padding: 0 30px;
  }
}
</style>
