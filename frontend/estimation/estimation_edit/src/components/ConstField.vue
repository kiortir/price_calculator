<script setup lang="ts">
import { onMounted } from 'vue';
import { Field } from '../interfaces';
const props = defineProps<{
    field: Field
}>()

onMounted(() => {
    props.field.value = 0
})

</script>

<template>

    <el-form-item label="Значение">
        <el-input-number v-model="field.value"></el-input-number>
    </el-form-item>
</template>