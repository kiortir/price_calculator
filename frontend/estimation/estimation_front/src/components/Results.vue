<script setup lang="ts">
import { useStore as useStoneStore } from '../store/stones';

import { useProductStore } from '../store/products';
import { useLogisticStore } from '../store/logistics';
import { ref, computed } from 'vue';
const stoneStore = useStoneStore()
const productStore = useProductStore()
const logisticStore = useLogisticStore()

let currency_formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
});

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

const total = computed(() => {
    const total = {
        price: 0,
        discount10: 0,
        discount20: 0,
        discount30: 0
    }
    total.price += productStore.total.price || 0 + 0
    return total
})


</script>

<template>
    <div class="modules flex flex-col">
        <div class="material">
            <div v-for="(price, stone) in stoneStore.prices">{{ stone }}: {{ price.price }}</div>
        </div>
        <div v-for="product in productStore.prices" :key="product.id">
            <div class="text-xl font-semibold">{{ product.name }}</div>
            <div v-for="(option, index) in product.prices" :key="product.id + index">
                {{ option.name }} {{ option.price }}
            </div>
        </div>
        <div class="logistics" v-if="Object.keys(logisticsData).length > 0">
            <div class="text-xl">Логистика</div>
            <ul class="ml-3 text-gray-700 text-[0.90rem]">
                <li v-for="(sum, job) in logisticsData">{{ job }}: {{ sum.price }}</li>
            </ul>
        </div>
        <div class="total">{{ total }}</div>
    </div>
</template>