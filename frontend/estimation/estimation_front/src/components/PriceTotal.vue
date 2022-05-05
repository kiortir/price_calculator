<script setup lang="ts">
import { useStore as useStoneStore } from '../store/stones';

import { useProductStore } from '../store/products';
import { useLogisticStore } from '../store/logistics';
import { useGlobalStore } from '../store/globals';
import { useGrid } from 'vue-screen';

import { ref, computed } from 'vue';
const grid = useGrid('tailwind')
const stoneStore = useStoneStore()
const productStore = useProductStore()
const logisticStore = useLogisticStore()
const globals = useGlobalStore()
const total = computed(() => {
    const total = {
        price: 0,
        discount10: 0,
        discount20: 0,
        discount30: 0,
        consumables: 0,
        salary: 0,
    }
    for (const key of Object.keys(total)) {
        total[key] += (productStore.total[key] || 0) + (stoneStore.total[key] || 0) + (logisticStore.total[key] || 0)
    }
    return total
})

const marginality = computed(() => {
    const value = (1 - ((total.value.salary + total.value.consumables) / total.value.price))
    let discount
    if (value > 0.35) {
        discount = 'discount30'
    }
    else if (value > 0.25) {
        discount = 'discount20'
    }
    else if (value > 0.2) {
        discount = 'discount10'
    }
    else {
        discount = 'price'
    }
    return {
        value,
        discount
    }
})


let currency_formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
});
const format = (num: number) => currency_formatter.format(num)

const getStyle = (discount: string) => {
    const styles = {
        'background-color': 'transparent',
        'color': 'inherit'
    }
    if (discount === marginality.value.discount) {
        styles['background-color'] = '#90ee90'
        styles.color = 'black'
    }
    return styles
}

</script>

<template>
    <div class="flex flex-col w-full gap-5">
        <div class="flex justify-between">
            <div class="text-xl pb-1">Итого</div>
            <div> {{ format(total[globals.selected_discount]) }}</div>
        </div>
        <div data-html2canvas-ignore>
            <el-radio-group v-model="globals.selected_discount" size="large" class="w-full mx-auto flex flex-col gap-1">
                <el-radio border label="price" style="margin-right:0; width: 100%;"
                    :style="getStyle('price')">

                    <div class="flex items-center justify-between w-full">
                        <div>Стандарт</div>
                        <div class="text-[.8rem] text-gray-500">{{ format(total.price) }}</div>
                    </div>
                </el-radio>
                <el-radio border label="discount10" style="margin-right:0; width: 100%;"
                    :style="getStyle('discount10')">

                    <div class="flex items-center justify-between w-full">
                        <div>10%</div>
                        <div class="text-[.8rem] text-gray-500">{{ format(total.discount10) }}</div>
                    </div>
                </el-radio>
                <el-radio border label="discount20" style="margin-right:0; width: 100%;"
                    :style="getStyle('discount20')">

                    <div class="flex items-center justify-between w-full">
                        <div>20%</div>
                        <div class="text-[.8rem] text-gray-500">{{ format(total.discount20) }}</div>
                    </div>
                </el-radio>
                <el-radio border label="discount30" style="margin-right:0; width: 100%;"
                    :style="getStyle('discount30')">
                    <div class="flex items-center justify-between w-full">
                        <div>30%</div>
                        <div class="text-[.8rem] text-gray-500">{{ format(total.discount30) }}</div>
                    </div>
                </el-radio>
            </el-radio-group>
        </div>
        <!-- {{ total }}-->
        {{ marginality.value }}
        {{ marginality.discount }}
    </div>
</template>

<style>
.el-radio__label {
    width: 100%;
}
</style>