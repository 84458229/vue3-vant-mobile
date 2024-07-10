<template>
  <div class="tabs">
    <ul>
      <li
        v-for="(item, index) in list"
        :key="index"
        :class="{ active: index === tabValue }"
        @click="changeTab(index)"
      >
        {{ item }}
        <span v-if="index === tabValue" class="line"></span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
const props = defineProps({
  list: {
    type: Array,
    default: () => ['当前工资', '历史查询']
  },
  value: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(['onChange'])
const tabValue = ref(props.value)

const changeTab = (index) => {
  tabValue.value = index
  emit('change', index)
}
</script>
<style lang="less" scoped>
.tabs {
  ul {
    width: 100%;
    display: flex;
    justify-content: center;
    li {
      position: relative;
      width: 50%;
      height: 100px;
      line-height: 100px;
      text-align: center;
      color: var(--font-color-black);
      border-radius: 10px 10px 0px 0px;
      background: linear-gradient(0deg, #ffffff, #afb8f1);
      font-weight: 500;
      font-size: var(--font-size-36);
      .line {
        position: absolute;
        width: 60px;
        height: 4px;
        left: 0;
        right: 0;
        bottom: 15px;
        margin: auto;
        background: #455bdf;
        border-radius: 2px;
      }
    }
    .active {
      // box-shadow: 0px 9px 7px 2px rgba(49, 88, 153, 0.04);
      background: #ffffff;
    }
  }
}
</style>
