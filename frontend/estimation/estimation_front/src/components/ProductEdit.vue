<script setup lang="ts">
import { ref, computed, WritableComputedRef, ComputedRef } from 'vue'
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
        return Object.values(modules.data)
    }
    else {
        return Object.keys(constants.templates[product.template]).map(id => modules.data[id])
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

</script>

<template>
    <el-dialog :fullscreen="!grid.lg" width="60vw" v-model="isOpen" :title="product?.template || 'Новое изделие'" draggable>
        <div class="container mx-auto flex flex-col">
            <div class="controls">
                <el-tabs v-model="selectedModule" type="card">
                    <el-tab-pane v-for="(item, idx) in tabs" :key="idx" :label="item.title" :name="item.name">
                        <component :is="item.component" :data="item.data" :index="item.index" :name="item.name"
                            @clear-product="store.clearCard(edited_card_id)" />
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="isOpen = false">Cancel</el-button>
                <el-button type="primary" @click="isOpen = false">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
</template>