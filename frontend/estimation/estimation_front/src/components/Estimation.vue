<script setup lang="ts">
import Materials from './Materials.vue'
import Product from './Product.vue'
import ResultsVue from './Results.vue';
import LogisticsVue from './Logistics.vue';
import MenuVue from './Menu.vue';

import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, } from 'vue-router';
import { useGrid } from 'vue-screen'

import { useStore as useStoneStorage } from '../store/stones';
import { useLogisticStore } from '../store/logistics';
import { useConstantStore } from '../store/constants';
import { useModuleStore } from '../store/modules';
import { useProductStore } from '../store/products'
import { useGlobalStore } from '../store/globals';

import { Store } from '../interfaces';

import axios from 'axios';

const grid = useGrid('tailwind')

const currentTab = ref('материал')

const stoneStorage = useStoneStorage()
const productStorage = useProductStore()
const logisticStorage = useLogisticStore()
const constantStorage = useConstantStore()
const moduleStorage = useModuleStore()
const globalStorage = useGlobalStore()

const router = useRouter()

const props = defineProps<{
    id: number | string
}>()


const tabToStorage = <{
    [storage_name: string]: Store
}><unknown>{
    материал: stoneStorage,
    изделие: productStorage,
    логистика: logisticStorage
}

const store = computed(() => {
    return tabToStorage[currentTab.value]
})

const control_buttons = computed(() => {
    const buttons = []
    if (!grid.md) {
        buttons.push({
            title: 'Итог',
            action: showResults
        })
    }
    if (currentTab.value == 'изделие') {
        buttons.push({
            title: `Добавить ${currentTab.value} `,
            action: addCard
        })
    }
    if (currentTab.value == 'логистика') {
        buttons.push({
            title: `Добавить трату`,
            action: addCard
        })
    }

    return buttons
})

const calculationBlock = ref()
const control_buttons_w = ref()
const getEstimation = async (id: number | string) => {
    axios.get('/estimation/api/', {
        params: { id }
    }).then(async response => {
        let pricelist_id = response.data.globals?.pricelist || null
        await getPricelist(pricelist_id)
        return response.data
    }).then((data) => {
        if ((id !== 'new') && (id !== undefined)) {
            const state = data.state
            globalStorage.$state = data.globals
            logisticStorage.$state = state.logistics
            productStorage.$state = state.products
            stoneStorage.$state = state.stones
        }
    }).catch(e => router.replace({ name: 'new' }))
}

const getPricelist = async (id?: number) => {
    await axios.get('/estimation/api/pricelist/', {
        params: {
            latest: id == null,
            id
        }
    }).then(response => {
        const data = response.data.data
        constantStorage.$state = data.variables
        moduleStorage.data = data.modules
    })
    return
}

getEstimation(props.id)

onMounted(() => {
    control_buttons_w.value = calculationBlock.value.clientWidth + 'px'
    addEventListener('resize', () => {
        if (calculationBlock.value) {
            control_buttons_w.value = calculationBlock.value.clientWidth + 'px'
        }
    }, true)
})

const addCard = () => {
    store.value.addCard()
}

const showResultsModal = ref(false)
const showResults = () => {
    showResultsModal.value = true
}

const showResultsBlock = computed(() => {
    return productStorage.total.price || logisticStorage.total.price || stoneStorage.total.price
})

</script>

<template>
    <div class="md:container md:mx-auto mt-10 md:flex flex-col gap-2 font-sans antialiased">
        <menu-vue></menu-vue>
        <div class="md:flex flex-row gap-3">
            <div ref="calculationBlock" class="calculation_block basis-11/12 w-full mb-[68px]">
                <el-tabs tab-position="top" v-model="currentTab" :stretch="true">
                    <el-tab-pane name="материал" label="Материал">
                        <materials></materials>
                    </el-tab-pane>
                    <el-tab-pane name="изделие" label="Изделие">
                        <product />
                    </el-tab-pane>
                    <el-tab-pane name="логистика" label="Логистика">
                        <logistics-vue />
                    </el-tab-pane>
                </el-tabs>
                <div class="button-block w-full fixed bottom-0 grid grid-flow-col divide-x ring-1 ring-light-blue md:rounded-t-md bg-white/90 z-[100] select-none"
                    :style="{
                        width: control_buttons_w,
                        'grid-template-columns': `repeat(${control_buttons.length}, minmax(0, 1fr))`
                    }" v-if="control_buttons.length">
                    <div class="text-center py-4 transition-colors duration-300 hover:text-white hover:bg-sky-600 active:duration-75 active:bg-primary select-none"
                        v-for="button in control_buttons" @click="button.action()">{{ button.title }}
                    </div>
                </div>
            </div>
            <div class="result-block basis-6/12 hidden md:flex w-full" v-if="showResultsBlock">
                <el-affix :offset="0" class="w-full">

                    <ResultsVue key="1" />
                </el-affix>
            </div>
        </div>
        <el-dialog fullscreen v-model="showResultsModal">
            <ResultsVue></ResultsVue>
        </el-dialog>
        <el-backtop :right="25" :bottom="80" />
    </div>
</template>