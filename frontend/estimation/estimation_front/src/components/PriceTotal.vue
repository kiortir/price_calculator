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
        raw: 0
    }
    for (const key of Object.keys(total)) {
        total[key] += (productStore.total[key] || 0) + (stoneStore.total[key] || 0) + (logisticStore.total[key] || 0)
    }
    return total
})

const marginality = computed(() => {
    const value = (1 - ((total.value.salary + total.value.consumables) / total.value.raw))
    let discount
    if (value > 0.35) {
        // discount = 'discount30'
        // }
        // else if (value > 0.25) {
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
const styles = computed(() => {
    const discounts = {
        price: {},
        discount10: {},
        discount20: {},
        discount30: {}
    }
    const recommended_discount = marginality.value.discount
    for (const discount of Object.keys(discounts)) {
        const discount_dict = discounts[discount]
        if (discount === recommended_discount) {
            discount_dict.text = "--рекомендуемая цена"
            discount_dict.style = {
                color: 'black',
                'background-color': '#90ee90'
            }

        }
        else {
            const discount_value = parseInt(discount.slice(discount.length - 2, discount.length)) || 0
            const recommended_discount_value = parseInt(recommended_discount.slice(recommended_discount.length - 2, recommended_discount.length)) || 0

            const discount_array = [0, 10, 20, 30]
            const calculated_index = discount_array.findIndex((el) => el === discount_value)
            const recommended_discount_index = discount_array.findIndex((el) => el === recommended_discount_value)
            if (calculated_index - recommended_discount_index === -1) {
                discount_dict.text = ""
                discount_dict.style = {
                    color: 'black',
                    'background-color': '#FFFF66'
                }
            }
            else if (calculated_index - recommended_discount_index === 1) {
                discount_dict.text = ""
                discount_dict.style = {
                    color: 'gray',
                    'background-color': ''
                }
            }
            else if (calculated_index - recommended_discount_index === 2) {
                discount_dict.text = ""
                discount_dict.style = {
                    color: 'gray',
                    'background-color': ''
                }
            }
            else {

                discount_dict.text = ""
                discount_dict.style = {
                    color: 'gray',
                    'background-color': ''
                }
            }

        }
    }
    return discounts
})

const discounts = [
    {
        label: 'price',
        title: 'РРЦ'
    },
    {
        label: 'discount10',
        title: 'Колонка 1'
    },
    {
        label: 'discount20',
        title: 'Колонка 2'
    },
    {
        label: 'discount30',
        title: 'Дилерская'
    },
]

</script>

<template>
    <div class="flex flex-col w-full gap-5">
        <div class="flex justify-between">
            <div class="text-xl pb-1">Итого</div>
            <div> {{ format(total[globals.selected_discount]) }}</div>
        </div>
        <div data-html2canvas-ignore>
            <el-radio-group v-model="globals.selected_discount" size="large" class="w-full mx-auto flex flex-col gap-1">
                <el-radio v-for="discount in discounts" border :label="discount.label"
                    style="margin-right:0; width: 100%;" :style="styles[discount.label].style">
                    <div class="flex items-center justify-between w-full">
                        <div class="flex gap-1 flex-wrap">
                            <span>{{ discount.title }}</span>
                            <span class="text-gray-500 text-[0.75rem]">{{
                                    styles[discount.label].text
                            }}</span>
                        </div>
                        <div class="text-[.8rem] text-gray-500">{{ format(total[discount.label]) }}</div>
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