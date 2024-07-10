<template>
  <div class="list">
    <ul>
      <li>
        <span>职务工资 </span>
        <span>3856.00</span>
      </li>
      <li>
        <span>职务工资 </span>
        <span>3856.00</span>
      </li>
      <li>
        <span>职务工资 </span>
        <span>3856.00</span>
      </li>
      <li>
        <span>职务工资 </span>
        <span>3856.00</span>
      </li>
      <li>
        <span>职务工资 </span>
        <span>3856.00</span>
      </li>
    </ul>
    <div class="total">
      <span>应发工资额</span>
      <span>9365.50</span>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
</script>
<style lang="less" scoped>
.list {
  ul {
    li {
      display: flex;
      justify-content: space-between;
      line-height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #e5e5e5;
      font-weight: 400;
      font-size: 28px;
      color: #1a1b1f;
    }
  }
}
.total {
  display: flex;
  justify-content: space-between;
  span {
    line-height: 60px;
    line-height: 60px;
    font-weight: 400;
    font-size: 28px;
    color: #1a1b1f;
  }
  span:last-child {
    font-weight: 500;
    font-size: 32px;
    color: #455bdf;
  }
}
</style>
