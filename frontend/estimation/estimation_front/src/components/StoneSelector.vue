<script setup lang="ts">
import { ref, Ref, defineEmits } from 'vue'
import axios from 'axios'
import { Stone } from '../interfaces'

interface Manufacturer extends Object {
    name: string
    stones: Stone[]
}

const emits = defineEmits(['add'])

const stone = ref([])
const options: Ref<Manufacturer[]> = ref([])

const loading = ref(false)
const search = (query: string) => {
    if (query.length > 2) {
        loading.value = true
        axios.get('/pricelist/quartz/stones/', {
            params: { search: query }
        }).then((response) => {
            options.value = response.data
            loading.value = false
        })
    }
    else {
        options.value = [<Manufacturer>{}]
    }
}

const addStone = (value: number) => {
    if (value) {
        axios.get('/pricelist/quartz/stone/', {
            params: { id: value }
        }).then((response) => {
            if (response.status === 200) { emits('add', response.data) }
        })
    }
}

</script>

<template>
    <el-select size="large" ref="search_bar" :model-value="stone"
        @update:model-value="value => { stone = value; addStone(value) }" filterable :filter-method="() => true"
        :options="options" remote :remote-method="search" placeholder="Выберите камни" :loading="loading">
        <el-option-group v-for="manufacturer in options" :key="manufacturer.name" :label="manufacturer.name">
            <el-option v-for="item in manufacturer.stones" :key="item.name" :label="item.name" :value="item.id" />
        </el-option-group>
    </el-select>
</template>
