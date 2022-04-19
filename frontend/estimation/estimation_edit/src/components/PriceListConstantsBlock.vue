<script setup lang="ts">
import { useStore } from '../store/constants';
import { useGrid } from 'vue-screen'
import { Lock } from '@element-plus/icons-vue'

const store = useStore()
const grid = useGrid('tailwind')

const field_alias = {
    salary: "Зарплата",
    price: "Цена",
    consumables: "Расходники",
    distance_modfier: "Надбавка за км от МКАД",
    price_const: 'Цена (фикс)',
    price_var: 'Цена (п.м.|м2)',
    salary_const: 'Зарплата (фикс)',
    salary_var: "Зарплата (п.м.|м2)",
    template: "Стоимость шаблона",

    lte: "Не более",
    percent: "Процент",
}

const constant_alias = {
    delivery: 'Доставка',
    installation: 'Монтаж',
    measurement: 'Замер',
    manual_lift: 'Ручной подъем',
    disassembly: 'Демонтаж старой столешницы',
    overprice: 'Надбавка к стоимости',
}

let currency_formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
});

</script>

<template>
    <div class="w-full px-1 flex flex-col divide-y gap-2">
        <div id="material-constants"
            class="w-full flex-grow grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 justify-between justify-items-stretch self-center">
            <el-card class v-for="(values, constant) in store.material" :key="constant">
                <template #header>
                    <div class="card-header">
                        <span>{{ constant_alias[constant] }}</span>
                    </div>
                </template>
                <div class="flex flex-col gap-2">
                    <el-form label-position="left" :model="values" label-width="auto">
                        <el-form-item v-for="(_, field) in values" :key="constant + field" :label="field_alias[field]">
                            <el-input-number :controls="grid.sm" step="500" min="0" v-model="values[field]" />
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
        <div id="logistics-constants"
            class="flex-grow w-full pt-2 grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 justify-between justify-items-stretch self-center">
            <el-card class v-for="(values, constant) in store.logistics" :key="constant">
                <template #header>
                    <div class="card-header">
                        <span>{{ constant_alias[constant] }}</span>
                    </div>
                </template>
                <div class="flex flex-col gap-2">
                    <el-form :label-position="grid.sm ? 'left' : 'top'" :model="values" label-width="auto">
                        <el-form-item v-for="(value, field) in values" :key="constant + field" :label="field_alias[field]">
                            <el-input-number :controls-position="grid.sm ? '' : 'right'" :step="500" :min="0"
                                v-model="values[field]" />
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
    </div>
</template>