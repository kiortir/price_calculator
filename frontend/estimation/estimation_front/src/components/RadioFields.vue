<script setup lang="ts">
import { onMounted } from 'vue';
import { ModuleField, ProductOption } from '../interfaces';

const props = defineProps<{
    reference: ModuleField
    data: ProductOption
    id: number
}>()

if (props.data[props.id] === undefined) {
    props.data[props.id] = props.reference.options![0].key
}

</script>

<template>
    <el-form-item :label="reference.name">
        <el-radio-group v-model="data[id]">
            <el-radio-button v-for="({ key, value }, index) in reference.options" :key="index" :label="key"
                :value="key" />
        </el-radio-group>
        <slot></slot>
        <!-- <el-select v-model="props.data[props.id]" class="" placeholder="Выбор">
            <el-option v-for="({ key, value }, index) in reference.options" :key="index" :label="key" :value="key" />
        </el-select> -->
    </el-form-item>
</template>