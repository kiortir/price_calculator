<script setup lang="ts">
import { useModuleStore } from '../store/modules'
import FieldSelectorVue from './FieldSelector.vue';
import FieldVariableVue from './FieldVariable.vue';
import RadioFieldsVue from './RadioFields.vue';
import FieldConstantVue from './Constant.vue';



const store = useModuleStore()


const props = defineProps<{
    name: string
    index: number
    data: Object
}>()

const emits = defineEmits(['duplicate'])

const reference = store.data[props.name]
const refs = {
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
        <el-form :model="data" label-width="auto" label-position="left" @submit.prevent>
            <component v-for="(field, id) in reference.fields" :is="refs[field.type]" :reference="field" :data="data"
                :id="id">
            </component>
        </el-form>
    </div>
</template>