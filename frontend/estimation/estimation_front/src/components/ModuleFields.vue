<script setup lang="ts">
import { useModuleStore } from '../store/modules'
import FieldSelectorVue from './FieldSelector.vue';
import FieldVariableVue from './FieldVariable.vue';
import FieldConstantVue from './Constant.vue';



const store = useModuleStore()


const props = defineProps<{
    name: string
    index: number
    data: Object
}>()

const reference = store.data[props.name]
console.log({ reference })
const refs = {
    selector: FieldSelectorVue,
    variable: FieldVariableVue,
    constant: FieldConstantVue
}

</script>

<template>
    <div class="mt-2">
        <el-form :model="data" label-width="auto" label-position="left">
            <component v-for="(field, id) in reference.fields" :is="refs[field.type]" :reference="field" :data="data"
                :id="id">
            </component>
        </el-form>
    </div>
</template>