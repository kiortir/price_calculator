<script setup lang="ts">
import { ref, computed, WritableComputedRef, ComputedRef } from 'vue'
import { useGrid } from 'vue-screen';
import { Product, ProductOption } from '../interfaces';
import { useProductStore } from '../store/products'
import { useModuleStore } from '../store/modules'
import ModuleFields from './ModuleFields.vue'
import ConstantFields from './ConstantFields.vue'
import ConstantButtons from './ConstantButtons.vue'
const store = useProductStore()
const modules = useModuleStore()

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

const selectedModule = ref("Тип изделия")
const selectedIndex = ref(0)


const TEMPLATE = <{
    [template_name: string]: string[]
}>{
        "Все": ['eUecsjnCq'],
        "Столешница": ['eUecsjnCq',]
    }

const injected_modules = computed(() => {
    return TEMPLATE[product.template] || []
})

const selected_module_data: ComputedRef<ProductOption> = computed(() => {
    const index = selectedModule.value + '_' + selectedIndex.value
    if (product.data.options[index] === undefined) {
        product.data.options[index] = {}
    }
    return product.data.options[index]

})

const selected_type = ref("")

</script>

<template>
    <el-dialog :fullscreen="!grid.lg" width="60vw" v-model="isOpen" :title="product?.template || 'Новое изделие'">
        <div class="container mx-auto flex flex-col">
            <div class="controls">
                <el-collapse v-model="showTabs">
                    <el-collapse-item name="1">
                        <template #title>
                            Модули -> {{ selectedModule }}
                        </template>
                        <div class="flex flex-row flex-wrap px-1">
                            <el-button @click="selectedModule = 'Тип изделия'"
                                :type="selectedModule === 'Тип изделия' ? 'primary' : ''">Тип изделия</el-button>
                            <constant-buttons
                                @switch="module => { selectedModule = module; selected_type = 'constant' }" />
                            <el-button
                                @click="selectedModule = module_code; selectedIndex = index; selected_type = 'module'"
                                :type="selectedModule === module_code ? 'primary' : ''"
                                v-for="(module_code, index) in injected_modules" :key="module_code + index">{{
                                        modules.data[module_code].name
                                }}</el-button>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div class="module_body">
                <div v-if="selectedModule === 'Тип изделия'">
                    <el-select v-model="product.template" class="m-2" placeholder="Выберите тип">
                        <el-option :key="1" label="Столешница" value="Столешница" />
                    </el-select>
                </div>
                <div v-else>
                    <constant-fields :module_name="selectedModule" v-if="selected_type === 'constant'"
                        :product="product.data.logistic_values" />
                    <module-fields v-if="selected_type === 'module'" :module_id="selectedModule"
                        :data="selected_module_data" :index="selectedIndex" :key="selectedModule + selectedIndex" />

                </div>
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