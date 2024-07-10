<template>
  <div class="layout">
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  justify-content: center;
  height: 100vh;
  margin: 0;
}
.container {
  width: 100%; /* 固定宽度 */
  // max-width: 750px;
  overflow-x: hidden;
}

/* 仅在小于750px的屏幕上生效 */
@media (max-width: 750px) {
  .container {
    width: 100%;
  }
}

/* 仅在大于750px的屏幕上生效 */
@media (min-width: 751px) {
  .container {
    max-width: 750px;
    margin: 0 auto;
  }
}
</style>
