<script setup lang="ts">
import { computed, nextTick } from 'vue';
import { useConstantStore } from '../store/constants';

const props = defineProps<{
    form: object
    moduleId: string
}>()
const store = useConstantStore()
const templates = store.templates

const template_values = computed(() => {
    const new_obj = {}
    for (const template in templates) {
        new_obj[template] = Object.keys(templates[template]).some(el => el === props.moduleId)
    }
    return new_obj
},

)

function setModule(template: string, val: boolean) {
    if (val) {
        templates[template][props.moduleId] = true
    }
    else {
        delete templates[template][props.moduleId]
    }
}
</script>


<template>
    <el-form>
        <el-form-item v-for="(template, index) in store.templates_list" :label="template" :key="index">
            <el-switch :model-value="template_values[template]" @change="(val) => setModule(template, val)"></el-switch>
        </el-form-item>
    </el-form>

</template>