<script setup lang="ts">
import { computed } from 'vue';
import { useLogisticStore } from '../store/logistics'
import { useGrid } from 'vue-screen';

import FieldVariableVue from './FieldVariable.vue';
const store = useLogisticStore()
const grid = useGrid('tailwind')
const label_position = computed(() => {
    return grid.sm ? 'left' : 'top'
})

</script>

<template>
    <div class='flex flex-col gap-3 px-2 md:px-0'>
        <el-form :model="store.standart" label-width="auto" :label-position="label_position">
            <field-variable-vue v-for="(field, id) in store.standart" :key="id" :data="store.standart[id]" id="value"
                :reference="field">
            </field-variable-vue>
        </el-form>
        <div class="flex flex-col divide-y">
            <el-form class="pt-2" v-for="(custom_field, idx) in store.custom" :key="idx"
                :inline="true" :model="custom_field" :label-position="label_position">
                <el-form-item label="Название">
                    <el-input placeholder="название" v-model="custom_field.field"></el-input>
                </el-form-item>
                <el-form-item label="Сумма">
                    <el-input-number class="self-end" step="1000" min="0" placeholder="цена" v-model="custom_field.value">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="Спрятать">
                    <el-switch v-model="custom_field.hide" />
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>