<script setup lang="ts">
import { computed } from 'vue';
import { useConstantStore } from '../store/constants'
const store = useConstantStore()
const templates = computed(() => ['Изделие'].concat(store.templates_list))
defineProps<{
    data: string
    index: string
}>()

</script>

<template>
    <el-form>
        <el-form-item label="Тип изделия">
            <el-select @change="_ => $emit('clearProduct')" v-model="data[index]" class="m-2"
                placeholder="Выберите тип">
                <el-option v-for="(template_code, idx) in templates" :key="template_code + idx" :label="template_code"
                    :value="template_code" />
            </el-select>
        </el-form-item>
    </el-form>
</template>