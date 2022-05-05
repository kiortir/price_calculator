<script setup lang="ts">
import { ref, Ref } from 'vue'
import axios from 'axios'
import { Stone } from '../interfaces'
import { Search as SearchIcon } from '@element-plus/icons-vue'

interface Manufacturer extends Object {
    name: string
    stones: Stone[]
}

const emits = defineEmits(['add'])

const stone = ref([])
const options: Ref<Manufacturer[]> = ref([])
const search_str = ref("")

const loading = ref(false)
const search = (queryString: string, cb: (arg: any) => void) => {
    if (queryString.length) {
        loading.value = true
        axios.get('/pricelist/quartz/stones/', {
            params: { search: queryString }
        }).then(response => cb(<Stone[]>response.data))
    }
    else {
        cb(<Stone[]>[])
    }
}

const addStone = (value: number) => {
    search_str.value = ""
    if (value) {
        axios.get('/pricelist/quartz/stone/', {
            params: { id: value }
        }).then((response) => {
            if (response.status === 200) {
                emits('add', response.data)
            }
        })
    }
}

</script>

<template>
    <!-- <el-select size="large" ref="search_bar" :model-value="stone"
        @update:model-value="value => { stone = value; addStone(value) }" filterable :options="options" remote
        :remote-method="search" placeholder="Выберите камни" :loading="loading">
        <el-option-group v-for="manufacturer in options" :key="manufacturer.name" :label="manufacturer.name">
            <el-option v-for="item in manufacturer.stones" :key="item.name" :label="item.name" :value="item.id" />
        </el-option-group>
    </el-select> -->
    <el-autocomplete label="Поиск" :prefix-icon="SearchIcon" clearable v-model="search_str" :fetch-suggestions="search"
        placeholder="Начните вводить название или артикул" @select="(stone) => addStone(stone.id)" value-key="name">
        <template #default="{ item }">
            <div class="flex gap-1 justify-between">
                <div class="flex gap-1">
                    <span class="code text-gray-400" v-if="item.code">{{ item.code }}</span>
                    <span class="name">{{ item.name }}</span>
                </div>
                <span class="manufacturer text-[0.68rem] text-gray-400">{{ item.manufacturer }}</span>
            </div>
        </template>
    </el-autocomplete>
</template>
