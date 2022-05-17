<script setup lang="ts">
import { ref, computed, WritableComputedRef, ComputedRef, onMounted, onDeactivated, onUnmounted, } from 'vue'
import { useGrid } from 'vue-screen';
import { Product, ProductOption, ModuleField, Module } from '../interfaces';
import { useProductStore } from '../store/products'
import { useModuleStore } from '../store/modules'
import { useConstantStore } from '../store/constants';
import ModuleFields from './ModuleFields.vue'
import ConstantFields from './ConstantFields.vue'
import ConstantButtons from './ConstantButtons.vue'
import TemplateSelector from './TemplateSelector.vue';
const store = useProductStore()
const modules = useModuleStore()
const constants = useConstantStore()


const props = defineProps<{
    edited_card_id: string
}>()
const emits = defineEmits(["close"])
const grid = useGrid('tailwind')

const isOpen: WritableComputedRef<boolean> = computed({
    get() {
        return Boolean(props.edited_card_id.length)
    },
    set(value: boolean) {
        if (!value) {
            emits('close')
        }
    }
})
const product = store.products[props.edited_card_id]

const showTabs = ref()

const selectedModule = ref("product_template")
const selectedIndex = ref(0)


// const TEMPLATE = computed<{ [template_name: string]: Module[] }>(() => {

//     return Object.assign({ "Изделие": Object.values(modules.data) }, ...constants.templates)
// })

const injected_modules: ComputedRef<Module[]> = computed(() => {
    if (product.template === 'Изделие') {
        return modules.modules
    }
    else {
        const m = Object.keys(constants.templates[product.template])
        return modules.modules?.filter(module => m.includes(module.code))
    }

})

const selected_module_data: ComputedRef<ProductOption> = computed(() => {
    const index = selectedModule.value + '_' + selectedIndex.value
    if (product.data.options[index] === undefined) {
        product.data.options[index] = {}
    }
    return product.data.options[index]

})

const getProductOptionData = (code: string, idx: number) => {
    const index = code + '_' + idx
    if (product.data.options[index] === undefined) {
        product.data.options[index] = {}
    }
    return product.data.options[index]
}

const tabs = computed(() => {
    const tabs = []
    tabs.push({
        title: "Тип изделия",
        name: 'product_template',
        component: TemplateSelector,
        data: product,
        index: 'template'
    })
    if (!product.template.length) {
        return tabs
    }
    constants.modules?.forEach((module) => {
        tabs.push({
            title: module.name,
            name: module.name,
            component: ConstantFields,
            data: product.data.logistic_values,
            index: null
        })
    })
    injected_modules?.value.forEach((module, idx: number) => {
        tabs.push({
            title: module.name,
            name: module.code,
            component: ModuleFields,
            data: getProductOptionData(module.code, idx),
            index: module.code
        })
    })
    return tabs
})

const nextTab = () => {
    const t = tabs.value
    if (t !== undefined) {
        const current_index = t.findIndex((el) => el.name === selectedModule.value)
        if (current_index + 1 < t.length) {
            selectedModule.value = t[current_index + 1].name
        }
        else {
            selectedModule.value = t[0].name
        }
    }
}
const prevTab = () => {
    const t = tabs.value
    if (t !== undefined) {
        const current_index = t.findIndex((el) => el.name === selectedModule.value)
        if (current_index > 0) {
            selectedModule.value = t[current_index - 1].name
        }
        else {
            selectedModule.value = t[t.length - 1].name
        }
    }
}

const listener = (e: KeyboardEvent) => {
    if (isOpen.value) {
        if (e.ctrlKey && e.key === ' ') {
            e.preventDefault()
            nextTab()
        }
        else if (e.shiftKey && e.key === ' ') {
            e.preventDefault()
            prevTab()
        }
    }
}

onMounted(() => {
    window.addEventListener('keydown', listener)
})

function debounce(func, timeout = 80) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}


function wheel_event(event) {
    const classlist = event.target.classList
    if (classlist.contains("el-tabs__item")) {
        if (event.wheelDelta > 0) {
            prevTab()
        }
        else {
            nextTab()
        }
    }
}

const wheel_tab = debounce((event) => wheel_event(event));

</script>

<template>
    <el-dialog destroy-on-close :fullscreen="!grid.lg" width="85vw" class="" v-model="isOpen"
        :title="product?.template || 'Новое изделие'">
        <div class="mx-auto flex flex-col min-h-[50vh]">
            <div class="controls" @wheel.prevent="event => wheel_tab(event)">
                <el-tabs v-model="selectedModule" type="" :tab-position="grid.lg ? 'right' : 'top'">
                    <el-tab-pane v-for="(item, idx) in tabs" :key="item.name + idx" :label="item.title"
                        :name="item.name">
                        <component :is="item.component" :data="item.data" :index="item.index" :name="item.name"
                            @clear-product="store.clearCard(edited_card_id)"
                            @duplicate="products.duplicate(item.index)" />
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="prevTab()">Предыдущая</el-button>
                <el-button @click="nextTab()">Следующая</el-button>
                <el-button type="primary" @click="isOpen = false">Готово</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style>
/* .el-dialog {
    min-height: 70vh;
} */
</style>
