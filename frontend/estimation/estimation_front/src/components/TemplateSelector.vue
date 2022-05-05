<script setup lang="ts">
import { computed } from 'vue';
import { useConstantStore } from '../store/constants'
const store = useConstantStore()
const templates = computed(() => ['Изделие'].concat(...Object.keys(store.templates)))
defineProps<{
    data: string
    index: string
}>()

</script>

<template>
    <el-select @change="_ => $emit('clearProduct')" v-model="data[index]" class="m-2" placeholder="Выберите тип">
        <el-option v-for="(template_code, idx) in templates" :key="template_code + idx" :label="template_code"
            :value="template_code" />
    </el-select>
</template>