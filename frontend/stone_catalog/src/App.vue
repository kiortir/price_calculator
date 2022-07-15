<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import ru from 'element-plus/lib/locale/lang/ru'
</script>

<template>
  <el-config-provider :locale="ru">
    <router-view></router-view>
  </el-config-provider>
  <!-- <Estimation /> -->
</template>

<style>
</style>
