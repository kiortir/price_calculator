<script setup lang="ts">
import { useStore as useStoneStore } from '../store/stones';

import { useProductStore } from '../store/products';
import { useLogisticStore } from '../store/logistics';
import { useGlobalStore } from '../store/globals';
import { ref, computed } from 'vue';
import html2canvas from 'html2canvas';

import Total from './PriceTotal.vue'
import Offer from './Offer.vue'

const stoneStore = useStoneStore()
const productStore = useProductStore()
const logisticStore = useLogisticStore()
const globals = useGlobalStore()


let currency_formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
});
const format = (num: number) => currency_formatter.format(num)


const logistics = computed(() => ({
    'Доставка': logisticStore.delivery,
    'Монтаж': logisticStore.installation,
    'Подъем изделия': logisticStore.lifting,
}))

const logisticsData = computed(() => {
    const filtered = {}
    for (const key in logistics.value) {
        const value = logistics.value[key]
        if (value.price !== 0) {
            filtered[key] = value
        }
    }
    for (const field of Object.values(logisticStore.custom)) {
        if (field.value > 0 && (!field.hide)) {
            filtered[field.field || 'Дополнительные работы'] = { price: field.value }
        }
    }
    return filtered
})

const capture = () => {
    html2canvas(result.value).then(canvas => {
        canvas.toBlob(blob => navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]))
    });
}

const result = ref()

const showOfferDialog = ref(false)
const showOffer = () => {
    showOfferDialog.value = true
}

</script>

<template>
    <div class="modules flex flex-col gap-2" ref="result">
        <div data-html2canvas-ignore>
            <el-button @click="showOffer">КП</el-button>
        </div>
        <el-dialog v-model="showOfferDialog">
            <offer></offer>
        </el-dialog>
        <div class="flex flex-col gap-2 py-2">
            <div class="material flex flex-col" v-if="stoneStore.total.price">
                <div class="text-xl">Материал</div>
                <ul class="ml-3 text-gray-700 text-[0.90rem]">
                    <li v-for="(price, stone) in stoneStore.prices">
                        <div class="flex justify-between">
                            <span>{{ stone }}</span>
                            <span>{{ format(price.price) }}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-if="productStore.total.price">
                <div v-for="product in productStore.prices" :key="product.id">
                    <div class="text-xl">{{ product.name }}</div>
                    <ul class="ml-3 text-gray-700 text-[0.90rem]">
                        <li v-for="(option, index) in product.prices">
                            <div class="flex justify-between">
                                <span>{{ option.name }}</span>
                                <div class="flex gap-2 items-center">
                                    <span v-if="globals.selected_discount !== 'price'"
                                        class="line-through text-red-400 text-[.8rem]">{{ format(option.price.price)
                                        }}</span>
                                    <span>{{ format(option.price[globals.selected_discount]) }}</span>
                                </div>
                            </div>
                            <div class="flex justify-between text-[0.75rem] pl-3 text-gray-500"
                                v-for="field in option.fields">
                                <span>{{ field.name }}</span>
                                <span>{{ field.value }}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="logistics" v-if="Object.keys(logisticsData).length > 0">
                <div class="text-xl">Логистика</div>
                <ul class="ml-3 text-gray-700 text-[0.90rem]">
                    <li v-for="(sum, job) in logisticsData">
                        <div class="flex justify-between">
                            <span>{{ job }}<span class="pl-2 text-[0.75rem] text-gray-500"> {{ sum.name }}</span></span>
                            <span>{{ format(sum.price) }}</span>
                        </div>
                    </li>
                </ul>

            </div>
        </div>
        <total></total>
    </div>
</template>