<script setup lang="ts">
import { onMounted } from 'vue';
import { Plus } from '@element-plus/icons-vue'
import { Field, Option } from '../interfaces';
const props = defineProps<{
    field: Field
}>()

const defaultOption = () => {
    return <Option>{
        key: '',
        value: {
            price: null,
            salary: null,
            consumables: null,
        }
    }
}

onMounted(() => {
    props.field.options = [
        defaultOption()
    ]
})

</script>


<template>
    <el-form-item label="Опции">
        <el-form v-for="option in field.options" :inline="true" :model="option" class="demo-form-inline">
            <el-form-item label="">
                <el-input size="small" v-model="option.key" placeholder="название" />
            </el-form-item>
            <el-form-item label="Цена">
                <el-input size="small" v-model="option.value.price" placeholder="руб." />
            </el-form-item>
            <el-form-item label="Зарплата">
                <el-input size="small" v-model="option.value.salary" placeholder="руб." />
            </el-form-item>
            <el-form-item label="Расходники">
                <el-input size="small" v-model="option.value.consumables" placeholder="руб." />
            </el-form-item>
        </el-form>

    </el-form-item>
    <div>
        <el-button size='small' type="primary" :icon="Plus" @click="field.options.push(defaultOption())">Добавить опцию
        </el-button>
    </div>
</template>