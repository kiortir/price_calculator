<script setup lang="ts">
import { useModuleStore } from '../store/modules'

import FieldSelectorVue from './FieldSelector.vue';
import FieldVariableVue from './FieldVariable.vue';
import RadioFieldsVue from './RadioFields.vue';
import FieldConstantVue from './Constant.vue';

import { useGrid } from 'vue-screen';

const store = useModuleStore()
const grid = useGrid('tailwind')

const props = defineProps<{
    name: string
    index: number
    data: Object
}>()

const emits = defineEmits(['duplicate'])

const reference = store.data[props.name]
const refs = <{ [key: string]: typeof FieldSelectorVue }>{
    selector: FieldSelectorVue,
    variable: FieldVariableVue,
    constant: FieldConstantVue,
    radio: RadioFieldsVue,
}

const duplicate = () => {
    emits('duplicate')
}

</script>

<template>
    <div class="mt-2 flex flex-col gap-2">
        <!-- <div>
            <el-button type="text" v-if="reference.settings.duplicable" @click="duplicate">Дублировать</el-button>
        </div> -->
        <div class="text-xl mb-2 font-semibold">{{ reference.name }}</div>
        <el-form :model="data" label-width="auto" :label-position="grid.lg ? 'left' : 'top'" @submit.prevent>
            <component v-for="(field, id) in reference.fields" :is="refs[field.type]" :reference="field" :data="data"
                :id="id">
                <div class="ml-2">
                    <el-popover placement="top-start" title="Подсказка" :width="400" trigger="hover"
                        v-if="field.tooltip" :content="field.tooltip">
                        <template #reference>
                            <svg class="h-5 w-5 hover:text-unirock transition-colors duration-500" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="16" x2="12" y2="12" />
                                <line x1="12" y1="8" x2="12.01" y2="8" />
                            </svg>
                        </template>
                    </el-popover>
                </div>
            </component>
        </el-form>
    </div>
</template>