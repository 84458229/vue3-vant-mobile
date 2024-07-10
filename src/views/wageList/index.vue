<template>
  <van-skeleton title avatar avatar-size="48px" :row="6" :loading="loading">
    <div class="wage">
      <h1>身份验证</h1>
      <div class="avatar">
        <div class="avatar-box">
          <div class="avatar-icon"></div>
        </div>
        <div class="avatar-p">
          <ul>
            <li>{{ name }}</li>
            <li>{{ branch }}</li>
          </ul>
        </div>
      </div>
      <div class="tab-list">
        <div class="tab">
          <Tabs @change="handleTabChange"></Tabs>
          <div v-if="tabValue === 0" class="tab-content">
            <div class="top">
              <span>工资所属月</span>
              <span>2024-06</span>
            </div>
            <div class="tab-title">应发工资类</div>
            <List></List>
            <div class="tab-title">工资扣发项及实发工资</div>
            <List></List>
            <div class="tab-title">单位缴纳部分</div>
            <List></List>
          </div>
          <div v-if="tabValue === 1" class="tab-content">
            <div class="search">
              <div class="search-start">
                <van-field
                  v-model="startTime"
                  readonly
                  :border="false"
                  size="large"
                  name="datePicker"
                  label="开始月"
                  placeholder="请选择"
                  @click="showStartPicker = true"
                  @clear="clearStartTime"
                >
                  <template #input>
                    <div class="input">
                      <input type="text" v-model="startTime" placeholder="请选择" />
                      <i class="input-icon icon2" :class="{ icon1: startTime.length >= 2 }"></i>
                    </div>
                  </template>
                </van-field>
                <van-popup v-model:show="showStartPicker" position="bottom">
                  <van-date-picker
                    v-model="currentDate"
                    :columns-type="columnsType"
                    :formatter="formatter"
                    @confirm="onSatrtConfirm"
                    @cancel="onSatrtCancel"
                  />
                </van-popup>
              </div>
              <div class="search-end">
                <van-field
                  v-model="endTime"
                  readonly
                  :border="false"
                  size="large"
                  name="datePicker"
                  label="结束月"
                  placeholder="请选择"
                  @click="showEndPicker = true"
                >
                  <template #input>
                    <div class="input">
                      <input type="text" v-model="endTime" placeholder="请选择" />
                      <i class="input-icon icon2" :class="{ icon1: endTime.length >= 2 }"></i>
                    </div>
                  </template>
                </van-field>

                <van-popup v-model:show="showEndPicker" position="bottom">
                  <van-date-picker
                    v-model="currentDate"
                    :columns-type="columnsType"
                    :formatter="formatter"
                    @confirm="onEndConfirm"
                    @cancel="onEndCancel"
                  />
                </van-popup>
                <!-- <i class="input-icon icon2" :class="{ icon1: endTime.length >= 2 }"></i> -->
              </div>
            </div>
            <van-button color="#455BDF" type="primary" block>查询</van-button>
            <ul class="ul-list">
              <li>
                <div>
                  <i class="li-icon"></i>
                </div>
                <div>
                  <div class="li-title">月份</div>
                  <div class="li-value">2024-03</div>
                </div>
                <div>
                  <div class="li-title">应发额</div>
                  <div class="li-value">8913.50</div>
                </div>
                <div>
                  <div class="li-title">实发额</div>
                  <div class="li-value">8913.50</div>
                </div>
                <div class="li-btn">
                  <i class="btn-icon"></i>
                </div>
              </li>
              <li>
                <div>
                  <i class="li-icon"></i>
                </div>
                <div>
                  <div class="li-title">月份</div>
                  <div class="li-value">2024-03</div>
                </div>
                <div>
                  <div class="li-title">应发额</div>
                  <div class="li-value">8913.50</div>
                </div>
                <div>
                  <div class="li-title">实发额</div>
                  <div class="li-value">8913.50</div>
                </div>
                <div class="li-btn">
                  <i class="btn-icon"></i>
                </div>
              </li>
              <li>
                <div>
                  <i class="li-icon"></i>
                </div>
                <div>
                  <div class="li-title">月份</div>
                  <div class="li-value">2024-03</div>
                </div>
                <div>
                  <div class="li-title">应发额</div>
                  <div class="li-value">8913.50</div>
                </div>
                <div>
                  <div class="li-title">实发额</div>
                  <div class="li-value">8913.50</div>
                </div>
                <div class="li-btn">
                  <i class="btn-icon"></i>
                </div>
              </li>
              <li>
                <div>
                  <i class="li-icon"></i>
                </div>
                <div>
                  <div class="li-title">月份</div>
                  <div class="li-value">2024-03</div>
                </div>
                <div>
                  <div class="li-title">应发额</div>
                  <div class="li-value">8913.50</div>
                </div>
                <div>
                  <div class="li-title">实发额</div>
                  <div class="li-value">8913.50</div>
                </div>
                <div class="li-btn">
                  <i class="btn-icon" :class="{ openIcon: flag }" @click="handleOpenList"></i>
                </div>
              </li>
            </ul>
            <!--  加载更多 -->
            <div>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </van-skeleton>
</template>

<script setup>
import Tabs from '@/components/tabs/index.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showSuccessToast, showFailToast } from 'vant'
import List from './list.vue'
import { getUserInfo } from '@/api/index'
const router = useRouter()
const loading = ref(true)
const name = ref('于丁一')
const branch = ref('人力资源社会保障局')
const tabValue = ref(0)
// 模拟加载
setTimeout(() => {
  loading.value = false
}, 1000)
const handleTabChange = (index) => {
  tabValue.value = index
}
const flag = ref(false) // 是否展开列表 false 收起  true展开
const startTime = ref('')
const endTime = ref('')
const showStartPicker = ref(false)
const showEndPicker = ref(false)
const onSatrtConfirm = ({ selectedValues }) => {
  startTime.value = selectedValues.join('-')
  showStartPicker.value = false
}

const onEndConfirm = ({ selectedValues }) => {
  endTime.value = selectedValues.join('-')
  console.log(selectedValues)
  showEndPicker.value = false
}
const columnsType = ['year', 'month']
const currentDate = ref(['2024', '06'])
const formatter = (type, option) => {
  if (type === 'year') {
    option.text += '年'
  }
  if (type === 'month') {
    option.text += '月'
  }
  return option
}

//  清空时间输入框
const clearStartTime = () => {
  startTime.value = ''
}
// 取消按钮移除数据
const onEndCancel = () => {
  endTime.value = ''
  showEndPicker.value = false
}
const onSatrtCancel = () => {
  startTime.value = ''
  showStartPicker.value = false
}
//  点击展开收起按钮
const handleOpenList = () => {
  console.log('点击展开收起按钮')
  flag.value = !flag.value
}
// 获取用回信息
const getUserInfoData = async () => {
  const res = await getUserInfo()
  if (res.state === 1) {
    // showSuccessToast('获取用户信息成功')
  } else {
    showFailToast(res.data)
    // setTimeout(() => {
    //   router.push('/')
    // }, 1000)
  }
}

onMounted(() => {
  getUserInfoData()
})
</script>
<style lang="less" scoped>
.wage {
  width: 100%;
  min-height: 657px;
  background-image: url(../../assets/images/bg2.png);
  background-repeat: no-repeat;
  background-size: 100% 657px;
  padding-bottom: 50px;
  h1 {
    font-size: var(--font-size-36);
    color: var(--font-color-white);
    text-align: center;
    font-weight: normal;
    margin: 0;
  }
  .avatar {
    margin-top: 80px;
    display: flex;
    // justify-content: space-between;
    width: 100%;
    padding-left: 30px;
    &-box {
      width: 106px;
      height: 106px;
      padding: 9px;
      border-radius: 4px;
      background-color: #8291ea;
    }
    &-p {
      margin-left: 24px;
      padding-top: 10px;
      li {
        color: #ffffff;
        font-size: 36px;
        line-height: 50px;
      }
    }
  }
  .avatar-icon {
    width: 100%;
    height: 100%;
    background-image: url(../../assets/images/touxiang.png);
    background-repeat: no-repeat;
    background-size: 100%;
    border-radius: 4px;
  }
  .tab-list {
    padding: 0 30px;
    // box-shadow: 0px 7px 27px 8px rgba(49, 88, 153, 0.11);
  }
  .tab {
    // padding: 0 30px;
    margin-top: 50px;

    &-content {
      margin-top: -1px;
      padding: 50px 32px;
      background: #ffffff;
      border-radius: 0px 0px 10px 10px;
      box-shadow: 0px 7px 27px 8px rgba(49, 88, 153, 0.11);
      .tab-title {
        height: 50px;
        line-height: 50px;
        text-align: center;
        width: 100%;
        background: #b2bbf2;
        border-radius: 4px;
        font-weight: 400;
        font-size: 28px;
        color: #ffffff;
        margin-top: 38px;
      }
      .search {
        &-start {
          position: relative;
          border-bottom: 1px solid #e5e5e5;
        }
        &-end {
          position: relative;
          margin-bottom: 10px;
        }
        .input {
          position: relative;
          display: flex;
          align-items: center;
          input {
            border: none;
            outline: none;
            box-sizing: border-box;
            padding-left: 36px;
            width: 100%;
            color: #1a1b1f;
            font-size: 26px;
          }
        }
        .input-icon {
          width: 28px;
          height: 27px;
          position: absolute;
          // left: 35%;
          // top: 36px;
          left: 0;
          // top: 12px;
          background-repeat: no-repeat;
          background-size: 100%;
        }
        .icon1 {
          background-image: url('@/assets/images/rili.png') !important;
        }

        .icon2 {
          background-image: url('@/assets/images/rili2.png');
        }
      }
    }
    .top {
      text-align: center;
      span {
        display: inline-block;
        font-weight: 400;
        font-size: 32px;
        color: #1a1b1f;
        line-height: 9px;
        margin: 0 13px;
      }
      span:last-child {
        font-weight: 500;
        font-size: 36px;
        color: #455bdf;
        line-height: 9px;
        margin: 0 13px;
      }
    }
  }
  .ul-list {
    margin-top: 36px;

    li {
      border-radius: 4px;
      border: 1px solid #dcdcdc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 139px;
      padding-left: 36px;
    }
    .li-title {
      font-weight: 400;
      font-size: 28px;
      color: #cccccc;
      margin-bottom: 15px;
    }
    .li-value {
      font-weight: 400;
      font-size: 28px;
      color: #1a1b1f;
    }
    .li-btn {
      height: 126px;
      width: 62px;
      background-color: #edf1f6;
      margin-right: 7px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .btn-icon {
      width: 34px;
      height: 34px;
      display: block;
      background-image: url('@/assets/images/icon_zhankai.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .openIcon {
      background-image: url('@/assets/images/icon_heqi.png') !important;
    }
    .li-icon {
      width: 46px;
      height: 46px;
      display: block;
      background-image: url('@/assets/images/pic.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
}
:deep(.van-field__label) {
  color: #1a1b1f;
}
</style>
