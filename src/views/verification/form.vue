<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { showFailToast, showSuccessToast } from 'vant'
import { getPhoneCode, saveUser } from '@/api/index'
import { useStore } from '@/stores/user'

const user = useStore()
const router = useRouter()
const userInfo = ref({
  name: '', // 姓名
  code: '', //  身份证号
  ihpone: user.iphone, // 手机号
  verificationCode: '', // 验证码
})

// 校验身份证号
const pattern
  = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/
const timer = ref(null)
const count = ref(60)
const verificationText = ref('发送验证码')
const verificationFalg = ref(true)
async function onSubmit() {
  // console.log('submit', userInfo.value)
  // setUserInfo(userInfo.value)
  // // 假数据判断给 code
  // if (userInfo.value.verificationCode === '123456') {
  //   Toast.success('验证成功即将跳转')
  // } else {
  //   Toast.fail('验证码不正确')
  // }
  const params = {
    a0177: userInfo.value.code,
    a0101: userInfo.value.name,
    verificationCode: userInfo.value.verificationCode,
  }
  const res = await saveUser(params)
  if (res.state === 1) {
    showSuccessToast('验证成功即将跳转')
    router.push('/wageList')
    // 跳转路由
  }
 else {
    showFailToast(res.data)
  }
}
// 点击发送验证码 倒计时
function handleCodeClick() {
  if (!verificationFalg.value)
    return

  verificationFalg.value = false
  timer.value = setInterval(() => {
    if (count.value <= 0) {
      verificationText.value = '发送验证码'
      verificationFalg.value = true
      clearInterval(timer.value)
      timer.value = null
      count.value = 60
    }
 else {
      count.value--
      verificationText.value = `倒计时${ count.value }秒`
    }
  }, 1000)
  // 调用接口
  setCode()
}
// 获取验证码
async function setCode() {
  const res = await getPhoneCode({
    a0177: userInfo.value.code,
    a0101: userInfo.value.name,
    phone: userInfo.value.ihpone,
  })
  if (res.state === 1) {
    //  开发用 记住要注释掉
    // userInfo.value.verificationCode = res.data
    showSuccessToast('验证码发送成功')
  }
 else {
    // 已关联的直接跳转
    router.push('/wageList')
    showFailToast(res.data)
    // 失败的情况下直接清楚定时器初始化点击按钮
    verificationText.value = '发送验证码'
    verificationFalg.value = true
    clearInterval(timer.value)
  }
}
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        label-class="customLabel"
        size="large"
        v-model="userInfo.name"
        label-align="right"
        label="姓名"
        placeholder="请在此输入"
        :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <van-field
        label-class="customLabel"
        v-model="userInfo.code"
        size="large"
        label-align="right"
        label="身份证号"
        placeholder="请在此输入"
        :rules="[
          { required: true, message: '请填写身份证号' },
          { pattern, message: '身份证格式不正确' },
        ]"
      />
      <van-field
        label-class="customLabel"
        v-model="userInfo.ihpone"
        size="large"
        label-align="right"
        label="山东通手机号"
        placeholder="请在此输入"
        readonly
      >
        <template #extra>
          <div class="verification" @click="handleCodeClick">
            {{ verificationText }}
          </div>
        </template>
      </van-field>
      <van-field
        label-class="customLabel"
        size="large"
        v-model="userInfo.verificationCode"
        type="digit"
        label-align="right"
        label="验证码"
        placeholder="请在此输入"
        :rules="[{ required: true, message: '请填写验证码' }]"
      />
      <div style="margin: 16px">
        <van-button size="large" block type="primary" native-type="submit" color="#455BDF">
          身份验证
        </van-button>
      </div>
    </van-cell-group>
  </van-form>
</template>

<style lang="less" scoped>
.verification {
  color: #455bdf;
}
.customLabel {
  color: #333333;
}
// :deep(.van-field__label) {
//   color: #333333;
// }
:deep(.van-cell-group) {
  box-shadow: 0px 7px 27px 8px rgba(49, 88, 153, 0.11);
}
:deep(.van-cell:after) {
  border-bottom: 1px solid #e5e5e5;
}
</style>
