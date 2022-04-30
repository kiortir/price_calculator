<script setup lang="ts">
import { useConstantStore } from '../store/constants'
import { useProductStore } from '../store/products'

import FieldSelectorVue from './FieldSelector.vue';
import FieldVariableVue from './FieldVariable.vue';
import FieldConstantVue from './Constant.vue';



const store = useConstantStore()

const props = defineProps<{
    name: string
    data: object
}>()

const refs = {
    selector: FieldSelectorVue,
    variable: FieldVariableVue,
    constant: FieldConstantVue
}


const module = store.modules.filter(module => (module.name === props.name))[0]

</script>

<template>
    <el-form :model="data" label-width="auto" label-position="left">
        <component v-for="(field, key) in module.fields" :is="refs[field.type]" :reference="field" :id="key"
            :data="data">
        </component>
    </el-form>
</template>