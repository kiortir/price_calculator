<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useConstantStore } from '../store/constants';
import type { ElInput } from 'element-plus'
const store = useConstantStore()
const inputVisible = ref(false)
const inputValue = ref("")
const InputRef = ref<InstanceType<typeof ElInput>>()

const handleInputConfirm = () => {
    if (inputValue.value) {
        store.addTemplate(inputValue.value)
        inputVisible.value = false
        inputValue.value = ""
    }
}
const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value!.input!.focus()
    })
}

</script>


<template>

    <el-tag v-for="template in Object.keys(store.templates)" :key="template" class="mx-1" closable
        :disable-transitions="false" @close="store.deleteTemplate(template)">
        {{ template }}
    </el-tag>
    <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="" size="small"
        @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
    <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
        + Новый шаблон
    </el-button>

</template>