<script lang="ts">
</script>

<script setup lang="ts">
import Materials from './Materials.vue'
import Product from './Product.vue'
import ResultsVue from './Results.vue';
import LogisticsVue from './Logistics.vue';
import MenuVue from './Menu.vue';

import { ref, computed, onMounted, onBeforeMount, Ref, nextTick, watch } from 'vue'
import { useRoute, useRouter, } from 'vue-router';
import { useGrid } from 'vue-screen'
import { useStore as useStoneStorage } from '../store/stones';
import { useLogisticStore } from '../store/logistics';
import { useConstantStore } from '../store/constants';
import { useModuleStore } from '../store/modules';
import { useProductStore } from '../store/products'


import { Store } from '../interfaces';

import axios from 'axios';
import { useGlobalStore } from '../store/globals';

const grid = useGrid('tailwind')


const currentTab = ref('материал')

const stoneStorage = useStoneStorage()
const productStorage = useProductStore()
const logisticStorage = useLogisticStore()
const constantStorage = useConstantStore()
const moduleStorage = useModuleStore()
const globalStorage = useGlobalStore()



const route = useRoute()

const router = useRouter()

const props = defineProps<{
    id: number | string
}>()
console.log({ props })


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

const showcursor = ref(false)
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
const cursor_follower = ref()
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

            // if (data.user.username === 'admin') {
            //     showcursor.value = true
            //     nextTick(() => followCursor())
            // }
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
const followCursor = () => { // объявляем функцию followCursor
    const el = cursor_follower.value// ищем элемент, который будет следовать за курсором

    window.addEventListener('mousemove', e => { // при движении курсора
        const target = e.target // определяем, где находится курсор
        if (!target) return
        el.style.left = e.pageX + 'px' // задаём элементу позиционирование слева
        el.style.top = e.pageY + 'px' // задаём элементу позиционирование сверху
    })
}

// getPricelist()
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
    <div class="follow-cursor" ref="cursor_follower" v-if="showcursor">
        <div id="circle-orbit-container">

            <!-- Circles closest to the central point -->
            <div id="inner-orbit">
                <div class="inner-orbit-cirlces"></div>
            </div>

            <!-- Circles second closest to the central point -->
            <div id="middle-orbit">
                <div class="middle-orbit-cirlces"></div>
            </div>

            <!-- Circles furthest away to the central point -->
            <div id="outer-orbit">
                <div class="outer-orbit-cirlces"></div>
            </div>

        </div>
    </div>
    <div class="md:container md:mx-auto mt-10 flex flex-col gap-2 font-sans antialiased">
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

<!-- <style>
.follow-cursor {
    display: block;
    width: 24px;
    height: 24px;
    transform: translateY(-50%) translateX(-50%);
    /* центрируем кружок */
    position: absolute;
    /* задаём абсолютное позиционирование, чтобы элемент не влиял на остальные элементы и его можно было бы позиционировать следом за курсором */
    z-index: 999;
    /* чтобы элемент был над остальными элементами */
    pointer-events: none;
    /* чтобы сквозь элемент можно было взаимодействовать с элементами, находящимися под ним */
    transition: width 0.64s, height 0.64s, background 0.64s;
}

/* Активный класс для кружка при наведении на ссылку */
.follow-cursor_active {
    height: 128px;
    width: 128px;
    border-width: 2px;
    background: rgba(13, 110, 253, 0.32);
}

/* Скрываем декоративный элемент при ширине браузера меньше 992px */
@media (max-width: 991.98px) {
    .follow-cursor {
        display: none;
    }
}

/* ---------- Container for the orbiting circles animation ---------- */
#circle-orbit-container {
    position: relative;
    top: -20px;
    left: -20px;
    height: 100px;
    width: 100px;
}

/* ---------- Inner orbit - This is the circles closest to the central point ---------- */
#inner-orbit {
    position: absolute;
    top: 21px;
    left: 21px;
    width: 15px;
    height: 15px;
    border: 2px #4A437F dashed;
    border-radius: 100%;
    -webkit-animation: spin-right 10s linear infinite;
    animation: spin-right 10s linear infinite;
}

/* ---------- Repeating styles for the inner orbiting circles ---------- */
.inner-orbit-cirlces {
    position: absolute;
    top: 3px;
    left: -6px;
    height: 7px;
    width: 7px;
    border-radius: 100%;
    background-color: #9F98E6;
}

/* ---------- Middle orbit - This is the circles second closest to the central point ---------- */
#middle-orbit {
    position: absolute;
    top: 13px;
    left: 13px;
    width: 30px;
    height: 30px;
    border: 2px #4A437F dashed;
    border-radius: 100%;
    -webkit-animation: spin-right 15s linear infinite;
    animation: spin-right 15s linear infinite;
}

/* ---------- Repeating styles for the inner orbiting circles ---------- */
.middle-orbit-cirlces {
    position: absolute;
    top: 19px;
    left: 19px;
    height: 7px;
    width: 7px;
    border-radius: 100%;
    background-color: #4A437F;
}

/* ---------- Outer orbit - This is the circles furthest away from the central point ---------- */
#outer-orbit {
    position: absolute;
    top: 0;
    left: 0;
    width: 55px;
    height: 55px;
    border: 2px #4A437F dashed;
    border-radius: 100%;
    -webkit-animation: spin-right 20s linear infinite;
    animation: spin-right 20s linear infinite;
}

/* ---------- Repeating styles for the outer orbiting circles ---------- */
.outer-orbit-cirlces {
    position: absolute;
    top: 40px;
    left: 40px;
    height: 12px;
    width: 12px;
    border-radius: 100%;
    background-color: #00FFCA;
}

/* ---------- Animation ---------- */
@-webkit-keyframes spin-right {
    100% {
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style> -->