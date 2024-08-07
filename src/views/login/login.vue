<template>
  <div class="box" @click="goHome()">
    点击登录
  </div>
</template>

<script setup lang="ts">
import router from '@/router';

  const goHome = () => {
    router.push('/home')
  }
</script>

<style lang="less" scoped>
  .box {
    width: 187px;
    height: 100px;
    background-color: #000;
  }
</style>
