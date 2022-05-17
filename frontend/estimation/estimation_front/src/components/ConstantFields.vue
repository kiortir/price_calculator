<script setup lang="ts">
import { useConstantStore } from '../store/constants'
import { useGrid } from 'vue-screen';

import FieldSelectorVue from './FieldSelector.vue';
import FieldVariableVue from './FieldVariable.vue';
import FieldConstantVue from './Constant.vue';


const breakpoints = useGrid('tailwind')


const store = useConstantStore()

const props = defineProps<{
    name: string
    data: object
}>()

const refs = <{ [key: string]: typeof FieldSelectorVue }>{
    selector: FieldSelectorVue,
    variable: FieldVariableVue,
    constant: FieldConstantVue
}


const module = store.modules.filter(module => (module.name === props.name))[0]

</script>

<template>
    <el-form :model="data" label-width="auto" :label-position="breakpoints.md ? 'left' : 'top'" @submit.prevent>
        <component v-for="(field, key) in module.fields" :is="refs[field.type]" :reference="field" :id="key"
            :data="data">
        </component>
    </el-form>
</template>