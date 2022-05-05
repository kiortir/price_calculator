<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { Edit } from '@element-plus/icons-vue'
defineProps<{
    store: {
        title: string
    }
}>()

const edit = ref(false)
const input = ref()

const editVisible = () => {
    edit.value = true
    nextTick(() => {
        input.value!.input!.select()
    })
}
</script>

<template>

    <el-input ref="input" v-if="edit" v-model="store.title" @keyup.enter="edit = false" @blur="edit = false"></el-input>
    <div class="flex gap-2 items-center group" v-else>
        <div class="text-xl">{{ store.title }}</div>
        <div class="md:hidden md:group-hover:flex">
            <el-button @click="editVisible" :icon="Edit"></el-button>
        </div>
    </div>

</template>