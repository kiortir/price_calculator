<script setup lang="ts">
import { computed } from 'vue'
import { ModuleField, ProductOption } from '../interfaces';

const props = defineProps<{
    reference: ModuleField
    data: ProductOption
    id: number
}>()

const value = computed({
    get() {
        return Number(props.data[props.id])
    },
    set(newVal: number) {
        props.data[props.id] = newVal
    }
})

</script>

<template>
    <el-form-item :label="reference.name">
        <el-input-number :min="0" :step=1 v-model="value" :placeholder="reference.placeholder || 'шт./п.м.'" />
    </el-form-item>
</template>