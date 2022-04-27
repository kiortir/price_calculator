<script setup lang="ts">
import { useConstantStore } from '../store/constants'

const store = useConstantStore()


</script>

<template>
    <el-button v-for="module in store.modules" @click="$emit('switch', module.name)" type="warning">{{ module.name }}</el-button>
</template>