<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import { Edit, Link } from '@element-plus/icons-vue'
const props = defineProps<{
    store: {
        amo_lead_id: string
    }
}>()

// const input_value
const edit = ref(false)
const input = ref()
const input_value = ref("")


const sanitizeAmoLink = (link: string) => {
    return link.length ? link.split('?')[0] : ""
}

const regex = /https:\/\/unirock.amocrm.ru\/leads\/detail\/\d{8}/gm;
const validateInput = (value: string) => {
    // const sanitized_value = sanitizeAmoLink(value)
    const regex_result = regex.exec(value)
    const link = regex_result ? regex_result[0] : null
    if (link) {
        input.value!.input!.classList.remove('invalid-input')
        props.store.amo_lead_id = link
        edit.value = false
    }
    else {
        input.value!.input!.classList.add('invalid-input')
    }
}

const editVisible = () => {
    edit.value = true
    nextTick(() => {
        input.value!.input!.select()
    })
}

const open_link = () => {
    const url = props.store.amo_lead_id
    if (link_is_valid.value) {
        window.open(url, '_blank')?.focus();
    }
    else {
        edit.value = true
    }
}

const link_is_valid = computed(() => Boolean(props.store.amo_lead_id?.length))
</script>

<template>

    <!-- <el-input ref="input" v-if="edit" v-model="store.title" @keyup.enter="edit = false" @blur="edit = false"></el-input> -->

    <el-input class="w-full" v-if="edit" ref="input" v-model="input_value" @keyup.enter="validateInput(input_value)"
        @blur="validateInput(input_value)" placeholder="e.g. https://unirock.amocrm.ru/leads/detail/xxxxxxxx">
    </el-input>


    <el-button-group class="w-full" v-else>

        <el-button :type="link_is_valid ? 'primary' : 'warning'" :icon="Link" @click="open_link()">
            <span v-if="link_is_valid">Перейти к сделке</span>
            <span v-else>Добавьте ссылку на AmoCRM</span>
        </el-button>
        <el-button v-if="link_is_valid" @click="editVisible" type="primary" plain :icon="Edit">
        </el-button>
    </el-button-group>


</template>

<style>
.invalid-input {
    border: 2px solid red !important;
}
</style>