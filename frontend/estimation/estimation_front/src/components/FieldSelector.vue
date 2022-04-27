<script setup lang="ts">
import { ModuleField, ProductOption } from '../interfaces';

const props = defineProps<{
    reference: ModuleField
    data: ProductOption
    id: number
}>()

</script>

<template>
    <el-form-item :label="reference.name">
        <el-select v-model="props.data[props.id]" class="" placeholder="Выбор">
            <el-option v-for="({ key, value }, index) in reference.options" :key="index" :label="key" :value="key" />
        </el-select>
    </el-form-item>
</template>