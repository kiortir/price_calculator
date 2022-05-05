<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useStore as useStoneStore } from '../store/stones';
import { useProductStore } from '../store/products';
import { useLogisticStore } from '../store/logistics';
import { useGlobalStore } from '../store/globals';
import { useRouter } from 'vue-router';

import TitleVue from './menu/Title.vue'
import LeadVue from './menu/Lead.vue'

interface CSRFMeta extends Element {
    value: string
}

const csrftoken_holder = <CSRFMeta>document.querySelector('[name=csrfmiddlewaretoken]');
const csrftoken = csrftoken_holder.value

const router = useRouter()
const stones = useStoneStore()
const products = useProductStore()
const logistics = useLogisticStore()
const globals = useGlobalStore()

const title_holder = ref(globals.title)
const title_edit = ref(false)

const save = () => {
    axios({
        method: 'post',
        url: "api/",
        data: {
            state:
            {
                stones: stones.$state,
                products: products.$state,
                logistics: logistics.$state,
            },
            globals: globals.$state
        },
        headers: { "X-CSRFToken": csrftoken }
    }).then((response) => {
        if (response.status === 201) {
            globals.iteration_group = response.data.iteration_group
            globals.iteration_version = response.data.iteration_version
            router.push({name:'estimation', params: {id:response.data.id}})
        }
    })
}
</script>

<template>
    <div class="flex flex-col md:flex-row gap-2 items-end md:justify-between px-2 md:px-0 ">
        <div class="flex gap-1">
            <title-vue :store="globals"></title-vue>
        </div>
        <div class="flex flex-row gap-1">
            <lead-vue :store="globals"></lead-vue>
            <el-button type="success" native-type="submit" @click="save()">Сохранить</el-button>
        </div>


    </div>
</template>